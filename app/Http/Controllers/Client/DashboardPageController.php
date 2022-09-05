<?php

namespace App\Http\Controllers\Client;

use App\Http\Resources\PublicUserProfileResource;
use App\Models\Comment;
use App\Http\Resources\ShortCommentResource;
use App\Http\Resources\ShortPostResource;
use Illuminate\Support\Facades\DB;
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
    $comments = Comment::where('user_id', $user->id)->orderByDesc('id')->paginate();      
    $adminRole = parent::checkHasAnyRoleAdmin($user);    
    
    return Inertia::render('Dashboard/Communication', [
      'comments' => ShortCommentResource::collection($comments),
      'admin' => $adminRole      
    ]);
  } 

  public function likedPosts ()
  {
    $user = auth()->user();   
    $adminRole = parent::checkHasAnyRoleAdmin($user);

    $likedPosts = DB::table('post_user_likes')
    ->select('post_user_likes.*', 'posts.title')
    ->join('posts', 'post_user_likes.post_id', '=', 'posts.id')
    ->where('post_user_likes.user_id', $user->id)
    ->orderByDesc('created_at')
    ->paginate();
    
    $shortPosts = ShortPostResource::collection($likedPosts);

    return Inertia::render('Dashboard/LikedPosts', [
      'admin' => $adminRole,
      'liked_posts' => $shortPosts,
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
