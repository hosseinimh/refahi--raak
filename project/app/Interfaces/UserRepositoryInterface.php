<?php

namespace App\Interfaces;

use App\Models\User as Model;

interface UserRepositoryInterface
{
    public function get(int $userId): mixed;
    public function paginate(string|null $username, string|null $name, string|null $family, int|null $unitId, int $page, int $pageItems): mixed;
    public function countAll(): int;
    public function store(string $username, string $password, string $name, string $family, int|null $unitId, int $role): mixed;
    public function update(Model $user, string $name, string $family): bool;
    public function changePassword(Model $user, string $password): bool;
}
