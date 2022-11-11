<?php

namespace App\Listeners;

use App\Events\CommentReceivedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\ArrivedNewCommentNotification;

class SendCommentReceivedNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\CommentReceivedEvent  $event
     * @return void
     */
    public function handle(CommentReceivedEvent $event)
    {
      $event->recipient->notify(new ArrivedNewCommentNotification($event->comment));      
    }
}
