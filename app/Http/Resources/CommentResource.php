<?php

namespace App\Http\Resources;

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
        return [
          'id' => $this->id,
          'message' => $this->message,
          'user_name' => $this->user->name,
          'responsive' => $this->responsive,
          'parent_id' => $this->parent_id,
          'created_at' => $this->created_at,
          'time_for_human' => Carbon::parse($this->created_at)->diffForHumans(),
        ];
    }
}
