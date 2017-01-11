<?php
namespace BD\Model;

use Nette\Database\Table\IRow;

/**
 *
 * @author Marian Rusnak
 */
class DatesManager extends BaseManager
{
	public $czechDays = array(
		"Mon" => "Pondělí",
		"Tue" => "Úterý",
		"Wed" => "Středa",
		"Thu" => "Čtvrtek",
		"Fri" => "Pátek",
		"Sat" => "Sobota",
		"Sun" => "Neděle"
	); 

	public function mapRows($result)
	{
		$ret = array();
		foreach ($result as $row) {
			array_push($ret, $this->mapRow($row));
		}
		return $ret;
	}

	public function mapRow($row) {
		return array(
				"id" => $row->id, 
				"year" => $row->date->format('Y'), 
				"month" => $row->date->format('m'), 
				"day" => $row->date->format('d'), 
				"dayOfWeek" => $this->czechDays[$row->date->format('D')], 
				"time" => $row->time, 
				"notes" => $row->notes, 
				"freeSlots" => $row->slots
		);
	}

	/**
	 * @return array|IRow[]
	 */
	public function findAll()
	{
		return $this->mapRows($this->db->table('dates')
			->select('id, date, time, notes, slots')
			->where('enabled', 1)
			->where('(date = ? AND time > ?) OR date > ?', date("Y-m-d"), date("H:i"), date("Y-m-d"))
			->order('date, time')
			->fetchAll());
	}


	public function fetchSingle($dateId)
	{
		return $this->mapRow($this->fetchDateById($dateId));
	}

	public function fetchDateById($id)
	{
		return $this->db->table('dates')
			->select('id, date, time, notes, slots')
			->where(array("id" => $id))
			->fetch();
	}

	public function findReservationByHash($hash)
	{
		return $this->db->table('reservations')
			->select('date, hash, full_name, email, slots, notes, add_to_maillist')
			->where(array("hash" => $hash, "is_deleted" => false))
			->fetch();
	}

	public function makeReservation($data) 
	{
		$actualData = $this->fetchDateById($data->dateId);
		if ($actualData->slots == 0 || $actualData->slots - $data->placesReserved < 0)
			throw new \Exception("No more places available");

		$hash = sha1($data->dateId . $data->email . rand(10000, 9999999));
		$result1 = $this->db->table('reservations')->insert(array(
			'date' => $data->dateId,
			'hash' => $hash,
			'full_name' => $data->fullName,
			'email' => $data->email,
			'slots' => $data->placesReserved,
			'notes' => $data->notes,
			'add_to_maillist' => $data->newsletter,
			'is_deleted' => false
		));
		$result2 = $this->db->table('dates')
			->where(array('id' => $data->dateId))
			->update(array('slots' => $actualData->slots - $data->placesReserved));

		if ($result1 && $result2) return $hash;
		else return false;
	}


	public function cancelReservation($data) 
	{
		$actualData = $this->fetchDateById($data->dateId);
		$result1 = $this->db->table('reservations')
			->where(array('hash' => $data->hash))
			->update(array(
				'is_deleted' => true,
				'deletion_note' => $data->reason
			));
		$result2 = $this->db->table('dates')
			->where(array('id' => $data->dateId))
			->update(array('slots' => $actualData->slots + $data->slots));

		return ($result1 && $result2);
	}
}
