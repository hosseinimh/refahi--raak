<?php

namespace Database\Factories;

use App\Constants\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'username' => '09155295009',
            'password' => '123456789a',
            'name' => 'محمود',
            'family' => 'حسینی',
            'remember_token' => Str::random(10),
            'role' => Role::ADMINISTRATOR
        ];
    }
}
