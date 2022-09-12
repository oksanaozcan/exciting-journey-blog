<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\SingleArticleResource;
use App\Models\Article;
use App\Models\Comment;
use App\Models\PostUserLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PublicUserProfileResource;
use App\Models\User;

class ArticlePageController extends Controller
{
  public function index()
  {
    $articles = Article::orderByDesc('id')->paginate(5);
    $collection = ArticleResource::collection($articles);   

    return Inertia::render('AllArticles', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'all_articles' => $collection
    ]);
  }

  public function indexFromUser (User $user)  
  {
    $articles = Article::where('user_id', $user->id)->orderByDesc('id')->paginate(5);
    $collection = ArticleResource::collection($articles);       
    $author = new PublicUserProfileResource($user);

    return Inertia::render('AllArticles', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'all_articles' => $collection,
      'author' => $author
    ]);    
  }

  public function show(Article $article)
  {
    $article->visit();

    $collection = new SingleArticleResource($article);
    
    $comments = Comment::latest()->where('commentable_type', 'App\Models\Article')->where('commentable_id', $article->id)->paginate(10);
    $commentsCollection = CommentResource::collection($comments);   
    
    $isLiked = false;    
    if (auth()->user()) {      
      $user = auth()->user();
      $isLiked = PostUserLike::where('likeable_id', $article->id)->where('likeable_type', 'App\Models\Article')->where('user_id', $user->id)->exists();
    }        

    $author = User::find($article->user_id);

    if ($author->articles->isNotEmpty()) {
      $similarArticles = Article::where('user_id', $author->id)->where('id', '<>', $article->id)->get();

      if (count($similarArticles) > 3) {       
        $similarArticles = $similarArticles->random(3);
      }

      if ($similarArticles->isEmpty()) {
        $similarArticles = collect();
      } 
     
    } else {
      $similarArticles = collect();
    }  
    
    return Inertia::render('SingleArticle', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'article' => $collection,
      'comments' => $commentsCollection,
      'is_liked' => $isLiked,      
      'similar_articles' => ArticleResource::collection($similarArticles),      
    ]);
  }
}
