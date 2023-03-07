<?php

namespace App\Interfaces;

use App\Models\Document as Model;
use App\Models\Unit;

interface DocumentRepositoryInterface
{
    public function get(int $documentId): mixed;
    public function paginate(int $unitId, int $page, int $pageItems): mixed;
    public function store(Unit $unit, string $title, string|null $description): mixed;
    public function update(Model $model, string $title, string|null $description): bool;
}
