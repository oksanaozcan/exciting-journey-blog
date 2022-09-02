<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomePageController extends Controller
{
  public function index()
  {
    // $popularPosts = Post::withCount('comments')->orderBy('comments_count', 'DESC')->get()->take(5);
    $popularPosts = Post::withCount('likes')->orderBy('likes_count', 'DESC')->get()->take(5);

    return Inertia::render('Welcome', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),     
      'latestPosts' => PostResource::collection(Post::latest()->limit(4)->get()),
      'categories' => CategoryResource::collection(Category::inRandomOrder()->limit(8)->get()),
      'popularPosts' => PostResource::collection($popularPosts)
  ]);
  }
}
