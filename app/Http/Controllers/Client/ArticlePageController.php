<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\SingleArticleResource;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Resources\CommentResource;

class ArticlePageController extends Controller
{
  public function index()
  {
    $articles = Article::latest()->paginate(5);
    $collection = ArticleResource::collection($articles);   

    return Inertia::render('AllArticles', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'articles' => $collection
    ]);
  }

  public function show(Article $article)
  {
    $article->visit();

    $collection = new SingleArticleResource($article);
    
    $comments = Comment::latest()->where('commentable_type', 'App\Models\Article')->where('commentable_id', $article->id)->paginate(10);
    $commentsCollection = CommentResource::collection($comments);   
    
    // $isLiked = false;    
    // if (auth()->user()) {      
    //   $user = auth()->user();
    //   $isLiked = PostUserLike::where('post_id', $post->id)->where('user_id', $user->id)->exists();
    // }    

    // $countLikes = $post->likes->count();

    // if ($post->tags->isNotEmpty()) {      
      
    //   $similarPosts = Post::whereHas('tags', function ($q) use($post) {
    //     $tagIds = $post->tags()->pluck('tags.id')->all();
    //     $q->whereIn('tags.id', $tagIds);
    //   })->where('id', '<>', $post->id)->get();

    //   if (count($similarPosts) > 3) {       
    //     $similarPosts = $similarPosts->random(3);
    //   }

    //   if ($similarPosts->isEmpty()) {
    //     $similarPosts = collect();
    //   } 
     
    // } else {
    //   $similarPosts = collect();
    // }  
    
    return Inertia::render('SingleArticle', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'article' => $collection,
      'comments' => $commentsCollection,
      // 'is_liked' => $isLiked,
      // 'count_likes' => $countLikes,
      // 'similar_posts' => PostResource::collection($similarPosts),      
    ]);
  }
}
