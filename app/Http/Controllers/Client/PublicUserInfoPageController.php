<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicUserInfoPageController extends Controller
{
  public function show(User $user)
  {
    return Inertia::render('PublicUserProfile', [      
      
    ]);
  }
}
