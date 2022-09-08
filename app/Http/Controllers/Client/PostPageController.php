<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\SinglePostResource;
use App\Models\Comment;
use App\Models\Post;
use App\Models\PostUserLike;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PostPageController extends Controller
{
  public function index ()
  {    
    $posts = Post::orderByDesc('id')->paginate(5);
    $collection = PostResource::collection($posts);   

    return Inertia::render('AllPosts', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'posts' => $collection
    ]);
  }  

  public function show (Post $post)
  {
    $post->visit();

    $collection = new SinglePostResource($post);   
    
    $comments = Comment::latest()->where('commentable_type', 'App\Models\Post')->where('commentable_id', $post->id)->paginate(10);
    $commentsCollection = CommentResource::collection($comments);   
    
    $isLiked = false;    
    if (auth()->user()) {      
      $user = auth()->user();
      $isLiked = PostUserLike::where('likeable_id', $post->id)
        ->where('likeable_type', 'App\Models\Post')
        ->where('user_id', $user->id)->exists();
    }    

    if ($post->tags->isNotEmpty()) {      
      
      $similarPosts = Post::whereHas('tags', function ($q) use($post) {
        $tagIds = $post->tags()->pluck('tags.id')->all();
        $q->whereIn('tags.id', $tagIds);
      })->where('id', '<>', $post->id)->get();

      if (count($similarPosts) > 3) {       
        $similarPosts = $similarPosts->random(3);
      }

      if ($similarPosts->isEmpty()) {
        $similarPosts = collect();
      } 
     
    } else {
      $similarPosts = collect();
    }  

    return Inertia::render('SinglePost', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'post' => $collection,
      'comments' => $commentsCollection,
      'is_liked' => $isLiked,
      'similar_posts' => PostResource::collection($similarPosts),
    ]);
  }
}
