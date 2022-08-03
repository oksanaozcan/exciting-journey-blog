<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class SinglePostResource extends JsonResource
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
          'category' => Category::find($this->category_id),
          'tags' => TagResource::collection($this->tags),
          'description' => $this->description,          
          'content' => $this->content,          
          'pictures' => PictureResource::collection($this->pictures),          
          'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
          'author' => $this->user->name,
        ];
    }
}
