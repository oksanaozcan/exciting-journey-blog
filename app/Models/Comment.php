<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function commentable()
    {
      return $this->morphTo();
    }

    public function user()
    {
      return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getModel()
    {
      $modelType = $this->commentable_type;
      if ($modelType == 'App\Models\Post') {
        return Post::find($this->commentable_id);
      }
      if ($modelType == 'App\Models\Article') {
        return Article::find($this->commentable_id);
      }
    }
}
