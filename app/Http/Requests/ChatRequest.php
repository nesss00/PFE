<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChatRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'prompt' => ['required', 'string', 'max:512'],
            'status' => ['nullable', 'string', 'max:100'],
            'times_prompted' => ['nullable', 'integer'],
            'technical_result' => ['nullable', 'array'],
            'result' => ['nullable', 'string'],
        ];
    }
}
