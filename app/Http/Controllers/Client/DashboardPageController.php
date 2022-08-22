<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Comment;
use App\Models\Post;
use App\Http\Resources\ShortCommentResource;
use App\Types\RoleType;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardPageController extends Controller
{
  public function index()
  {    
    $user = auth()->user();
    $comments = Comment::latest()->where('user_id', $user->id)->paginate();  
    
    $adminRole = false;

    if ($user->hasAnyRole([RoleType::ADMIN])) {
      $adminRole = true;
    }

    return Inertia::render('Dashboard', [
      'comments' => ShortCommentResource::collection($comments),
      'admin' => $adminRole
    ]);
  }

  
}
