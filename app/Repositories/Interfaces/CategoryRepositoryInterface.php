<?php 

namespace App\Repositories\Interfaces;

use App\Models\Category;
use Illuminate\Http\Request;

interface CategoryRepositoryInterface
{
  public function all(); 
  public function allWithFormating(); 
  public function onlyTrashed(); 
  public function create(Request $request);
  public function update(Request $request, Category $category);    
  public function delete(Category $category);    
}