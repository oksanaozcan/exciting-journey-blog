<?php

namespace App\Models;

use Coderflex\Laravisit\Concerns\HasVisits;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory, SoftDeletes, HasVisits;

    protected $guarded = [];

    public function comments()
    {
      return $this->morphMany('App\Models\Comment', 'commentable');
    }

    public function user() {              
      return $this->belongsTo(User::class, 'user_id', 'id');
    }

}