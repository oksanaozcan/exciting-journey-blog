<?php 

namespace App\Repositories;
use Illuminate\Support\Facades\Cache;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Repositories\Interfaces\PostRepositoryInterface;

class PostRepository implements PostRepositoryInterface {
  //private functions for format data etc... format in the model like function

  public function all()
  {
    return Cache::rememberForever('posts', function () {
      return PostResource::collection(Post::orderByDesc('id')->paginate(5));
    });
  }
}