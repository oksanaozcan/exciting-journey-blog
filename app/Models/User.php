<?php

namespace App\Models;

use App\Notifications\SendVerifyWithQueueNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];   

    public function sendEmailVerificationNotification()
    {
      $this->notify(new SendVerifyWithQueueNotification());
    }

    public function posts()
    {
      return $this->hasMany(Post::class, 'user_id', 'id');
    }

    public function commentsWriter()
    {
      return $this->hasManyThrough(
        Comment::class, 
        Post::class, 
        'user_id', 
        'commentable_id', 
        'id'
      );
    }

    public function latestPublishedPost ()
    {
      return $this->hasMany(Post::class, 'user_id', 'id')->latest();
    }

    public function comments()
    {
      return $this->hasMany(Comment::class, 'user_id', 'id');
    }

    public function publicInfo()
    {
      return $this->belongsTo(PublicUserInfo::class, 'id', 'user_id');
    }

    public function likedPosts ()
    {
      return $this->belongsToMany(Post::class, 'post_user_likes', 'user_id', 'post_id');
    }   

    public function articles()
    {
      return $this->hasMany(Article::class, 'user_id', 'id');
    }

    public function followers()
    {
      return $this->belongsToMany(User::class, 'followers', 'leader_id', 'follower_id');
    }

    public function followings()
    {
      return $this->belongsToMany(User::class, 'followers', 'follower_id', 'leader_id');
    }   

    public function likesFromFollowers()
    {
      return $this->hasManyThrough(
        PostUserLike::class,
        Article::class,
        'user_id',
        'likeable_id',
        'id'
      )->where('likeable_type', 'App\Models\Article');
    }

    public function commentsFromMyArticles()
    {
      return $this->hasManyThrough(
        Comment::class,
        Article::class,
        'user_id',
        'commentable_id',
        'id'
      )->where('commentable_type', 'App\Models\Article');
    }  
    
}
