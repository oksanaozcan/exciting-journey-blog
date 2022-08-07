<?php

namespace App\Http\Resources;

use App\Models\Comment;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CommentResource extends JsonResource
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
        'message' => $this->message,
        'user_name' => $this->user->name,
        'responsive' => $this->responsive,
        'parent_id' => $this->parent_id,
        'parent_user' => $parentUser,
        'created_at' => $this->created_at,
        'time_for_human' => Carbon::parse($this->created_at)->diffForHumans(),
      ];
    }
}
