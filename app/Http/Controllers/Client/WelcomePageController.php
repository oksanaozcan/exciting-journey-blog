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
    return Inertia::render('Welcome', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),
      'laravelVersion' => Application::VERSION,
      'phpVersion' => PHP_VERSION,
      'latestPosts' => PostResource::collection(Post::latest()->limit(4)->get()),
      'categories' => CategoryResource::collection(Category::inRandomOrder()->limit(8)->get())
  ]);
  }
}
