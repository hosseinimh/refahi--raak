<?php

// namespace App\Http\Controllers;

// use App\Models\Equipment_type;
// use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
// use Illuminate\Foundation\Bus\DispatchesJobs;
// use Illuminate\Foundation\Validation\ValidatesRequests;
// use Illuminate\Routing\Controller as BaseController;

// class EquipmentController extends Controller
// {
//      public function list()
//         {
//           //dd('list');
//             //  return $this->handle_view('equipment.equipmentlist'); 
//             $catlist = Equipment_type::where('id', '>', 0)->orderby('id', 'DESC')->get();
//             // dd($userlist);
//             //    return $this->handle_view('user.list',compact('userlist')); 
//             return response()->json([
//                  '_result' => '1',
//                 'catlist' => $catlist
//             ]);
//         }
//      public function add()
//         {
//             dd('add');
//              return $this->handle_view('addequp'); 
//         }   
//      public function edit()
//         {
//             dd('edit');
//              return $this->handle_view('editequp'); 
//         }
//      public function change()
//         {
//             dd('change');
//              return $this->handle_view('changeequp'); 
//         }
//         public function delete()
//         {
//             dd('delete');
//              return $this->handle_view('deleteequp'); 
//         }        
      
     

// }

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class EquipmentController extends Controller
{
     public function list()
        {
          //dd('list');
             return $this->handle_view('equipment.equipmentlist'); 
        }
     public function add()
        {
            dd('add');
             return $this->handle_view('addequp'); 
        }   
     public function edit()
        {
            dd('edit');
             return $this->handle_view('editequp'); 
        }
     public function change()
        {
            dd('change');
             return $this->handle_view('changeequp'); 
        }
        public function delete()
        {
            dd('delete');
             return $this->handle_view('deleteequp'); 
        }        
      
     

}

