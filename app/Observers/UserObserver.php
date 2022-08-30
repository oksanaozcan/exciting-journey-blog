<?php

namespace App\Observers;

use App\Models\PublicUserInfo;
use App\Models\User;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Support\Facades\Log;

class UserObserver
{    
  public function created(User $user)
  {
    PublicUserInfo::create([
      'user_id' => $user->id
    ]);
  }
  
  public function updated(User $user)
  {
      //
  }

  public function deleted(User $user)
  {
      //
  }
  
  public function restored(User $user)
  {
      //
  }
  
  public function forceDeleted(User $user)
  {
      //
  }
}
