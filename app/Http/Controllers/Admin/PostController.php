<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\PostServiceController;
use App\Http\Requests\Admin\Post\StoreRequest;
use App\Http\Requests\Admin\Post\UpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\TagResourse;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    $tags = TagResourse::collection(Tag::all());  
    return inertia('Admin/Posts/CreatePost', compact('categories', 'tags'));
  }

  public function store(StoreRequest $request)
  {
    $data = $request->validated();   
    $res = $this->service->store($data);
    
    if ($res) {      
      return Redirect::back()->with('message', 'Post created successfully!');
    }    
  }

  public function edit(Post $post)
  {
    $categories = CategoryResource::collection(Category::all());
    $tags = TagResourse::collection(Tag::all());  

    $postTags = TagResourse::collection($post->tags);

    return inertia('Admin/Posts/EditPost', compact('post', 'categories', 'tags', 'postTags'));
  }

  public function update(UpdateRequest $request, Post $post)
  {
    $data = $request->validated();
    dd($data);           
  }

}


// dd($request);
    // Debugbar::debug($request);  