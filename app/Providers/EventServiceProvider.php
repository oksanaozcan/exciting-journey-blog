<?php

namespace App\Providers;

use App\Events\CommentReceivedEvent;
use App\Listeners\BroadcastUserLoginNotification;
use App\Listeners\BroadcastUserLogoutNotification;
use App\Listeners\SendCommentReceivedNotification;
use App\Models\Article;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use App\Observers\ArticleObserver;
use App\Observers\CategoryObserver;
use App\Observers\PostObserver;
use App\Observers\TagObserver;
use App\Observers\UserObserver;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        Login::class => [
          BroadcastUserLoginNotification::class,
        ],
        Logout::class => [
          BroadcastUserLogoutNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
      parent::boot();
      User::observe(UserObserver::class);
      Category::observe(CategoryObserver::class);
      Article::observe(ArticleObserver::class);
      Post::observe(PostObserver::class);
      Tag::observe(TagObserver::class);

      Event::listen(
        CommentReceivedEvent::class,
        [SendCommentReceivedNotification::class, 'handle']
      );
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
