<?php

namespace App\Observers;

use App\Models\PublicUserInfo;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class UserObserver
{
  protected function clearCache() 
  {
    Cache::forget('permission');   
  }

  public function created(User $user)
  {
    PublicUserInfo::create([
      'user_id' => $user->id
    ]);
    $this->clearCache();
  }
  
  public function updated(User $user)
  {
    $this->clearCache();
  }

  public function deleted(User $user)
  {
    $this->clearCache();
  }
  
  public function restored(User $user)
  {
    $this->clearCache();
  }
  
  public function forceDeleted(User $user)
  {
    $this->clearCache();
  }
}
