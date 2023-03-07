<?php



namespace App\Models;



use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;



class Place_Rent extends Model

{

    use HasFactory;

    protected $table = 'place_rent';

    protected $fillable = [

        'place_id',

        'owner_fname' ,

            'owner_lname' ,

            'owner_nat_code',

            'owner_mobile',

            'tenant_fname', 

            'tenant_lname' ,

            'tenant_nat_code' ,

            'tenant_local_work' ,

            'tenant_worktel' ,

            'tenant_mobile',

            'tenant_personal_code',

            'tenant_orglevel',

            'deposit_amount',

            'rent_amount' ,
            'docfile' ,

            'starttime' ,

            'sendtime' ,



      

       

    ];

}