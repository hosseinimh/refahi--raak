<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'username' => $this->username,
            'name' => Helper::localeNumbers($this->name) ?? '',
            'family' => Helper::localeNumbers($this->family) ?? '',
            'role' => intval($this->role),
            'unitId' => intval($this->unit_id),
            'unitTitle' => $this->unit_title ?? '',
            'departmentTitle' => $this->department_title ?? '',
            'organizationTitle' => $this->organization_title ?? '',
        ];
    }
}
