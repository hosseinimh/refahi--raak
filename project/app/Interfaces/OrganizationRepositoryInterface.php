<?php

namespace App\Interfaces;

use App\Models\Organization as Model;

interface OrganizationRepositoryInterface
{
    public function get(int $organizationId): mixed;
    public function paginate(int $page, int $pageItems): mixed;
    public function store(string $title): mixed;
    public function update(Model $model, string $title): bool;
}
