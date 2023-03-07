<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;
    protected $table = 'place';
    protected $fillable = [
        'place_type_id' ,
            'title' ,
            'vila',
            'arse',
            'ayan', 
            'town' ,
            'address' ,
            'postalcode' ,
            'town' ,
            'tel',
            'Water_id',
            'power_id',
            'gas_id',



            
      
       
    ];
}