<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Facades\Cache;

class PostObserver
{
  protected function clearCache() 
  {
    Cache::forget('latestPosts');
    Cache::forget('posts');
  }

  public function created(Post $post)
  {
    $this->clearCache();
  }
  
  public function updated(Post $post)
  {
    $this->clearCache();
  }
  
  public function deleted(Post $post)
  {
    $this->clearCache();
  }
  
  public function restored(Post $post)
  {
    $this->clearCache();
  }

  public function forceDeleted(Post $post)
  {
    $this->clearCache();
  }
}
