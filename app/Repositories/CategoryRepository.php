<?php 

namespace App\Repositories;
use Illuminate\Support\Facades\Cache;
use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\CategoryResource;

class CategoryRepository implements CategoryRepositoryInterface {

  public function all()
  {
    return Cache::rememberForever('categories', function () {
      return Category::all();
    }); 
  }

  public function allWithFormating ()
  {
    return CategoryResource::collection(Category::paginate(10));
  }

  public function onlyTrashed()
  {
    return Category::onlyTrashed()->get();
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

  public function delete (Category $category)
  {
    $category->delete();
  }  
}