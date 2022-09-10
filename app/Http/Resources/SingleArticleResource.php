<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class SingleArticleResource extends JsonResource
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
          'description' => $this->description,          
          'content' => $this->content,      
          'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
          'author' => $this->user->name,
          'author_id' => $this->user->id,
          'likes_count' => $this->likes_count,
          'comments_count' => $this->comments_count,
          'visits_count' => count($this->visits),          
        ];
    }
}
