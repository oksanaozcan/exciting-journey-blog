<?php

namespace App\Http\Requests\Client\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePublicUserInfoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
      return [
        'name' => 'required|string|max:40',
        'headline' => 'nullable|string|max:60',
        'description' => 'nullable|string|max:500',
        'website' => 'nullable|string|max:1000',
        'twitter' => 'nullable|string|max:1000',
        'facebook' => 'nullable|string|max:1000',
        'instagram' => 'nullable|string|max:1000',
        'youtube' => 'nullable|string|max:1000' 
      ];
    }
}
