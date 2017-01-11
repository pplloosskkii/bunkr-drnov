<?php
namespace BD\Model;

use Nette\Database\Context;

/**
 *
 * @author Marian Rusnak
 */
class BaseManager
{
    /** @var Context */
    protected $db;


    public function __construct(Context $db)
    {
        $this->db = $db;
    }
}
