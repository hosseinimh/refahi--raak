<?php

namespace App\Repositories;

use App\Interfaces\UnitRepositoryInterface;
use App\Models\Department;
use App\Models\Unit as Model;

class UnitRepository extends Repository implements UnitRepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(Department $department, int $page, int $pageItems): mixed
    {
        return Model::select('tbl_units.*')->join('tbl_departments', 'tbl_units.department_id', '=', 'tbl_departments.id')->where('department_id', $department->id)->orderBy('tbl_units.created_at', 'DESC')->orderBy('tbl_units.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(Department $department, string $title): mixed
    {
        $data = [
            'department_id' => $department->id,
            'title' => $title,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $title): bool
    {
        $data = [
            'title' => $title,
        ];

        return $model->update($data);
    }
}
