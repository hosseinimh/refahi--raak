<?php

// namespace App\Http\Controllers;

// use App\Models\Place;
// use App\Models\Place_equipment;
// use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
// use Illuminate\Foundation\Bus\DispatchesJobs;
// use Illuminate\Foundation\Validation\ValidatesRequests;
// use Illuminate\Routing\Controller as BaseController;

// class EquipmentCategoryController extends Controller
// {
//      public function list()
//         {
          
//             $catlist = Place_equipment::where('id', '>', 0)->orderby('id', 'DESC')->get();
          
//             return response()->json([
//                  '_result' => '1',
//                 'catlist' => $catlist
//             ]);
//         }
//      public function add()
//         {
//             dd('add');
//              return $this->handle_view('addplace'); 
//         }   
//      public function edit()
//         {
//             dd('edit');
//              return $this->handle_view('editplace'); 
//         }
//      public function change()
//         {
//             dd('change');
//              return $this->handle_view('changeplace'); 
//         }
//         public function delete()
//         {
//             dd('delete');
//              return $this->handle_view('deleteplace'); 
//         }
           
      
     

// }

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class EquipmentCategoryController extends Controller
{
     public function list()
        {
          //dd('list');
             return $this->handle_view('catlist'); 
        }
     public function add()
        {
            dd('add');
             return $this->handle_view('addplace'); 
        }   
     public function edit()
        {
            dd('edit');
             return $this->handle_view('editplace'); 
        }
     public function change()
        {
            dd('change');
             return $this->handle_view('changeplace'); 
        }
        public function delete()
        {
            dd('delete');
             return $this->handle_view('deleteplace'); 
        }
           
      
     

}
