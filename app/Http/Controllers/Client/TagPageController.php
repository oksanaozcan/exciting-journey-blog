<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Resources\TagResource;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class TagPageController extends Controller
{
  public function index ()
  {
    $tags = Cache::rememberForever('tags', function () {
      return TagResource::collection(Tag::paginate(40));
    });
    
    return Inertia::render('AllTags', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'tags' => $tags,
    ]);
  }

  public function show (Tag $tag)
  {
    $posts = Post::whereHas('tags', function ($q) use ($tag) {
      $q->where('tag_id', $tag->id);
    })->paginate(5);
    $collection = PostResource::collection($posts);  

    return Inertia::render('AllPosts', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'posts' => $collection
    ]);
  }
}
