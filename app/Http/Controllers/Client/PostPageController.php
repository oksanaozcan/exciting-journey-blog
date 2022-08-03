<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Resources\SinglePostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PhpParser\Node\Expr\AssignOp\Pow;

class PostPageController extends Controller
{
  public function index ()
  {    
    $posts = Post::latest()->paginate(5);
    $collection = PostResource::collection($posts);   

    return Inertia::render('AllPosts', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'posts' => $collection
    ]);
  }  

  public function show (Post $post)
  {
    $collection = new SinglePostResource($post);       

    return Inertia::render('SinglePost', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'post' => $collection
    ]);
  }
}
