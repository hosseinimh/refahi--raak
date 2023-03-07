<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'title' => Helper::localeNumbers($this->title) ?? '',
            'organizationId' => intval($this->organization_id),
        ];
    }
}
