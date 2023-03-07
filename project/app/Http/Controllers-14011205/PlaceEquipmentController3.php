<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

use App\Models\Equipment;
use App\Models\Place;
use App\Models\Place_Equipment;
use App\Models\Place_type;

class PlaceEquipmentController extends Controller
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
   public function add(Request $request)
   {
      $place_id       = $request->place_id;
      $place_info     = Place::where('id', $place_id)->first();
      // $equipment_list = Equipment::where('id', '>', 0)->get();
      $kitchenFacilities = Equipment::where('parent', '=', 1)->orderby('parent', 'ASC')->get();
      $cateringFacilities = Equipment::where('parent', '=', 2)->orderby('parent', 'ASC')->get();
      $bedroomsFacilities = Equipment::where('parent', '=', 3)->orderby('parent', 'ASC')->get();
      $services = Equipment::where('parent', '=', 4)->orderby('parent', 'ASC')->get();
      $officeEquipment = Equipment::where('parent', '=', 5)->orderby('parent', 'ASC')->get();
      $yardEquipment = Equipment::where('parent', '=', 6)->orderby('parent', 'ASC')->get();
      $heatingSystem = Equipment::where('parent', '=', 7)->orderby('parent', 'ASC')->get();
      $coolingSystem = Equipment::where('parent', '=', 8)->orderby('parent', 'ASC')->get();

      return response()->json([
         '_result' => '1',
         // 'equipment_list' => $equipment_list,   
         'kitchenFacilities' => $kitchenFacilities,
         'cateringFacilities' => $cateringFacilities,
         'heatingSystem' => $heatingSystem,
         'coolingSystem' => $coolingSystem,
         'bedroomsFacilities' => $bedroomsFacilities,
         'services' => $services,
         'officeEquipment' => $officeEquipment,
         'yardEquipment' => $yardEquipment,
         'place_info' => $place_info
      ]);
   }
   //========================================
   //========================================  
   public function save(Request $request)
   {
      //   $place_id = $request->place_id;
      $frmData['place_id'] = $request->place_id;

      $equipment_list = Equipment::where('id', '>', 0)->get();
      $equipments = $request->equipments;
      foreach ($equipment_list as $equip) {
         if (in_array($equip->id, $equipments)) {
            $frmData['eqm_id'] = $equip->id;
            $frmData['asign_date'] = date('Y-m-d H:i:s');
            Place_Equipment::create($frmData);
         }
      }


      return response()->json(['_result' => '1', '_message' => 'تجهیزات ملک با موفقیت اضافه شد']);
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
      $frmData = [
         'place_id' => $request->place_id,
         'eqm_id' => $request->eqm_id,

      ];

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
