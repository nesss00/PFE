<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SimulationResource extends JsonResource
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
            'date' => $this->date,
            'montant_emprunte' => $this->montant_emprunte,
            'duree' => $this->duree,
            'taux_interet' => $this->taux_interet,
            'user_id' => $this->user_id,
            'user' => new UserResource($this->user),
            'results' => ResultResource::collection($this->results),
        ];
    }
}
