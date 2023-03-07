<?php

namespace App\Repositories;

use App\Constants\Role;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User as Model;
use Illuminate\Support\Facades\DB;

class UserRepository extends Repository implements UserRepositoryInterface
{
    public function get(int $userId): mixed
    {
        return Model::where('id', $userId)->first();
    }

    public function paginate(string|null $username, string|null $name, string|null $family, int|null $unitId, int $page, int $pageItems): mixed
    {
        if (is_null($unitId)) {
            return Model::leftJoin('tbl_units', function ($join) {
                $join->on('tbl_users.unit_id', '=', 'tbl_units.id')
                    ->join('tbl_departments', 'tbl_units.department_id', '=', 'tbl_departments.id')->join('tbl_organizations', 'tbl_departments.organization_id', '=', 'tbl_organizations.id');
            })->where('username', 'LIKE', '%' . $username . '%')->where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->select('tbl_users.*', 'tbl_units.title AS unit_title', 'tbl_departments.title AS department_title', 'tbl_organizations.title AS organization_title')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('tbl_users.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
        }

        return Model::join('tbl_units', function ($join) {
            $join->on('tbl_users.unit_id', '=', 'tbl_units.id')
                ->join('tbl_departments', 'tbl_units.department_id', '=', 'tbl_departments.id')->join('tbl_organizations', 'tbl_departments.organization_id', '=', 'tbl_organizations.id');
        })->where('unit_id', '=', $unitId)->where('username', 'LIKE', '%' . $username . '%')->where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->select('tbl_users.*', 'tbl_units.title AS unit_title', 'tbl_departments.title AS department_title', 'tbl_organizations.title AS organization_title')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('tbl_users.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }

    public function store(string $username, string $password, string $name, string $family, int|null $unitId, int $role): mixed
    {
        $role = ($role >= Role::USER && $role <= Role::ADMINISTRATOR) ? $role : Role::USER;
        $data = [
            'username' => $username,
            'password' => $password,
            'name' => $name,
            'family' => $family,
            'unit_id' => $unitId ?? 0,
            'role' => $role,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $user, string $name, string $family): bool
    {
        $data = [
            'name' => $name,
            'family' => $family,
        ];

        return $user->update($data);
    }

    public function changePassword(Model $user, string $password): bool
    {
        return DB::statement("UPDATE `tbl_users` SET `password`='$password' WHERE `id`=$user->id");
    }
}
