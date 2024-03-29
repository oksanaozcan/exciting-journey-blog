<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Picture extends Model
{
  use HasFactory, SoftDeletes;
  
  protected $guarded = [];

  public function post() 
  {              
    return $this->belongsTo(Post::class, 'post_id', 'id');
  }
}
