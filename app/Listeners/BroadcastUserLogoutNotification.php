<?php

namespace App\Listeners;

use App\Events\UserSessionChanged;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BroadcastUserLogoutNotification
{
  public function __construct()
  {
      //
  }
   
  public function handle(Logout $event)
  {
    broadcast(new UserSessionChanged("{$event->user->name} is offline", 'logout'));
  }
}
