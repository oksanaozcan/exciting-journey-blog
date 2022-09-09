<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ArticleResource extends JsonResource
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
        'description' => mb_convert_encoding(substr($this->description, 0, 200) . '...', 'UTF-8', 'UTF-8'),              
        'content' => mb_convert_encoding(substr($this->content, 0, 700) . '...', 'UTF-8', 'UTF-8'),          
        'for_human_date' => Carbon::parse($this->created_at)->diffForHumans(),
        'created_at' => $this->created_at,
        'deleted_at' => $this->deleted_at,
        'author' => $this->user->name,
        'comments_count' => $this->comments_count,
        'likes_count' => $this->likes_count,
        'visits_count' => count($this->visits),
      ];
    }
}
