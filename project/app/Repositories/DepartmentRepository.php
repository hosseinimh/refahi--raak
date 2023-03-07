<?php

namespace App\Repositories;

use App\Interfaces\DepartmentRepositoryInterface;
use App\Models\Organization;
use App\Models\Department as Model;

class DepartmentRepository extends Repository implements DepartmentRepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(Organization $organization, int $page, int $pageItems): mixed
    {
        return Model::select('tbl_departments.*')->join('tbl_organizations', 'tbl_departments.organization_id', '=', 'tbl_organizations.id')->where('organization_id', $organization->id)->orderBy('tbl_departments.created_at', 'DESC')->orderBy('tbl_departments.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(Organization $organization, string $title): mixed
    {
        $data = [
            'organization_id' => $organization->id,
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
