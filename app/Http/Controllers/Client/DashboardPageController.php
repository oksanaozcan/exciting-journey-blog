<?php

namespace App\Http\Controllers\Client;

use App\Http\Resources\PublicUserProfileResource;
use App\Models\Comment;
use App\Http\Resources\ShortCommentResource;
use App\Http\Resources\ShortPostResource;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Http\Resources\ShortUserResource;
use App\Models\User;

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

    $likedPosts = DB::table('post_user_likes')->where('likeable_type', 'App\Models\Post')
    ->select('post_user_likes.*', 'posts.title')
    ->join('posts', 'post_user_likes.likeable_id', '=', 'posts.id')
    ->where('post_user_likes.user_id', $user->id)
    ->orderByDesc('created_at')
    ->paginate();
    
    $shortPosts = ShortPostResource::collection($likedPosts);

    return Inertia::render('Dashboard/LikedPosts', [
      'admin' => $adminRole,
      'liked_posts' => $shortPosts,
    ]);    
  }  

  public function likedArticles ()
  {
    $user = auth()->user();   
    $adminRole = parent::checkHasAnyRoleAdmin($user);

    $likedArticles = DB::table('post_user_likes')->where('likeable_type', 'App\Models\Article')
    ->select('post_user_likes.*', 'articles.title')
    ->join('articles', 'post_user_likes.likeable_id', '=', 'articles.id')
    ->where('post_user_likes.user_id', $user->id)
    ->orderByDesc('created_at')
    ->paginate();
    
    $shortArticles = ShortPostResource::collection($likedArticles);

    return Inertia::render('Dashboard/LikedArticles', [
      'admin' => $adminRole,
      'liked_articles' => $shortArticles,
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

  public function followings()
  {
    $user = auth()->user();   
    $adminRole = parent::checkHasAnyRoleAdmin($user);

    $followings = ShortUserResource::collection(User::find($user->id)->followings()->paginate());

    return Inertia::render('Dashboard/MyFollowings', [
      'admin' => $adminRole,
      'followings' => $followings
    ]);
  }

  public function followers()
  {
    $user = auth()->user();   
    $adminRole = parent::checkHasAnyRoleAdmin($user);

    $followers = ShortUserResource::collection(User::find($user->id)->followers()->paginate());

    return Inertia::render('Dashboard/MyFollowers', [
      'admin' => $adminRole,
      'followers' => $followers
    ]);
  }
  
}
