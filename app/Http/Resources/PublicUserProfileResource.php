<?php

namespace App\Http\Resources;

use App\Models\PublicUserInfo;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicUserProfileResource extends JsonResource
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
          'name' => $this->name,
          'headline' => $public->headline,
          'description' => $public->description,
          'website' => $public->website,
          'twitter' => $public->twitter,
          'facebook' => $public->facebook,
          'instagram' => $public->instagram,
          'youtube' => $public->youtube,
        ];
    }
}
