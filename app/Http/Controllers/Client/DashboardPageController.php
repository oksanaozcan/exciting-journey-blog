<?php

namespace App\Http\Controllers\Client;

use App\Http\Resources\PublicUserProfileResource;
use App\Models\Comment;
use App\Http\Resources\ShortCommentResource;
use Inertia\Inertia;

class DashboardPageController extends BaseDashboardPageController
{
  public function index()
  {    
    $user = auth()->user();    

    $adminRole = parent::checkHasAnyRoleAdmin($user);

    return Inertia::render('Dashboard/Dashboard', [     
      'admin' => $adminRole,
      'public_info' => new PublicUserProfileResource($user)
    ]);
  }

  public function edit ()
  {
    $user = auth()->user();   
    $adminRole = parent::checkHasAnyRoleAdmin($user);

    return Inertia::render('Dashboard/EditProfile', [
      'admin' => $adminRole,
      'public_info' => new PublicUserProfileResource($user)
    ]);
  }

  public function communication ()
  {
    $user = auth()->user();  
    $comments = Comment::latest()->where('user_id', $user->id)->paginate();      
    $adminRole = parent::checkHasAnyRoleAdmin($user);    
    
    return Inertia::render('Dashboard/Communication', [
      'comments' => ShortCommentResource::collection($comments),
      'admin' => $adminRole      
    ]);
  }

  public function accountSecurity ()
  {
    $user = auth()->user();   
    $adminRole = parent::checkHasAnyRoleAdmin($user);

    return Inertia::render('Dashboard/AccountSecurity', [
      'admin' => $adminRole,
    ]);
  }

  
}
