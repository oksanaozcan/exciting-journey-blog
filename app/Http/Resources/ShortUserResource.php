<?php

namespace App\Http\Resources;

use App\Models\PublicUserInfo;
use Illuminate\Http\Resources\Json\JsonResource;

class ShortUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
      $public = $this->publicInfo;
        return [
          'id' => $this->id,
          'name' => $this->name,          
        ];
    }
}
