<?php

namespace App\Models;

use Coderflex\Laravisit\Concerns\CanVisit;
use Coderflex\Laravisit\Concerns\HasVisits;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Post extends Model implements CanVisit
{
  use HasFactory, SoftDeletes, HasVisits;
  protected $guarded = [];

  protected $with = ['category', 'tags'];
  protected $withCount = ['comments', 'likes', 'visits'];

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
    return $this->morphMany('App\Models\Comment', 'commentable');
  }

  public function likes()
  {
    return $this->morphMany('App\Models\PostUserLike', 'likeable');
  }   

}
