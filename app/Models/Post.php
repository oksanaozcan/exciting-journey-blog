<?php

namespace App\Models;

use Coderflex\Laravisit\Concerns\CanVisit;
use Coderflex\Laravisit\Concerns\HasVisits;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model implements CanVisit
{
  use HasFactory, SoftDeletes, HasVisits;
  protected $guarded = [];

  protected $with = ['category'];
  protected $withCount = ['comments', 'likes'];

  public function category() {              
    return $this->belongsTo(Category::class, 'category_id', 'id');
  }

  public function tags()
  {
    return $this->belongsToMany(Tag::class, 'post_tags', 'post_id', 'tag_id');
  }    

  public function pictures()
  {
    return $this->hasMany(Picture::class, 'post_id', 'id');
  }

  public function user() {              
    return $this->belongsTo(User::class, 'user_id', 'id');
  }

  public function comments() 
  {
    return $this->hasMany(Comment::class, 'post_id', 'id');
  }

  public function likes()
  {
    return $this->hasMany(PostUserLike::class, 'post_id', 'id');
  } 

}
