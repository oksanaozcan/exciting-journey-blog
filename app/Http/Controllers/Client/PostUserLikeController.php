<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\PostUserLike;
use Illuminate\Support\Facades\Redirect;

class PostUserLikeController extends Controller
{
  public function toggleLike (Post $post)
  {
    $user = auth()->user();

    if (PostUserLike::where('post_id', $post->id)->where('user_id', $user->id)->exists()) {
      PostUserLike::where('post_id', $post->id)->where('user_id', $user->id)->delete();
      return Redirect::route('client.post.show', $post->id);
    } else {
      PostUserLike::create([
        'post_id' => $post->id,
        'user_id' => $user->id
      ]);
      return Redirect::route('client.post.show', $post->id);
    }
  }
}
