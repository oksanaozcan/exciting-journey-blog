<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Types\RoleType;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Exception;
use Illuminate\Support\Facades\Cache;

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

  public function indexReaders()
  {
    $readers = User::with('roles')->whereHas('roles', function($q) {
      $q->whereIn('name', [RoleType::READER]);
    })->get();
    return view('admin.user.indexReader', compact('readers'));
  }

  public function indexBanned()
  {
    $readers = User::doesntHave('roles')->get();
    return view('admin.user.indexBanned', compact('readers'));
  }
 
  public function show(User $user)
  {
    $comments = Comment::latest()->where('user_id', $user->id)->paginate(5);
    return view('admin.user.show', compact('user', 'comments'));
  }

  public function showAsWriter(User $user)
  {
    $posts = Post::where('user_id', $user->id)->paginate(15);
    return view('admin.user.showAsWriter', compact('user', 'posts'));
  }
  
  public function edit(User $user)
  {
    $roles = Role::all();
    return view('admin.user.edit', compact('user', 'roles'));
  }

  public function editReader(User $user)
  {
    if ($user->hasAnyRole([RoleType::ADMIN, RoleType::EDITOR, RoleType::WRITER, RoleType::MODERATOR])) {
      throw new Exception("THIS ACTION IS UNAUTHORIZED", 403);
    } else {
      $roles = Role::where('name', RoleType::READER)->get();      
      return view('admin.user.edit', compact('user', 'roles'));
    }
  }
    
  public function update(Request $request, User $user)
  {
    $data = $request->validate([
      'roles' =>'nullable'
    ]);    
    $user->syncRoles($data);

    Cache::forget('permissions');

    return redirect()->back();
  }

  public function delete(User $user)
  {
    $user->delete();
    return redirect()->route('admin.user.index');    
  }     
  
}
