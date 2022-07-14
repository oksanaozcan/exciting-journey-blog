<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;

class PostController extends Controller
{
  public function index()
  {
    $posts = PostResource::collection(Post::all());    
    // Debugbar::debug($posts);
    return inertia('Admin/Posts/IndexPost', compact('posts'));
  }

  public function create()
  {    
    return inertia('Admin/Posts/CreatePost');
  }

}
