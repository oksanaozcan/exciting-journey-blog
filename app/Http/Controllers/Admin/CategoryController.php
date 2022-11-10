<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Repositories\CategoryRepository;

class CategoryController extends Controller
{
  private $categoryRepository;

  public function __construct(CategoryRepository $categoryRepository)
  {
    $this->categoryRepository = $categoryRepository;    
  }

  public function index()
  {
    $categories = $this->categoryRepository->all();
    return view('admin.category.index', compact('categories'));
  }

  public function indexDeleted()
  {
    $trashedCategories = Category::onlyTrashed()->get();
    return view('admin.category.deleted', compact('trashedCategories'));
  }  

  public function create()
  {
    return view('admin.category.create');
  }
  
  public function store(Request $request)
  {
    $this->categoryRepository->create($request);    
    return redirect()->route('admin.category.index');    
  }
  
  public function show(Category $category)
  {
    return view('admin.category.show', compact('category'));
  }
  
  public function edit(Category $category)
  {
    return view('admin.category.edit', compact('category'));
  }

  public function update(Request $request, Category $category)
  {
    $this->categoryRepository->update($request, $category);        
    return view('admin.category.show', compact('category'));
  }
  
  public function delete(Category $category)
  {
    $category->delete();
    return redirect()->route('admin.category.index');    
  } 
}
