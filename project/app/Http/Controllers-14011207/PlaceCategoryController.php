<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class PlaceCategoryController extends Controller
{
     public function list()
        {
         // dd('list');
             return $this->handle_view('placecategory.list'); 
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
