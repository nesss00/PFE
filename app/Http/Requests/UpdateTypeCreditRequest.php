<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTypeCreditRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'TypeCredit' => 'required|string|max:255',
            'TauxInteret' => 'required|numeric',
            'DuréeMax' => 'required|integer',
            'institution_id' => 'required|exists:institutions,id',
            'max_money_credited' => 'required|numeric',
        ];
    }
}
