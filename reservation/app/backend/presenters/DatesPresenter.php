<?php

use BD\Model\DatesManager;
use BD\Model\Mailer;
use Nette\Application\ForbiddenRequestException;
use Nette\Application\UI\Presenter;
use Tracy\Debugger;
use Nette\Http\Request;
/**
 *
 * @author PV
 */
class DatesPresenter extends Presenter
{
    /** @var DatesManager @inject */
    public $datesManager;
    /** @var Mailer @inject */
    public $mailer;
    public $httpResponse;

    public function startup() {
        $this->httpResponse = $this->context->getByType('Nette\Http\Response');
        parent::startup();
    }

    public function actionAddDate()
    {
/*        if (!$this->user->isLoggedIn()) {
            throw new ForbiddenRequestException;
        }

        $userID = $this->user->id;
        $this->restaurantsManager->addRating($restaurantID, $userID, $value);

        $row = $this->restaurantsManager->findRatingByID($restaurantID);

        $this->sendJson(array('rating' => $row->rating));*/
    }

    public function actionIndex()
    {
        $this->sendJson(array("ok" => true));
    }

    public function actionDefault()
    {
        $dates = $this->datesManager->findAll();
        $this->sendJson($dates);
    }

    public function actionGet()
    {
        $id = $this->request->getParameters();
        $result = $this->datesManager->findReservationByHash($id['id']);
        if (!$result) {
            $this->getHttpResponse()->setCode(Nette\Http\IResponse::S400_BAD_REQUEST);
            $this->sendJson(array("ok" => false));
        }
        $date = $this->datesManager->mapRow($this->datesManager->fetchDateById($result->date));
        $result = iterator_to_array($result);
        $result['date'] = $date;
        $this->sendJson($result);
    }

    public function actionCreate()
    {
        $data = json_decode(file_get_contents('php://input'));
        $data->notes = (isset($data->notes) ? $data->notes : '');
        $data->newsletter = (isset($data->newsletter) ? $data->newsletter : 0);
        $resultHash = $this->datesManager->makeReservation($data);
        if ($resultHash) {
            $data->date = $this->datesManager->fetchSingle($data->dateId);
            $this->mailer->sendConfirmation($data, $resultHash);
            $this->sendJson(array("hash" => $resultHash));
        } else {
            $this->httpResponse->setCode(Nette\Http\Response::S404_NOT_FOUND);
            $this->sendJson(array("ok" => false));
        }
    }

    public function actionDelete()
    {
        $data = json_decode(file_get_contents('php://input'));
        $result = $this->datesManager->cancelReservation($data);
        $this->sendJson(array("ok" => $result));
    }

}
