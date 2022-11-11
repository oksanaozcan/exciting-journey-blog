<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;

class FollowUserController extends Controller
{
  public function follow (User $user)
  {
    $follower = auth()->user();
    $leader = $user;
    if (!$leader) {
      return redirect()->back()->with('error', 'User does not exist.');
    } else {
      if ($follower->id === $leader->id) {
        return redirect()->back()->with('error', 'You can not follow yourself.');
      } else {
        $leader->followers()->attach($follower->id);
        return redirect()->back()->with('success', 'Successfully followed the user.');
      }     
    }
  }

  public function unfollow(User $user)
  {
    $follower = auth()->user();
    $leader = $user;
    if (!$leader) {
      return redirect()->back()->with('error', 'User does not exist.');
    } else {
      $leader->followers()->detach($follower->id);
      return redirect()->back()->with('success', 'Successfully unfollowed the user.');
    }
  }
}
