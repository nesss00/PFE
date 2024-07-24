<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
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
            'prompt' => $this->prompt,
            'datetime' => $this->datetime,
            'result' => $this->result,
            'technical_result' => $this->technical_result,
            'status' => $this->status,
            'times_prompted' => $this->times_prompted,
        ];
    }
}
