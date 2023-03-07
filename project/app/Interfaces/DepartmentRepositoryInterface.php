<?php

namespace App\Interfaces;

use App\Models\Department as Model;
use App\Models\Organization;

interface DepartmentRepositoryInterface
{
    public function get(int $departmentId): mixed;
    public function paginate(Organization $organization, int $page, int $pageItems): mixed;
    public function store(Organization $organization, string $title): mixed;
    public function update(Model $model, string $title): bool;
}
