<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\UserServiceController;
use App\Http\Requests\Client\User\UpdatePublicUserInfoRequest;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class UserController extends UserServiceController
{
  public function update (User $user, UpdatePublicUserInfoRequest $request)
  {   
    $data = $request->validated();
    $res = $this->service->update($user, $data);
    
    if ($res) {      
      return Redirect::back()->with('message', 'Public info updated successfully');
    }    
  }
}
