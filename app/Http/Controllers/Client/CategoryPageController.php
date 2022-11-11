<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryPageController extends Controller
{
  private $categoryRepository;

  public function __construct(CategoryRepositoryInterface $categoryRepository)
  {
    $this->categoryRepository = $categoryRepository;    
  }

  public function index ()
  { 
    $categories = $this->categoryRepository->allWithFormating();

    return Inertia::render('AllCategories', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),      
      'categories' => $categories,      
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
