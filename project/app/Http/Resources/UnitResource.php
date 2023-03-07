<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'title' => Helper::localeNumbers($this->title) ?? '',
            'departmentId' => intval($this->department_id),
        ];
    }
}
