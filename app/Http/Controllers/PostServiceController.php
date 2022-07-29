<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Service\PostService;

class PostServiceController extends Controller
{
  public $service;

  public function __construct(PostService $service)
  {
    $this->service = $service;
  } 
    
}