<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mcicenter extends Model
{
    use HasFactory;
    protected $table = 'mcicenter';
    protected $fillable = [
        'title',
        'town_id',
        'gps_address',
       
    ];
}