<?php

// namespace App\Http\Controllers;

// use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
// use Illuminate\Http\Request;
// use Illuminate\Foundation\Bus\DispatchesJobs;
// use Illuminate\Foundation\Validation\ValidatesRequests;
// use Illuminate\Routing\Controller as BaseController;
// use App\Models\Place_type;
// use App\Models\Place;
// use App\Models\Town;


// class PlaceController extends Controller
// {
//    public function list()
//    {

//    $placelist = Place::where('id', '>', 0)->orderby('id', 'DESC')->get();

//    return response()->json([
//         '_result' => '1',
//        'placelist' => $placelist
//    ]);
//    } 
//      public function add()
//         {

//        $placeType_list = Place_type::where('parent','>',0)->orderby('parent','ASC')->get();
//             $town_list = Town::where('province_id',11)->orderby('title','ASC')->get();

//             return response()->json(['_result' => '1', 
//             'placeType_list' => $placeType_list,
//             'town_list' => $town_list
//              ]);


//         }   
//      public function save(Request $request)
//         {

// $frmData = [
//    'place_type_id' => $request->ptype,
//    'title' => $request->fname,
//    'vila' => $request->bana,
//    'arse' => $request->arse,
//    'ayan' => $request->ayan,
//    'town' => $request->town,
//    'address' => $request->address,
//    'postalcode' => $request->postalcode,
//    'town' => $request->townid,
//    'tel' => $request->tel,
//    'Water_id' => $request->waterID,
//    'power_id' => $request->electricityID,
//    'gas_id' => $request->gasID,

// ];

// Place::create($frmData);

// return response()->json(['_result' => '1','_message' => 'ملک جدید با نام ' . $request->fname  . ' با موفقیت اضافه شد']);


//         }
//         public function management()
//         {

//              return $this->handle_view('place.management'); 
//         }   

//      public function edit(Request $request)
//         {

// $placeinfo = place::where('id', $request->id)->first();

//  return response()->json([
//      'placeinfo' => $placeinfo
//  ]);
//         }
//      public function change(Request $request)
//   {



//    $placeid = $request->id;
//    $frmData = [
//         'arse' => $request->arse,

//    ];
//    $crnplace = place::where('id', $placeid)->first();

//    if (!is_null($request->pass))
//         $crnplace->setPasswordAttribute($request->pass);


//    $crnplace->update($frmData);

//    return response()->json([
//         '_result' => '1'
//    ]);

//   }
//         public function delete(Request $request)
//         {
//          $pid = $request->pid; 

//          $crnplace = place::where('id',$pid)->first();
//        if($crnplace)
//             {
//                $crnplace->delete();
//                return response()->json(['_result' => '1','_message' => 'کاربر  با نام ' . $crnplace->fname . ' ' . $crnplace->lname . ' با موفقیت حذف شد']);


//             } 

//             return response()->json(['_result' => '0',
//             '_message' => 'ملک مورد نظر یافت نشد']);

//      }      
//         public function rent()
//         {
//           dd('rent');
//              return $this->handle_view('rentplace'); 
//         }
//      public function sell()
//         {
//           dd('sell');
//              return $this->handle_view('sellplace'); 
//         }
//         public function rebuild()
//         {
//           dd('rebuild');
//              return $this->handle_view('rebuildplace'); 
//         }   


// }



namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Place_type;
use App\Models\Place;
use App\Models\Town;
use App\Models\Place_Rent;
use Illuminate\Support\Facades\Auth;

class PlaceController extends Controller
{
   public function list()
   {
      //  $placelist = place::where('id','>',0)->orderby('id','DESC')->get();
      // // dd($userlist);
      //      return $this->handle_view('place.list',compact('placelist')); 
      $placelist = Place::where('id', '>', 0)->orderby('id', 'DESC')->get();

      return response()->json([
         '_result' => '1',
         'placelist' => $placelist
      ]);
   }
   //========================================
//========================================
public function rent_add(Request $request)
{
  //------------------------------------------
  $place_id       = $request->id;
  $place_info     = Place::where('id', $place_id)->first();
  if(!$place_info)
     return response()->json([
        '_result' => '0',
        '_msg' =>'ملک یافت نشد'
     ]);
   //   if(Auth::user()->town_id !=0)
   //      if(Auth::user()->town_id != $place_info->town_id )
   //            return response()->json([
   //               '_result' => '0',
   //               '_msg' =>'مجوز تغییرات صادر نشده است'
   //            ]);
   //------------------------------------------

  // $placeType_list = Place_type::where('parent', '>', 0)->orderby('parent', 'ASC')->get();
  // $town_list = Town::where('province_id', 11)->orderby('title', 'ASC')->get();

   return response()->json([
      'place_id' => $place_id
   ]);

   // dd($town_list);
   //  return $this->handle_view('place.add',compact('placeType_list','town_list')); 
}

//========================================
//========================================
public function rent_save(Request $request)
{
  //------------------------------------------
  $place_id       = $request->place_id;

  $place_info     = Place::where('id', $place_id)->first();
//   if(!$place_info)
//      return response()->json([
//         '_result' => '0',
//         '_msg' =>'ملک یافت نشد'
//      ]);
//      if(Auth::user()->town_id !=0)
//         if(Auth::user()->town_id != $place_info->town_id )
//               return response()->json([
//                  '_result' => '0',
//                  '_msg' =>'مجوز تغییرات صادر نشده است'
//               ]);
   //------------------------------------------
   $frmData = [
      'place_id' => $place_id,
      'owner_fname' => $request->owner_fname,
      'owner_lname'=> $request->owner_lname,
      'owner_nat_code'=> $request->owner_nat_code,
      'owner_mobile'=> $request->owner_mobile,
      'tenant_fname'=> $request->tenant_fname, 
      'tenant_lname'=> $request->tenant_lname ,
      'tenant_nat_code'=> $request->tenant_nat_code ,
      'tenant_mobile'=> $request->tenant_mobile,
      'tenant_personal_code'=> $request->tenant_personal_code,
      'tenant_orglevel'=> $request->tenant_orglevel,
      'tenant_local_work'=> $request->tenant_local_work ,
      'tenant_worktel'=> $request->tenant_worktel ,
      'starttime'=> $request->starttime ,
      'endtime' => $request->endtime,
      'deposit_amount'=> $request->deposit_amount,
      'rent_amount' => $request->rent_amount,
       
      
   ];
   Place_Rent::create($frmData);
   return response()->json([
      '_result' => '1','_message' => 'واگذاری جدید با نام ' . $request->owner_fname  . ' با موفقیت ثبت شد'
   ]);

   // dd($town_list);
   //  return $this->handle_view('place.add',compact('placeType_list','town_list')); 
}

//========================================
//========================================

public function rent_list()
{
   
   $placelistrent = Place_Rent::where('place_id', '>', 0)->orderby('id', 'DESC')->get();


   return response()->json([
      '_result' => '1',
      'placelistrent' => $placelistrent
   ]);
}

//========================================
//========================================

public function add()
{
   //
   $placeType_list = Place_type::where('parent', '>', 0)->orderby('parent', 'ASC')->get();
   $town_list = Town::where('province_id', 11)->orderby('title', 'ASC')->get();

   return response()->json([
      '_result' => '1',
      'placeType_list' => $placeType_list,
      'town_list' => $town_list
   ]);

   // dd($town_list);
   //  return $this->handle_view('place.add',compact('placeType_list','town_list')); 
}
//========================================
//========================================
public function save(Request $request)
{
   
   $frmData = [
    
      'place_type_id' => $request->ptype,
      'title' => $request->title,
      'vila' => $request->bana,
      'arse' => $request->arse,
      'ayan' => $request->ayan,
       'address' => $request->address,
      'postalcode' => $request->postalcode,
      'town_id' => $request->townid,
      'tel' => $request->tel,
      'area_land'  => $request->area_land,
      'num_room' => $request->num_room,
      'org_num' => $request->org_num,
      'sub_num' => $request->sub_num,
      'uniq_id' => $request->uniq_id,
      'nation_geo' => $request->nation_geo,
      // 'gps_address'  => $request->gps_address,
      // 'reg_no' => $request->reg_no,
      'Water_id' => $request->waterID,
      'power_id' => $request->power_id,
      'gas_id' => $request->gas_id,
      // 'Water_id' => $request->waterID,
      // 'power_id' => $request->electricityID,
      // 'gas_id' => $request->gasID,       
      
   ];
  
   Place::create($frmData);
 
   return response()->json(['_result' => '1', '_message' => 'ملک جدید با نام ' . $request->title  . ' با موفقیت اضافه شد']);
   

}
//========================================
//========================================
   public function management()
   {
      //dd('management');
      return $this->handle_view('place.management');
   }
//========================================
//========================================
   public function edit(Request $request)
   {
      // $placeinfo = place::where('id', $request->id)->first();
      // $town_list = Town::where('province_id', 11)->orderby('title', 'ASC')->get();
      // return $this->handle_view('place.edit', compact('placeinfo', 'town_list'));
      $placeinfo = place::where('id', $request->id)->first();

      return response()->json([
         'placeinfo' => $placeinfo
      ]);
   }
//========================================
//========================================
public function update(Request $request)
   {
    
     
      $placeid = $request->id;
      $crnplace = place::where('id', $placeid)->first();
      $frmData = [
         // 'arse' => $request->arse,
         // 'place_type_id' => $request->place_type_id,
         // 'title' => $request->title,
         // 'vila' => $request->vila,
         // 'arse' => $request->arse,
         // 'ayan' => $request->ayan,
         // 'town' => $request->town,
         // 'address' => $request->address,
         // 'postalcode' => $request->postalcode,
         // 'town' => $request->townid,
         // 'tel' => $request->tel,
         // 'Water_id' => $request->Water_id,
         // 'power_id' => $request->power_id,
         // 'gas_id' => $request->gas_id,


         'place_type_id' => $request->place_type_id,
         'title' => $request->title,
         'vila' => $request->vila,
         'arse' => $request->arse,
         'ayan' => $request->ayan,
         'town_id' => $request->town_id,
         'address' => $request->address,
         'tel' => $request->tel,
         'postalcode' => $request->postalcode,
         // 'town' => $request->town,
         
         'area_land'  => $request->area_land,
         // 'gps_address'  => $request->gps_address,
         // 'reg_no' => $request->reg_no,
         'num_room' => $request->num_room,
         'org_num' => $request->org_num,
         'sub_num' => $request->sub_num,
         'uniq_id' => $request->uniq_id,
         'nation_geo' => $request->nation_geo,
         'Water_id' => $request->Water_id,
         'power_id' => $request->power_id,
         'gas_id' => $request->gas_id,

      ];
     

      // if (!is_null($request->pass))
      //    $crnplace->setPasswordAttribute($request->pass);


      $crnplace->update($frmData);
   
      return response()->json([
         '_result' => '1','_message' => 'ملک جدید با نام ' . $request->title  . ' با موفقیت ویرایش شد'
      ]);
   }
//========================================
//========================================
   public function delete(Request $request)
   {
     
      $pid = $request->pid;

      $crnplace = place::where('id', $pid)->first();
      if ($crnplace) {
         $crnplace->delete();
         return response()->json(['_result' => '1', '_message' => ' ملک مورد نظر با موفقیت حذف شد']);
      }

      return response()->json([
         '_result' => '0',
         '_message' => 'ملک مورد نظر یافت نشد'
      ]);
   }
//========================================
//========================================
   public function rent()
   {
      dd('rent');
      return $this->handle_view('rentplace');
   }
//========================================
//========================================
   public function sell()
   {
      dd('sell');
      return $this->handle_view('sellplace');
   }
//========================================
//========================================
   public function rebuild()
   {
      dd('rebuild');
      return $this->handle_view('rebuildplace');
   }

}
