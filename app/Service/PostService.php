<?php

namespace App\Service;

use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\Picture;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class PostService
{
  public function store($data)
  {
    try {
      DB::beginTransaction();

      $preview = $data['preview'];    
      $pathPreview = Storage::disk('public')->put('previews', $preview);   

      $post = Post::create([
        'preview' => url('/storage/' . $pathPreview),
        'title' => $data['title'],
        'description' => $data['description'],
        'content' => $data['content'],     
        'category_id' => $data['category_id']['id'],
      ]);

      $pictures = $data['pictures'];
      foreach ($pictures as $picture) {
        $filePath = Storage::disk('public')->put('images', $picture);      
        
        Picture::create([
          'path' => url('/storage/' . $filePath),            
          'post_id' => $post->id,
        ]);
      }
      
      DB::commit();

      return $post;

    } catch (Exception $exception) {
      DB::rollBack();
      abort(500, $exception);
    }
  }

}