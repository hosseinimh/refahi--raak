<?php
namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Models\Equipment;
use App\Models\Equipment_type;
use App\Models\Place;
use App\Models\Place_type;

class EquipmentController extends Controller
{
//========================================
//========================================
     public function list()
        {
          //dd('list');
             return $this->handle_view('catlist'); 
        }
//========================================
//========================================
     public function add()
        {
           // $placeType_list = Place_type::where('parent', '>', 0)->orderby('parent', 'ASC')->get();
           // $town_list      = Town::where('province_id', 11)->orderby('title', 'ASC')->get();

      // return response()->json([
      //    '_result' => '1'      
      // ]);


      

      $kitchenFacilities = Equipment_type::where('parent', '=', 1)->orderby('parent', 'ASC')->get();
      $cateringFacilities = Equipment_type::where('parent', '=', 2)->orderby('parent', 'ASC')->get();
      $bedroomsFacilities = Equipment_type::where('parent', '=', 3)->orderby('parent', 'ASC')->get();
      $services = Equipment_type::where('parent', '=', 4)->orderby('parent', 'ASC')->get();
      $officeEquipment = Equipment_type::where('parent', '=', 5)->orderby('parent', 'ASC')->get();
      $yardEquipment = Equipment_type::where('parent', '=', 6)->orderby('parent', 'ASC')->get();
      $heatingSystem = Equipment_type::where('parent', '=', 7)->orderby('parent', 'ASC')->get();
      $coolingSystem = Equipment_type::where('parent', '=', 8)->orderby('parent', 'ASC')->get();


      return response()->json([
         '_result' => '1',
         'kitchenFacilities' => $kitchenFacilities,
         'cateringFacilities' => $cateringFacilities,
         'heatingSystem' => $heatingSystem,
         'coolingSystem' => $coolingSystem,
         'bedroomsFacilities' => $bedroomsFacilities,
         'services' => $services,
         'officeEquipment' => $officeEquipment,
         'yardEquipment' => $yardEquipment,
      ]);
     

        }   
//========================================
//========================================  
     public function save(Request $request)
        {
            $frmData = [
                'title' => $request->title,
                'parent' => $request->parent,
                'active' => $request->active,
                'visible' => $request->visible,
                
             ];
       
             Equipment::create($frmData);
       
             return response()->json(['_result' => '1', '_message' => 'ملک جدید با نام ' . $request->fname  . ' با موفقیت اضافه شد']);
             
        }
//========================================
//========================================
        public function edit()
        {
            $placeType_list = Place_type::where('parent', '>', 0)->orderby('parent', 'ASC')->get();
            // $town_list      = Town::where('province_id', 11)->orderby('title', 'ASC')->get();
 
       return response()->json([
          '_result' => '1',
          'placeType_list' => $placeType_list        
       ]);
        }
//========================================
//========================================
        public function update(Request $request)
        {
         $equ_id    = $request->id;
         $crnequip  = Equipment::where('id', $equ_id)->first();
         $frmData = [
               'title'  => $request->title,
               'parent'  => $request->parent,
               'active'  => $request->active,
               'visible'  => $request->visible,
            ];
             $crnequip->update($frmData);
             return response()->json(['_result' => '1', '_message' => 'ملک جدید با نام ' . $request->fname  . ' با موفقیت اضافه شد']);
        }
//========================================
//========================================
        public function delete()
        {
            dd('delete');
             return $this->handle_view('deleteplace'); 
        }
           
      
     

}
