<?php

namespace App\Repositories;

use App\Interfaces\OrganizationRepositoryInterface;
use App\Models\Organization as Model;

class OrganizataionRepository extends Repository implements OrganizationRepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(int $page, int $pageItems): mixed
    {
        return Model::orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $title): mixed
    {
        $data = [
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
