<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\PostServiceController;
use App\Http\Requests\Admin\Post\StoreRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PostController extends PostServiceController
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
    $res = $this->service->store($data);
    
    if ($res) {
      return Redirect::route('admin.post.index')->with('message', 'Post created successfully!');
    }    
  }

}


// dd($request);
    // Debugbar::debug($request);  