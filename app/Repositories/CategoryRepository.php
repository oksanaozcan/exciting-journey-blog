<?php 

namespace App\Repositories;
use Illuminate\Support\Facades\Cache;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryRepository {

  public function all()
  {
    return Cache::rememberForever('categories', function () {
      return Category::all();
    }); 
  }

  public function create(Request $request)
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
  }
  
}