<?php

// namespace App\Http\Controllers;

// use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
// use Illuminate\Foundation\Bus\DispatchesJobs;
// use Illuminate\Foundation\Validation\ValidatesRequests;
// use Illuminate\Routing\Controller as BaseController;

// class LoginFormController extends Controller
// {
//      public function LoginForm()
//         {
//           dd('login');   
//              return $this->handle_view('loginform'); 
//         }
      
     

// }

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class LoginFormController extends Controller
{
     public function LoginForm()
        {
          dd('login');   
             return $this->handle_view('loginform'); 
        }
      
     

}
