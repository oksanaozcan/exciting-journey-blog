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
          'category_preview' => $this->category->preview,
          'category_id' => $this->category->id,
          'tags' => $this->tags->pluck(['title']),
          'description' => substr($this->description, 0, 300) . '...',          
          'for_human_date' => Carbon::parse($this->created_at)->diffForHumans(),
          'created_at' => $this->created_at,
          'author' => $this->user->name,
        ];
    }
}
