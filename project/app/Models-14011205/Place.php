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
            'town_id' ,
            'address' ,
            'postalcode' ,
            'tel',
            'Water_id',
            'power_id',
            'gas_id',
            'area_land' ,
            'gps_address' ,
            'reg_no' ,
            'num_room'  ,
            'org_num' ,
            'sub_num' ,
            'nation_geo' ,
            'uniq_id' ,
      
       
    ];
}