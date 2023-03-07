<?php



namespace App\Models;



use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;



class Equ_serial extends Model

{

    use HasFactory;

    protected $table = 'equ_serial';

    protected $fillable = [

        'place_equipment_id',
        'equ_id',
        'count',
        'place_id',
        'serial',


     

    ];

}