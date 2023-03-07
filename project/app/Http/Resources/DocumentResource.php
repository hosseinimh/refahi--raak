<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'title' => Helper::localeNumbers($this->title) ?? '',
            'description' => Helper::localeNumbers($this->description) ?? '',
            'file' => $this->file ?? '',
            'unitId' => intval($this->unit_id),
        ];
    }
}
