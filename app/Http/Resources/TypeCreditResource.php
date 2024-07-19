<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TypeCreditResource extends JsonResource
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
            'name' => $this->name,
            'TypeCredit' => $this->TypeCredit, // Ensure this matches your model's attribute
            'TauxInteret' => $this->TauxInteret,
            'DuréeMax' => $this->DuréeMax,
            'institution_id' => $this->institution_id,
            'max_money_credited' => $this->max_money_credited,
            'institution' => new InstitutionResource($this->institution), // Use the relationship name here
        ];
    }
}
