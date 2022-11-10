<?php

namespace App\Observers;

use App\Models\Article;
use Illuminate\Support\Facades\Cache;

class ArticleObserver
{    
  protected function clearCache() 
  {
    Cache::forget('allArticles');
  }

  public function created(Article $article)
  {
    $this->clearCache();
  }
  
  public function updated(Article $article)
  {
    $this->clearCache();
  }
  
  public function deleted(Article $article)
  {
    $this->clearCache();
  }
  
  public function restored(Article $article)
  {
    $this->clearCache();
  }
  
  public function forceDeleted(Article $article)
  {
    $this->clearCache();
  }
}
