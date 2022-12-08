<?php

namespace App\Listeners;

use App\Events\UserSessionChanged;
use Illuminate\Auth\Events\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BroadcastUserLoginNotification
{
  public function __construct()
  {
      //
  }
   
  public function handle(Login $event)
  {
    broadcast(new UserSessionChanged("{$event->user->name} is online", 'login'));
  }
}
