<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\UserServiceController;
use App\Http\Requests\Client\User\UpdatePasswordRequest;
use App\Http\Requests\Client\User\UpdatePublicUserInfoRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
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

  public function updatePassword (User $user, UpdatePasswordRequest $request)
  {
    $data = $request->validated();
    
    if(Hash::check($data['current_password'], auth()->user()->password)) {
      User::whereId(auth()->user()->id)->update([
        'password' => Hash::make($data['new_password'])
      ]);    
      return Redirect::back()->with('message', 'Password change successfully');
    } else {
      return Redirect::route('dashboard.edit.password')->with('message', 'Wrong Current Password');
    }
  }
}
