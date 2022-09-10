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

  public function update($data, Article $article)
  {   
    try {
      DB::beginTransaction(); 

      if (isset($data['preview'])) {
        $newPreview = $data['preview'];    
        $pathNewPreview = Storage::disk('public')->put('previews', $newPreview);   

        $oldPreview = substr($article->preview, strlen(url('/storage/')) + 1);

        $article->update([
          'preview' => url('/storage/' . $pathNewPreview),
          'title' => $data['title'],
          'description' => $data['description'],
          'content' => $data['content'],
        ]);

        Storage::disk('public')->delete($oldPreview);
      } else {
        $article->update([
          'title' => $data['title'],
          'description' => $data['description'],
          'content' => $data['content'],
        ]);
      }     
      
      DB::commit();

      return $article;

    } catch (Exception $exception) {
      DB::rollBack();
      abort(500, $exception);
    }
  }

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