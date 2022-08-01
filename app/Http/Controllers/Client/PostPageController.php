<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PostPageController extends Controller
{
  public function index()
  {
    return Inertia::render('AllPosts', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),     
    ]);
  }
}
