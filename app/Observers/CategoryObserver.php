<?php

namespace App\Observers;

use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryObserver
{    
  protected function clearCache() 
  {
    Cache::forget('categories');
  }

  public function created(Category $category)
  {
    $this->clearCache();
  }

  public function updated(Category $category)
  {
    $this->clearCache();
  }
  
  public function deleted(Category $category)
  {
    $this->clearCache();
  }
  
  public function restored(Category $category)
  {
    $this->clearCache();
  }
  
  public function forceDeleted(Category $category)
  {
    $this->clearCache();
  }
}
