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

    $comments = Comment::latest()->where('post_id', $post->id)->paginate(10);  
    $commentsCollection = CommentResource::collection($comments);   
    
    $isLiked = false;    
    if (auth()->user()) {      
      $user = auth()->user();
      $isLiked = PostUserLike::where('post_id', $post->id)->where('user_id', $user->id)->exists();
    }    

    $countLikes = $post->likes->count();

    if ($post->tags->isNotEmpty()) {      
      $similarPosts = Post::whereHas('tags', function ($q) use($post) {
        $tagIds = $post->tags()->pluck('tags.id')->all();
        $q->whereIn('tags.id', $tagIds);
      })->where('id', '<>', $post->id)->get()->random(3);
    } else {
      $similarPosts = collect();
    }  

    return Inertia::render('SinglePost', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'post' => $collection,
      'comments' => $commentsCollection,
      'is_liked' => $isLiked,
      'count_likes' => $countLikes,
      'similar_posts' => PostResource::collection($similarPosts),
    ]);
  }
}
