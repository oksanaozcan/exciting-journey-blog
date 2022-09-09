<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\PostUserLike;
use Illuminate\Support\Facades\Redirect;

class PostUserLikeController extends Controller
{
  public function toggleLike (Request $request, Post $post)
  {
    $model = $request->input('model');
    $user = auth()->user();

    if (PostUserLike::where('likeable_id', $post->id)->where('likeable_type', $model)->where('user_id', $user->id)->exists()) 
    {
      PostUserLike::where('likeable_id', $post->id)->where('likeable_type', $model)->where('user_id', $user->id)->delete();
      return Redirect::route('client.post.show', $post->id);
    } 
    else 
    {
      PostUserLike::create([
        'likeable_type' => $model,
        'likeable_id' => $post->id,
        'user_id' => $user->id
      ]);
      return Redirect::route('client.post.show', $post->id);
    }
  }

  public function toggleLikeArticle (Request $request, Article $article)
  {
    $model = $request->input('model');
    $user = auth()->user();

    if (PostUserLike::where('likeable_id', $article->id)->where('likeable_type', $model)->where('user_id', $user->id)->exists()) 
    {
      PostUserLike::where('likeable_id', $article->id)->where('likeable_type', $model)->where('user_id', $user->id)->delete();
      return Redirect::route('client.article.show', $article->id);
    } 
    else 
    {
      PostUserLike::create([
        'likeable_type' => $model,
        'likeable_id' => $article->id,
        'user_id' => $user->id
      ]);
      return Redirect::route('client.article.show', $article->id);
    }
  }

}
