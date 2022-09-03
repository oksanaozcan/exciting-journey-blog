<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\PostServiceController;
use App\Http\Requests\Admin\Post\StoreRequest;
use App\Http\Requests\Admin\Post\UpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PictureResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\TagResourse;
use App\Models\Category;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\SinglePostResource;

class PostController extends PostServiceController
{
  public function index()
  {
    $posts = PostResource::collection(Post::all());   
    $forTrashed = false;  
    return inertia('Admin/Posts/IndexPost', compact('posts', 'forTrashed'));
  }

  public function indexDeleted()
  {
    $posts = PostResource::collection(Post::onlyTrashed()->get());     
    $forTrashed = true;  
    return inertia('Admin/Posts/IndexPost', compact('posts', 'forTrashed'));
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

  public function show(Post $post)
  {
    $post = new SinglePostResource($post); 
    return inertia('Admin/Posts/ShowPost', compact('post'));
  }

  public function edit(Post $post)
  {
    $categories = CategoryResource::collection(Category::all());
    $tags = TagResourse::collection(Tag::all());  

    $postTags = TagResourse::collection($post->tags);
    $postPictures = PictureResource::collection($post->pictures);

    return inertia('Admin/Posts/EditPost', compact('post', 'categories', 'tags', 'postTags', 'postPictures'));
  }

  public function update(UpdateRequest $request, Post $post)
  {
    $data = $request->validated();
    $res = $this->service->update($data, $post);
    
    if ($res) {      
      return Redirect::back()->with('message', 'Post updated successfully!');
    }    
  }

  public function delete(Post $post)
  {
    $res = $this->service->delete($post);
    if ($res) {      
      return Redirect::route('admin.post.index')->with('message', 'Post deleted!');
    }    
  }

}