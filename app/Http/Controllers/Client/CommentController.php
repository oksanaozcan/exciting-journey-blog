<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\Comment\StoreRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
  public function store (StoreRequest $request)
  {
    $data = $request->validated();    
    $comment = Comment::create([
      'message' => $data['message'],
      'commentable_type' => $data['commentable_type'],
      'commentable_id' => $data['commentable_id'],
      'user_id' => auth()->user()->id,
      'parent_id' => $data['parent_id'],
    ]);

    if ($comment) {
      return Redirect::route('client.post.show', $comment->commentable_id);
    }
    
  }
}
