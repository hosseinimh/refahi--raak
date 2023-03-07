<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Raaklog extends Model
{
    protected $table = 'raaklog';
    protected $fillable = [
        'user_id',
        'user_ip',
        'route_url',
        'des',
      
       
    ];
}