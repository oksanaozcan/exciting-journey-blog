<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{   
  public function index()
  {
    $users = User::all(['id', 'name', 'email', 'created_at']);   
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
    return view('admin.user.edit', compact('user'));
  }
    
  public function update(Request $request, $id)
  {
    //
  }

  public function delete(User $user)
  {
    $user->delete();
    return redirect()->route('admin.user.index');    
  }     
  
}
