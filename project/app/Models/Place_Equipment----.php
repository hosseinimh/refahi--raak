<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Equipment;
use DB;

class Place_equipment extends Model
{
    use HasFactory;
    protected $table = 'place_equipment';
    protected $fillable = [
                            'place_id',
                            'eqm_id',
                            'asign_date',
                            'unasign_date',
                            'unasign_date',
                          
                          ];
                          

    public function Title()
    {
        return DB::table('equipment_type')->where('id', $this->eqm_id)->first();
      //  return $this->belongsTo(equipment_type::class, 'eqm_id');
    }
 
   

}