<?php

namespace App\Repositories;

use App\Interfaces\DocumentRepositoryInterface;
use App\Models\Document as Model;
use App\Models\Unit;

class DocumentRepository extends Repository implements DocumentRepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(int $unitId, int $page, int $pageItems): mixed
    {
        return Model::select('tbl_documents.*')->join('tbl_units', 'tbl_documents.unit_id', '=', 'tbl_units.id')->where('unit_id', $unitId)->orderBy('tbl_documents.created_at', 'DESC')->orderBy('tbl_documents.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(Unit $unit, string $title, string|null $description): mixed
    {
        $data = [
            'unit_id' => $unit->id,
            'title' => $title,
            'description' => $description,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $title, string|null $description): bool
    {
        $data = [
            'title' => $title,
            'description' => $description,
        ];

        return $model->update($data);
    }
}
