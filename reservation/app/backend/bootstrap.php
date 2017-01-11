<?php

use Nette\Application\Routers\Route;
use Nette\Configurator;
use Nette\Environment;

require __DIR__ . '/../vendor/autoload.php';

$configurator = new Configurator;

//$configurator->setDebugMode(false);
if (!file_exists(__DIR__ . '/../log')) {
    mkdir(__DIR__ . '/../log');
}

$configurator->enableDebugger(__DIR__ . '/../log');

$configurator->setTempDirectory(__DIR__ . '/../tmp');
$configurator->createRobotLoader()
    ->addDirectory(__DIR__)
    ->register();

$configurator->addConfig(__DIR__ . '/config/config.neon', Configurator::AUTO);

$container = $configurator->createContainer();

$container->router[] = new RestRoute('', array(
    'presenter' => 'Dates',
    'action' => 'index'
), RestRoute::METHOD_GET);

$container->router[] = new RestRoute('dates', array(
    'presenter' => 'Dates',
    'action' => 'default'
), RestRoute::METHOD_GET);

$container->router[] = new RestRoute('reservations', array(
    'presenter' => 'Dates',
    'action' => 'create'
), RestRoute::METHOD_POST);

$container->router[] = new RestRoute('reservations', array(
    'presenter' => 'Dates',
    'action' => 'get'
), RestRoute::METHOD_GET);

$container->router[] = new RestRoute('delete-reservation', array(
    'presenter' => 'Dates',
    'action' => 'delete'
), RestRoute::METHOD_POST);

return $container;
