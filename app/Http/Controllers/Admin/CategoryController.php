<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
  public function index()
  {
    $categories = Category::all();
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
    $data = $request->validate([
      'title' => 'required',
      'preview' => 'required|file'
    ]);

    $preview = $data['preview'];    
    $pathPreview = Storage::disk('public')->put('categories', $preview);   

    Category::create([
      'title' => $data['title'],
      'preview' => url('/storage/' . $pathPreview)
    ]);
    
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
    $data = $request->validate([
      'title' => 'required',
      'preview' => 'nullable|file'
    ]);

    if (isset($data['preview'])) {
      $preview = $data['preview'];    
      $pathPreview = Storage::disk('public')->put('categories', $preview);  

      $category->update([
        'title' => $data['title'],
        'preview' => url('/storage/' . $pathPreview),
      ]);
    } else {
      $category->update($data);
    }  
    
    return view('admin.category.show', compact('category'));
  }
  
  public function delete(Category $category)
  {
    $category->delete();
    return redirect()->route('admin.category.index');    
  } 
}
