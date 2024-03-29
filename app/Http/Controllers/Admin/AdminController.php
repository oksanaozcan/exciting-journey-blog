<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use App\Types\RoleType;
use Illuminate\Support\Facades\Cache;

class AdminController extends Controller
{
  public function index()
  {
    $usersCount = User::all()->count();
    $categoriesCount = Cache::get('categories', Category::all())->count();
    $postsCount = Post::all()->count();
    $tagsCount = Tag::all()->count();
    $commentsCount = Comment::all()->count();

  $writers = User::with("roles")->whereHas("roles", function($q) {
      $q->whereIn("name", [RoleType::WRITER]);
    })->get();

    $mostPopularPostsAllTime = Post::popularAllTime()->take(3)->get();
    $mostPopularPostsToday = Post::popularToday()->take(3)->get();
    $mostPopularPostsLastWeek = Post::popularLastWeek()->take(3)->get();  
    
    return view('admin.index', compact(
      'usersCount', 
      'categoriesCount', 
      'postsCount', 
      'tagsCount', 
      'commentsCount', 
      'writers',
      'mostPopularPostsAllTime',
      'mostPopularPostsToday',
      'mostPopularPostsLastWeek'
    ));
  }
}
