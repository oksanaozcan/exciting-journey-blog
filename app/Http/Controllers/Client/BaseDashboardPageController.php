<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Types\RoleType;

class BaseDashboardPageController extends Controller
{  
  public static bool $hasAnyAdminRole = false;

  public static function checkHasAnyRoleAdmin (User $user)
  {
    if ($user->hasAnyRole([RoleType::ADMIN])) {
      return self::$hasAnyAdminRole = true;
    } else {
      return self::$hasAnyAdminRole = false;
    }
  }
}
