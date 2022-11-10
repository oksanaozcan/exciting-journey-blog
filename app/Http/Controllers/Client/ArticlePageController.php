<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\SingleArticleResource;
use App\Models\Article;
use App\Models\Comment;
use App\Models\PostUserLike;
use Inertia\Inertia;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PublicUserProfileResource;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class ArticlePageController extends Controller
{
  public function index()
  {
    $allArticles = Cache::rememberForever('allArticles', function () {
      return ArticleResource::collection(Article::orderByDesc('id')->paginate(5));
    });    

    return Inertia::render('AllArticles', [        
      'all_articles' => $allArticles,
    ]);
  }

  public function indexSubscribers()
  {
    $user = auth()->user();        
    $leaders = $user->followings->pluck(['id']);    

    $res = Article::with('user')->whereIn('user_id', $leaders)->paginate(5);

    $collection = ArticleResource::collection($res);

    return Inertia::render('AllArticles', [        
      'all_articles' => $collection
    ]);
  }

  public function indexFromUser (User $user)  
  {
    $articles = Article::where('user_id', $user->id)->orderByDesc('id')->paginate(5);
    $collection = ArticleResource::collection($articles);       
    $author = new PublicUserProfileResource($user);

    $isFollowing = false;

    if (auth()->user()) {
      $authUser = auth()->user();
      $isFollowing = $authUser->followings()->where('leader_id', $user->id)->exists();
    }
   
    return Inertia::render('AllArticles', [      
      'all_articles' => $collection,
      'author' => $author,
      'is_followings' => $isFollowing
    ]);    
  }
  
  public function show(Article $article)
  {
    $article->visit()->withData(['author_id' => $article->user_id]);

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
      'article' => $collection,
      'comments' => $commentsCollection,
      'is_liked' => $isLiked,      
      'similar_articles' => ArticleResource::collection($similarArticles),      
    ]);
  }
}
