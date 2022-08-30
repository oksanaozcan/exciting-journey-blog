<?php

namespace App\Http\Controllers\Client;

use App\Http\Resources\PostResource;
use App\Http\Resources\PublicUserProfileResource;
use App\Models\Comment;
use App\Models\Post;
use App\Http\Resources\ShortCommentResource;
use App\Models\PublicUserInfo;
use App\Models\User;
use App\Types\RoleType;
use Barryvdh\Debugbar\Facades\Debugbar;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardPageController extends BaseDashboardPageController
{
  public function index()
  {    
    $user = auth()->user();    
    $adminRole = parent::checkHasAnyRoleAdmin($user);

    return Inertia::render('Dashboard/Dashboard', [     
      'admin' => $adminRole
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

  
}
