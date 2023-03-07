<?php

namespace App\Interfaces;

use App\Models\Unit as Model;
use App\Models\Department;

interface UnitRepositoryInterface
{
    public function get(int $unitId): mixed;
    public function paginate(Department $department, int $page, int $pageItems): mixed;
    public function store(Department $department, string $title): mixed;
    public function update(Model $model, string $title): bool;
}
