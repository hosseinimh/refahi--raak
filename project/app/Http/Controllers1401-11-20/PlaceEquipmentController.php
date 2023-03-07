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
use Illuminate\Support\Facades\Auth;

class PlaceEquipmentController extends Controller

{
   public function add(Request $request)
   {
      //------------------------------------------
      $place_id       = $request->place_id;
      $place_info     = Place::where('id', $place_id)->first();
      if(!$place_info)
         return response()->json([
            '_result' => '0',
            '_msg' =>'ملک یافت نشد'
         ]);
         if(Auth::user()->town_id !=0)
            if(Auth::user()->town_id != $place_info->town_id )
                  return response()->json([
                     '_result' => '0',
                     '_msg' =>'مجوز تغییرات صادر نشده است'
                  ]);
       //------------------------------------------
 
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
    //------------------------------------------
    $place_id       = $request->place_id;
    // $place_info     = Place::where('id', $place_id)->first();
    // if(!$place_info)
    //    return response()->json([
    //       '_result' => '0',
    //       '_msg' =>'ملک یافت نشد'
    //    ]);
    //    if(Auth::user()->town_id !=0)
    //       if(Auth::user()->town_id != $place_info->town_id )
    //             return response()->json([
    //                '_result' => '0',
    //                '_msg' =>'مجوز تغییرات صادر نشده است'
    //             ]);
     //------------------------------------------

      $frmData['place_id'] = $place_id;

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
   public function add_serial(Request $request)
   {
      //------------------------------------------
          
      $place_id  = $request->id;
      $place_info = Place::where('id', $place_id)->first();
      // dd($place_info);
            if(!$place_info)
               return response()->json([
                  '_result' => '0',
                  '_msg' =>'ملک یافت نشد'
               ]);
              //  dd(Auth::user());
              //  if(Auth::user()->town_id !=0)
              //     if(Auth::user()->town_id != $place_info->town_id )
              //           return response()->json([
              //              '_result' => '0',
              //              '_msg' =>'مجوز تغییرات صادر نشده است'
              //           ]);
      // ------------------------------------------
      $place_equip_list = Place_Equipment::where('place_id',$place_id)->get();
      return response()->json([
         '_result' => '1',
         '_msplace_equip_list' =>$place_equip_list
      ]);

   }
   //========================================
   //========================================
   public function save_serail(Request $request)
   {

     //------------------------------------------
     $place_id       = $request->place_id;
     $place_info     = Place::where('id', $place_id)->first();
     if(!$place_info)
        return response()->json([
           '_result' => '0',
           '_msg' =>'ملک یافت نشد'
        ]);
        if(Auth::user()->town_id !=0)
           if(Auth::user()->town_id != $place_info->town_id )
                 return response()->json([
                    '_result' => '0',
                    '_msg' =>'مجوز تغییرات صادر نشده است'
                 ]);
    //------------------------------------------
      

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
   public function save1(Request $request)
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

