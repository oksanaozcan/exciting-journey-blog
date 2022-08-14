<?php

namespace App\Http\Requests\Admin\Post;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
          'preview' => 'nullable',
          'title' => 'required|string',    
          // 'description' => 'required|string',
          // 'content' => 'required',
          // 'category_id' => 'required',
          // 'pictures' => 'nullable',
          // 'tags' => 'nullable|array'
        ];
    }
}
