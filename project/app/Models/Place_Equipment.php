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
                            'eqm_parent',
                            'serial',
                            'asign_date',
                            'unasign_date',
                            'description',
                          
                          ];
                          

    public function Title()
    {
        return DB::table('equipment_type')->where('id', $this->eqm_id)->first();
      //  return $this->belongsTo(equipment_type::class, 'eqm_id');
    }
 
    public static function List($place_id)
    {
      return DB::select(
        "
        select place_equipment.id,place_equipment.place_id,place_equipment.eqm_id,place_equipment.serial,asign_date,unasign_date,
        equipment_type.title
        From
        place_equipment
        inner join equipment_type ON equipment_type.id = place_equipment.eqm_id
        where place_equipment.place_id = $place_id

        "
       );
    }
    
   

}