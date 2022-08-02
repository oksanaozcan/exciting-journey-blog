<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PostPageController extends Controller
{
  public function index()
  {
    // $posts = PostResource::collection(Post::latest()->get());   
    $posts = Post::latest()->paginate(5);
    $collection = PostResource::collection($posts);   

    return Inertia::render('AllPosts', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'posts' => $collection
    ]);
  }
}
