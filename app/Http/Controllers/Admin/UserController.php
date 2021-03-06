<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{   
  public function index()
  {
    $users = User::all();   
    return view('admin.user.index', compact('users'));
  }

  public function indexDeleted()
  {
    $trashedUsers = User::onlyTrashed()->get();
    return view('admin.user.deleted', compact('trashedUsers'));
  }  
 
  public function show(User $user)
  {
    return view('admin.user.show', compact('user'));
  }
  
  public function edit(User $user)
  {
    $roles = Role::all();
    return view('admin.user.edit', compact('user', 'roles'));
  }
    
  public function update(Request $request, User $user)
  {
    $data = $request->validate([
      'role' =>'required'
    ]);
    $user->removeRole($user->roles->pluck('name')[0]);
    $user->assignRole($data['role']);

    return view('admin.user.show', compact('user'));
  }

  public function delete(User $user)
  {
    $user->delete();
    return redirect()->route('admin.user.index');    
  }     
  
}
