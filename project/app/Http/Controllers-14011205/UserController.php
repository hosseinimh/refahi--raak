<?php



namespace App\Http\Controllers;



use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Illuminate\Http\Request;

use App\Helpers\Helper;

use Auth;

use Session;

use Illuminate\Foundation\Validation\ValidatesRequests;

use Illuminate\Routing\Controller as BaseController;

use App\Models\Raaklog;

use App\Models\Town;

use App\Models\User;





class UserController extends Controller

{

     public function Login()

     {



          return response()->json(['_result' => '1', '_message' => ' نام کاربری اشتباه است ']);

     }



     public function checkpass(Request $request)

     {

          $mobile   = $request->mobile;

          $password = $request->password;



          if (is_null($password))

               return response()->json(['_result' => '0', '_message' => 'رمز عبور نمیتواند خالی باشد']);



          if (is_null($mobile))

               return response()->json(['_result' => '0', '_message' => 'نام کاربری اشتباه است']);







          if (Auth::attempt(['mobile' => $mobile, 'password' => $password])) {

               $frmdata = [

                    'user_id' => Auth::user()->id,

                    'user_ip' => $this->getIp(),

                    'route_url' => 'login'



               ];

               Raaklog::create($frmdata);

               //     return $this->redirect('dashboard');

               return response()->json(['_result' => '1', '_message' => 'ورود با موفقیت  انجام شد','crnuser'=>Auth::user()]);

          } else {

               $frmdata = [

                    'user_id' => 0,

                    'user_ip' => $this->getIp(),

                    'route_url' => 'login',

                    'des' => $mobile . "@" . $password

               ];

               Raaklog::create($frmdata);

               //  Raaklog::add_logLogin($mobile, $password, $request->ip(), $user->id);

               return response()->json(['_result' => '0', '_message' => 'نام کاربری  و رمز عبور اشتباه است']);

               //    return $this->redirect('loginform')->withErrors(['_result' => '0', '_message' => 'نام کاربری  و رمز عبور اشتباه است']);



          }

          //return $this->handle_view('checkpass'); 

     }

     public function save(Request $request)

     {



          $crnuser = user::where('natcode',$request->nationalCode)->first();

          if($crnuser)

               return response()->json([

                    '_result' => '0',

                    '_message' => ' کد ملی تکراری است'

               ]);

          $frmData = [

               'fname' => $request->fname,

               'lname' => $request->lname,

               'natcode' => $request->nationalCode,

               'mobile' => $request->mobile,

               'town_id' => $request->townid,

               'user_name' => $request->userName,

               'password' => $request->password,

          ];

          if($request->townid > 1000)
             {
               $frmData['town_id'] = 0;
               $frmData['is_admin'] = 11;
             } 

          user::create($frmData);

          return response()->json([

               '_result' => '1',

               '_message' => 'کاربر جدید با نام ' . $request->fname . ' ' . $request->lname . ' با موفقیت اضافه شد'

          ]);

          //     return $this->redirect('adduser')->withErrors(['_result' => '1',

          //      '_message' => 'کاربر جدید با نام ' . $request->fname . ' ' . $request->lname . ' با موفقیت اضافه شد']);

     }





     public function management()

     {

          //dd('LoginForm');

          return $this->handle_view('user.management');

     }





     public function dashboard()

     {

          //dd('LoginForm');

          return $this->handle_view('dashboard');

     }

     public function Logout()

     {

          dd('LogoutForm');

          return $this->handle_view('logoutform');

     }

     public function forget()

     {

          dd('forgetpass');

          return $this->handle_view('forgetpass');

     }

     public function add()

     {

          // $town_list = Town::where('province_id', 11)->orderby('title', 'ASC')->get();

          // return $this->handle_view('user.add', compact('town_list'));





       

          $town_list = Town::where('province_id', 11)->orderby('title', 'ASC')->get();

    

          return response()->json([

             '_result' => '1',

             'town_list' => $town_list

          ]);

     }

     public function edit(Request $request)

     {

          //dd($request->id);



          $userinfo = user::where('id', $request->id)->first();

          // $town_list = Town::where('province_id', 11)->orderby('title', 'ASC')->get();

          // return $this->handle_view('user.edit', compact('userinfo', 'town_list'));

          return response()->json([

               'userinfo' => $userinfo

          ]);

     }

     public function update(Request $request)

     {

          $userid = $request->id;

          $frmData = [

               'fname' => $request->fname,

               'lname' => $request->lname,

               'mobile' => $request->mobile,

               'town_id' => $request->town_id,

               'password' => $request->password,

               'user_name' => $request->user_name,

               'natcode' => $request->natcode,

          ];

          $crnuser = user::where('id', $userid)->first();



          if (!is_null($request->pass))

               $crnuser->setPasswordAttribute($request->pass);





          $crnuser->update($frmData);

          // return $this->redirect('userlist')->withErrors(['_result' => '1',

          // '_message' => 'کاربر  با نام ' . $request->fname . ' ' . $request->lname . ' با موفقیت ویرایش شد']);

          return response()->json([

               '_result' => '1',

               '_message' => 'کاربر  با نام ' . $request->fname . ' ' . $request->lname . ' با موفقیت ویرایش شد'

          ]);

     }



     public function list()

     {

          $userlist = user::where('id', '>', 0)->orderby('id', 'DESC')->get();

          // dd($userlist);

          //    return $this->handle_view('user.list',compact('userlist')); 

          return response()->json([

               '_result' => '1',

               'userlist' => $userlist

          ]);

     }





     //    public function delete(Request $request)

     //    {

     //     $userid = $request->id; 

     //     $crnuser = user::where('id',$userid)->first();





     //     $crnuser->delete();

     // //     dd($crnuser);

     //    // user::create($frmData);

     // //     return $this->redirect('userlist')->withErrors(['_result' => '1','_message' => 'کاربر  با نام ' . $crnuser->fname . ' ' . $crnuser->lname . ' با موفقیت حذف شد']);

     // return response()->json(['_result' => '1','_message' => 'کاربر  با نام ' . $crnuser->fname . ' ' . $crnuser->lname . ' با موفقیت حذف شد']);

     // }

     public function delete(User $user)

     {

          $user->delete();

          return response()->json(['_result' => '1', '_message' => 'کاربر  با نام ' . $user->fname . ' ' . $user->lname . ' با موفقیت حذف شد']);

     }

}







// namespace App\Http\Controllers;



// use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

// use Illuminate\Http\Request;

// use App\Helpers\Helper;

// use Auth;

// use Session;

// use Illuminate\Foundation\Validation\ValidatesRequests;

// use Illuminate\Routing\Controller as BaseController;

// use App\Models\Raaklog;

// use App\Models\Town;

// use App\Models\user;





// class UserController extends Controller

// {

//      public function Login()

//         {

//           //dd('LoginForm');

//              return $this->handle_view('login'); 

//         }



//         public function checkpass(Request $request)

//         {

//           $mobile   = $request->mobile;

//           $password = $request->password;

  

//           if (is_null($password))

//               return $this->redirect('loginform')->withErrors(['_result' => '0', '_message' =>'رمز عبور نمیتواند خالی باشد']);



//           //$user = $this->get_user($mobile);

//           if (is_null($mobile))

//               return $this->redirect('loginform')->withErrors(['_result' => '0', '_message' => 'نام کاربری اشتباه است']);

   

  

//           if (Auth::attempt(['mobile' => $mobile, 'password' => $password])) 

//           {

//                 $frmdata = [

//                     'user_id' =>Auth::user()->id,

//                     'user_ip' => $this->getIp(),

//                     'route_url' => 'login'                 

                   

//                 ];

//                Raaklog::create($frmdata);

//               return $this->redirect('dashboard');

//           } 

//           else 

//           {

//                $frmdata = [

//                     'user_id' =>0,

//                     'user_ip' => $this->getIp(),

//                     'route_url' => 'login' ,                

//                     'des' => $mobile."@".$password

//                 ];

//                Raaklog::create($frmdata);

//            //  Raaklog::add_logLogin($mobile, $password, $request->ip(), $user->id);

//              return $this->redirect('loginform')->withErrors(['_result' => '0', '_message' => 'نام کاربری  و رمز عبور اشتباه است']);

//           }

//              //return $this->handle_view('checkpass'); 

//      }

//  public function save(Request $request)

//              {

                

//               $frmData = [

//                  'fname' => $request->fname,

//                  'lname' => $request->lname,

//                  'mobile' => $request->mobile,

//                  'password' => $request->pass,

//                  'town_id' => $request->townid,



              

//               ];

//               user::create($frmData);

//               return $this->redirect('adduser')->withErrors(['_result' => '1',

//                '_message' => 'کاربر جدید با نام ' . $request->fname . ' ' . $request->lname . ' با موفقیت اضافه شد']);

//           }

               

                

//           public function management()

//           {

//             //dd('LoginForm');

//                return $this->handle_view('user.management'); 

//           }   



  

//         public function dashboard()

//         {

//           //dd('LoginForm');

//              return $this->handle_view('dashboard'); 

//         }

//         public function Logout()

//         {

//           dd('LogoutForm');

//              return $this->handle_view('logoutform'); 

//         }  

//         public function forget()

//         {

//           dd('forgetpass');

//              return $this->handle_view('forgetpass'); 

//         }      

//      public function add()

//         {

//           $town_list = Town::where('province_id',11)->orderby('title','ASC')->get();

//              return $this->handle_view('user.add' ,compact('town_list')); 

//         }   

//         public function edit(Request $request)

//         {

//           //dd($request->id);

        

//            $userinfo = user::where('id',$request->id)->first();

//            $town_list = Town::where('province_id',11)->orderby('title','ASC')->get();

//              return $this->handle_view('user.edit',compact('userinfo','town_list')); 

//         }

//         public function update(Request $request)

//         {

//           $userid = $request->id;

//           $frmData = [

//                'fname' => $request->fname,

//                'lname' => $request->lname,

//                'mobile' => $request->mobile,

//                'town_id' => $request->townid,

//             ];

//             $crnuser = user::where('id',$userid)->first();



//           if(!is_null($request->pass))  

//                $crnuser->setPasswordAttribute($request->pass);





//                $crnuser->update($frmData);

//           return $this->redirect('userlist')->withErrors(['_result' => '1',

//           '_message' => 'کاربر  با نام ' . $request->fname . ' ' . $request->lname . ' با موفقیت ویرایش شد']);



//         }

      

//         public function list()

//         {

//          $userlist = user::where('id','>',0)->orderby('id','DESC')->get();

//         // dd($userlist);

//              return $this->handle_view('user.list',compact('userlist')); 

//         }   

        

        

//         public function delete(Request $request)

//         {

//          $userid = $request->id; 

        

//          $crnuser = user::where('id',$userid)->first();

       



//         $crnuser->delete();

//         // user::create($frmData);

//          return $this->redirect('userlist')->withErrors(['_result' => '1',

//           '_message' => 'کاربر  با نام ' . $crnuser->fname . ' ' . $crnuser->lname . ' با موفقیت حذف شد']);

//      }

// }