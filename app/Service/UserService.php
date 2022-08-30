<?php

namespace App\Service;

use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserService
{
  public function update(User $user, $data)
  {
    try {
      DB::beginTransaction(); 
      
      $user->update([
        'name' => $data['name']
      ]);

      $user->publicInfo->update([
        'headline' => $data['headline'],
        'description' => $data['description'],
        'website' => $data['website'],
        'twitter' => $data['twitter'],
        'facebook' => $data['facebook'],
        'instagram' => $data['instagram'],
        'youtube' => $data['youtube'] 
      ]);     
      
      DB::commit();

      return true;

    } catch (Exception $exception) {
      DB::rollBack();
      abort(500, $exception);
    }
  }  
  
}