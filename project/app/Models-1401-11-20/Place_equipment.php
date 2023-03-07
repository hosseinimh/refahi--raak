<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place_equipment extends Model
{
    use HasFactory;
    protected $table = 'place_equipment';
    protected $fillable = [
        'place_id',
        'eqm_id',
        'eqm_title',
        'asign_date',
        'unasign_date',

    ];
}
