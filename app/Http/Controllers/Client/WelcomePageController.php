<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomePageController extends Controller
{
  public function index()
  {
    $latestPosts = Cache::rememberForever('latestPosts', function () {
      return PostResource::collection(Post::latest()->limit(4)->get());
    });

    $popularPosts = Cache::remember('popularPosts', now()->addHours(4), function () {
      return PostResource::collection(Post::withCount('likes')->orderBy('likes_count', 'DESC')->get()->take(5));
    });

    return Inertia::render('Welcome', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),     
      'latestPosts' => $latestPosts,
      'categories' => CategoryResource::collection(Cache::get('categories')->shuffle()->take(8)),
      'popularPosts' => $popularPosts,
  ]);
  }
}
