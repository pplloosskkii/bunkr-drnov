<?php
namespace BD\Model;

use Nette\Object;
use Nette\Mail\SmtpMailer;
use Nette\Mail\Message;

class Mailer extends Object
{
	var $mailer;
	var $latte;
	const DELETE_LINK = 'http://bunkr-drnov.cz/reservation/delete.html#/?id=';

	public function __construct() {
		$this->mailer = new SmtpMailer(array(
			'host' => 'smtp.rozhled.cz',
			'username' => 'noreply@bunkr-drnov.cz',
			'password' => 'gkQEdr',
			//'secure' => 'ssl',
		));
		$this->latte = new \Latte\Engine;
	}

	public function createMail() {
		$mail = new Message;
		$mail->setFrom('Bunkr Drnov <info@bunkr-drnov.cz>');
		$mail->addBcc('PV <pavel.voska@gmail.com>');
		return $mail;
	}

	public function sendConfirmation($data, $hash) {
		$mail = $this->createMail();
		$data->deleteHref = self::DELETE_LINK . $hash;
		$mail->addTo($data->email)
			->setHtmlBody($this->latte->renderToString(__DIR__ . '/../templates/confirmation.latte', (array)$data))
			->setSubject('Potvrzení rezervace');
		$this->mailer->send($mail);
	}
}
