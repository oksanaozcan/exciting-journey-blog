<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicUserProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PublicUserInfoPageController extends Controller
{
  public function show(User $user)  
  {
    $author = new PublicUserProfileResource($user);

    $isFollowing = false;

    if (auth()->user()) {
      $authUser = auth()->user();
      $isFollowing = $authUser->followings()->where('leader_id', $user->id)->exists();
    }

    $articles_count = $author->articles->count();
    $visits_count = DB::table('laravisits')->where('visitable_type', 'App\Models\Article')->where('data', '{"author_id":'.$author->id.'}')->count();
    $likes_count = $author->likesFromFollowers->count();
    $comments_count = $author->commentsFromMyArticles->count();

    return Inertia::render('PublicUserProfile', [  
      'author' => $author,
      'is_followings' => $isFollowing,
      'articles_count' => $articles_count,
      'visits_count' => $visits_count,
      'likes_count' => $likes_count,
      'comments_count' => $comments_count
    ]);
  }
}
