<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Comment;
use App\Models\Post;
use App\Http\Resources\ShortCommentResource;
use App\Types\RoleType;
use Inertia\Inertia;

class DashboardPageController extends Controller
{
  public function index()
  {    
    $user = auth()->user();
    $comments = Comment::latest()->where('user_id', $user->id)->take(2)->get();  
    
    $postResource = null;

    if ($user->hasAnyRole([RoleType::ADMIN, RoleType::WRITER])) {
      $posts = Post::latest()->where('user_id', $user->id)->take(5)->get();
      $postResource = PostResource::collection($posts);
    }

    return Inertia::render('Dashboard', [
      'comments' => ShortCommentResource::collection($comments),
      'posts' => $postResource
    ]);
  }

  public function loadMoreComments($value)
  {
    dd($value);
  }
}
