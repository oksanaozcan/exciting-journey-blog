<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  public function index()
  {
    $comments = Comment::all();
    return view('admin.comment.index', compact('comments'));
  }

  public function indexDeleted()
  {
    $trashedComments = Comment::onlyTrashed()->get();
    return view('admin.comment.deleted', compact('trashedComments'));
  }    
  
  public function show(Comment $comment)
  {
    return view('admin.comment.show', compact('comment'));
  }
  
  public function edit(Comment $comment)
  {
    return view('admin.comment.edit', compact('comment'));
  }

  public function update(Request $request, Comment $comment)
  {    
    $data = $request->validate([
      'message' => 'required',
    ]);
    
    $comment->update($data);     
    
    return view('admin.comment.show', compact('comment'));
  }
  
  public function delete(Comment $comment)
  {
    $comment->delete();
    return redirect()->route('admin.comment.index');    
  } 
}
