<?php

namespace App\Service;

use App\Models\Article;
use App\Models\Comment;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\Picture;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class ArticleService
{
  public function store($data)
  {
    try {
      DB::beginTransaction();            

      $preview = $data['preview'];    
      $pathPreview = Storage::disk('public')->put('previews', $preview);   

      $article = Article::create([
        'preview' => url('/storage/' . $pathPreview),
        'title' => $data['title'],
        'description' => $data['description'],
        'content' => $data['content'],            
        'user_id' => auth()->user()->id,
      ]);      
      
      DB::commit();

      return $article;

    } catch (Exception $exception) {
      DB::rollBack();
      abort(500, $exception);
    }
  }

  // public function update($data, Post $post)
  // {
  //   try {
  //     DB::beginTransaction(); 

  //     if (isset($data['preview'])) {
  //       $newPreview = $data['preview'];    
  //       $pathNewPreview = Storage::disk('public')->put('previews', $newPreview);   

  //       $oldPreview = substr($post->preview, strlen(url('/storage/')) + 1);

  //       $post->update([
  //         'preview' => url('/storage/' . $pathNewPreview),
  //         'title' => $data['title'],
  //         'description' => $data['description'],
  //         'content' => $data['content'],     
  //         'category_id' => $data['category_id']['id']
  //       ]);

  //       Storage::disk('public')->delete($oldPreview);
  //     } else {
  //       $post->update([
  //         'title' => $data['title'],
  //         'description' => $data['description'],
  //         'content' => $data['content'],     
  //         'category_id' => $data['category_id']['id']
  //       ]);
  //     }

  //     if (isset($data['removed_pictures'])) {
  //       $removedPictures = $data['removed_pictures'];
  //       foreach ($removedPictures as $rem) {          
  //         Picture::find($rem['id'])->delete();
  //       }
  //     }     

  //     if (isset($data['pictures'])) {
  //       $pictures = $data['pictures'];
  //       foreach ($pictures as $picture) {
  //         $filePath = Storage::disk('public')->put('images', $picture);      
          
  //         Picture::create([
  //           'path' => url('/storage/' . $filePath),            
  //           'post_id' => $post->id,
  //         ]);
  //       }
  //     }

  //     if (isset($data['tags']) && $post->tags->isEmpty()) {                
  //       $tagIds = $data['tags'];        
  //       $post->tags()->attach($tagIds);    

  //     } 
  //     if (isset($data['tags']) && $post->tags->isNotEmpty()) {
  //       $tagIds = $data['tags'];        
  //       $post->tags()->sync($tagIds);    
  //     }     
      
  //     DB::commit();

  //     return $post;

  //   } catch (Exception $exception) {
  //     DB::rollBack();
  //     abort(500, $exception);
  //   }
  // }

  // public function delete (Post $post)
  // {
  //   try {
  //     DB::beginTransaction(); 

  //     $comments = Comment::where('post_id', $post->id)->get();
  //     foreach ($comments as $comment) {
  //       $comment->delete();
  //     }  

  //     $post->delete();
            
  //     DB::commit();

  //     return true;

  //   } catch (Exception $exception) {
  //     DB::rollBack();
  //     abort(500, $exception);
  //   }
  // }
  
}