<?php

// namespace App\Http\Controllers;

// use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
// use Illuminate\Foundation\Bus\DispatchesJobs;
// use Illuminate\Foundation\Validation\ValidatesRequests;
// use Illuminate\Routing\Controller as BaseController;
// use App\Models\Place_type;
// use Illuminate\Http\Request;

// class PlaceTypeController extends Controller
// {
//      public function list()
        
//         {
//          $placetypeArr= Place_type:: where ('id','>' ,0)->get();
//                   // dd($placetypeArr);
//              return $this->handle_view('placetype.list',compact('placetypeArr')); 
//         }
//      public function add()
//         {
//             //dd('add');
//              return $this->handle_view('placetype.add'); 
//         }   
//      public function edit()
//         {
//           dd('edit');
//              return $this->handle_view('editplace'); 
//         }
//      public function change()
//         {
//           dd('change');
//              return $this->handle_view('changeplace'); 
//         }
//         public function delete()
//         { 
//           dd('delete');
//              return $this->handle_view('deleteplace'); 
//         }  
        
//         public function save(Request $request)
//              {
//                 //dd($request->active);
//               $frmData = [
//                  'title' => $request->title,
//                  'active' => $request->active,
//                  'visible' => $request->visible,

              
//               ];
              
//               if($request->active)
//               $frmData['active'] = 1;
//               else 
//               $frmData['active'] =0;

//               if($request->active)
//               $frmData['visible'] = 1;
//               else 
//               $frmData['visible'] =0;
//               Place_type::create($frmData);
//               return $this->redirect('addtypeplace')->withErrors(['_result' => '1',
//                '_message' => 'دسته بندی جدید با نام ' . $request->title .  ' با موفقیت اضافه شد']);
//           }
      
     

// }



namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Place_type;
use Illuminate\Http\Request;

class PlaceTypeController extends Controller
{
     public function list()
        
        {
         $placetypeArr= Place_type:: where ('id','>' ,0)->get();
                  // dd($placetypeArr);
             return $this->handle_view('placetype.list',compact('placetypeArr')); 
        }
     public function add()
        {
            //dd('add');
             return $this->handle_view('placetype.add'); 
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
        
        public function save(Request $request)
             {
                //dd($request->active);
              $frmData = [
                 'title' => $request->title,
                 'active' => $request->active,
                 'visible' => $request->visible,

              
              ];
              
              if($request->active)
              $frmData['active'] = 1;
              else 
              $frmData['active'] =0;

              if($request->active)
              $frmData['visible'] = 1;
              else 
              $frmData['visible'] =0;
              Place_type::create($frmData);
              return $this->redirect('addtypeplace')->withErrors(['_result' => '1',
               '_message' => 'دسته بندی جدید با نام ' . $request->title .  ' با موفقیت اضافه شد']);
          }
      
     

}
