<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PhpParser\Node\Expr\AssignOp\Pow;

class CategoryPageController extends Controller
{
  public function index ()
  {    
    $categories = Category::paginate(10);    
    $collection = CategoryResource::collection($categories);
    
    return Inertia::render('AllCategories', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'categories' => $collection,
      
    ]);
  }

  public function show (Category $category)
  {
    $posts = Post::latest()->where('category_id', $category->id)->paginate(5);
    $collection = PostResource::collection($posts);

    return Inertia::render('AllPosts', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'posts' => $collection
    ]);
  }

}
