<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
          'preview' => $this->preview,
          'title' => $this->title,
          'category' => $this->category->title,
          'tags' => $this->tags->pluck(['title']),
          'description' => substr($this->description, 0, 50) . '...',
          'content' => $this->content,
          // 'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
          'created_at' => $this->created_at,
        ];
    }
}
