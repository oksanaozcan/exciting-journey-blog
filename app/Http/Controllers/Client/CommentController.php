<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Comment\StoreRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Resources\CommentResource;
use App\Http\Resources\SinglePostResource;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
  public function store (StoreRequest $request)
  {
    $data = $request->validated();
    $comment = Comment::create([
      'message' => $data['message'],
      'post_id' => $data['post_id'],
      'user_id' => auth()->user()->id,
    ]);

    if ($comment) {
      return Redirect::route('client.post.show', $comment->post_id);
    }
    
  }
}
