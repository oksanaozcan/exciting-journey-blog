<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Post\StoreRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
  public function index()
  {
    $posts = PostResource::collection(Post::all()); 
    return inertia('Admin/Posts/IndexPost', compact('posts'));
  }

  public function create()
  { 
    $categories = CategoryResource::collection(Category::all());
    return inertia('Admin/Posts/CreatePost', compact('categories'));
  }

  public function store(StoreRequest $request)
  {
    $data = $request->validated();   

    $preview = $data['preview'];    
    $pathPreview = Storage::disk('public')->put('previews', $preview); 

    $post = Post::create([
      'preview' => url('/storage/' . $pathPreview),
      'title' => $data['title'],
      'content' => json_encode([0 => ["text" => $data['content']]]),
      'category_id' => $data['category_id']['id'],
    ]);
    
    return Redirect::route('admin.post.index')->with('message', 'Post created successfully!');
  }

}


// dd($request);
    // Debugbar::debug($request);  