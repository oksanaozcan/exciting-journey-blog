<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Service\UserService;

class UserServiceController extends Controller
{
  public $service;

  public function __construct(UserService $service)
  {
    $this->service = $service;
  } 
    
}