<?php

namespace App\Http\Resources;

use App\Models\Comment;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ShortCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {      
      $parentComment = Comment::find($this->parent_id);
      if ($parentComment !== null) {
        $parentUser = $parentComment->user->name;
      } else {
        $parentUser = null;
      }

      return [
        'id' => $this->id,        
        'message' => mb_convert_encoding(substr($this->message, 0, 100) . '...', 'UTF-8', 'UTF-8'),
        'post_id' => $this->post_id,               
        'time_for_human' => Carbon::parse($this->created_at)->diffForHumans(),
      ];
    }
}
