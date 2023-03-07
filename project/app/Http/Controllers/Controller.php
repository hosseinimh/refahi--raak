<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Helper;
use Auth;
use App\Models\CallView;
use App\Models\Oprlog;
use App\Helpers\RAAKSMS;



class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    public function __construct()
    {
        date_default_timezone_set('Asia/Tehran');
    }
    public function update_db()
    {
        dd("Are You Sure ?");
          //  dd($myReqList);
                      //  =============================
                        // $AllReq = ReqList::All_req();
                        // for($i=0,$j=0,$k=0,$m=0;$i<count($AllReq);$i++)
                        //     {
                        //         echo $i."-";
                        //         print_r($AllReq[$i]->id . "  - This Status:".$AllReq[$i]->status );
                        //         // if($AllReq[$i]->reqtype_id ==1 )
                                //     {
                                //         $companyInfo = Company::where('id',$AllReq[$i]->company_id)->first();
                                //         if($companyInfo)
                                //             {
                                               
                                //                 $r = ReqList::where('id',$AllReq[$i]->id)->first();
                                //                 $r->update(['final_status' => $companyInfo->status,
                                //                             'tbl_id' => $companyInfo->id, ])  ; 
                                //                 print_r("  - ".++$j );  
                                //             }
                                             
                                //     }
                                    // if($AllReq[$i]->reqtype_id ==2 )
                                    // {
                                    //     $companymanagerInfo = CompanyManagers::where('company_id',$AllReq[$i]->company_id)->first();
                                    //     if($companymanagerInfo)
                                    //         {
                                                       
                                    //             $r = ReqList::where('id',$AllReq[$i]->id)->first();
                                    //             $r->update(['final_status' => $companymanagerInfo->status,
                                    //                          'tbl_id' => $companymanagerInfo->id, ])  ; 
                                    //             print_r("  - ".++$k );  
                                    //         }
                                           
                                    // } 
                                    // if($AllReq[$i]->reqtype_id ==3 )
                                    // {
                                    //     $exportDayInfo = RegExportDay1401::where('company_id',$AllReq[$i]->company_id)->first();
                                    //     if($exportDayInfo)
                                    //         {
                                    //             $r = ReqList::where('id',$AllReq[$i]->id)->first();
                                    //             $r->update(['final_status' => $exportDayInfo->status,
                                    //             'tbl_id' => $exportDayInfo->id, ])  ; 
                                    //             print_r("  - ".++$m );  
                                    //         }
                                    // } 
                                   
                                
                        //         echo "<br>";
                        //     }
                        // dd("AA");
                        //==========================================
                       // dd($myReqList);
    }
    public function getIp(){
        foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
            if (array_key_exists($key, $_SERVER) === true){
                foreach (explode(',', $_SERVER[$key]) as $ip){
                    $ip = trim($ip); // just to be safe
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
                        return $ip;
                    }
                }
            }
        }
        return request()->ip(); // it will return server ip when no client ip found
    }
    protected function Check_NatCode($natCode,$Legal_person=1)
    {
        if($Legal_person==1) //Company
        {
            if(strlen($natCode)!=11)
               return false;
            $j = intval($natCode[9])+2;
            $x = ( (intval($natCode[0]) + $j) * 29 + 
                 (intval($natCode[1]) + $j) * 27 + 
                 (intval($natCode[2]) + $j) * 23 + 
                 (intval($natCode[3]) + $j) * 19 + 
                 (intval($natCode[4]) + $j) * 17 + 
                 (intval($natCode[5]) + $j) * 29 + 
                 (intval($natCode[6]) + $j) * 27 + 
                 (intval($natCode[7]) + $j) * 23 + 
                 (intval($natCode[8]) + $j) * 19 + 
                 (intval($natCode[9]) + $j) * 17 ) % 11; 
                
             if(intval($natCode[10]) != $x%10 )       
                return false;
            
        }
        else
        {
            if(strlen($natCode)!=10)
                return false;
            $x = (  intval($natCode[0]) * 10 + 
                    intval($natCode[1]) * 9  + 
                    intval($natCode[2]) * 8 + 
                    intval($natCode[3]) * 7  + 
                    intval($natCode[4]) * 6  + 
                    intval($natCode[5]) * 5  + 
                    intval($natCode[6]) * 4  + 
                    intval($natCode[7]) * 3 + 
                    intval($natCode[8]) * 2  ) % 11; 
              if($x<2 && intval($natCode[9]) == $x)
                    return true;
              elseif($x>=2 && 11 - intval($natCode[9]) == $x)  
                  return true;     
             return false;
        }
        return true;
    }
     
    function send_sms($mobile)
    {
        $token = rand(1000, 9999);
        //$message = __('user.login_sms_message', ['field' => $token]);
         $r=RAAKSMS::SendVerifyCde($mobile, $token);
        //  dd($r);
        //Helper::send_sms($mobile, $message);

        return $token;
    }

    protected function set_opr_log($opr="create_page")
    {
        $oprlog_rec = Oprlog::where('m_date', date("Y-m-d"))->where('admin_id', Auth::user()->id)->get();


        if($opr=="create_page")
        {
            if (!is_null($oprlog_rec) && count($oprlog_rec) > 0)
            {
                $opr_data = ['create_page' => $oprlog_rec[0]->create_page + 1];
                Oprlog::where('id', $oprlog_rec[0]->id)->update($opr_data);
            }

            else
            {
                $opr_data = ['admin_id' => Auth::user()->id,
                    'm_date' =>  date("Y-m-d"),
                    'create_page' => 1,];
                Oprlog::Create($opr_data);
            }
        }
        if($opr=="edit_page")
        {
            if (!is_null($oprlog_rec) && count($oprlog_rec) > 0)
            {

                $opr_data = ['edit_page' => $oprlog_rec[0]->edit_page + 1];
                Oprlog::where('id', $oprlog_rec[0]->id)->update($opr_data);


            }
            else
            {

                $opr_data = ['admin_id' => Auth::user()->id,
                    'm_date' =>  date("Y-m-d"),
                    'edit_page' => 1,];
                Oprlog::Create($opr_data);
            }

        }



    }

    protected function Check_Permision($id,$idtype)
    {
        $idtype = strtolower($idtype);

        if($id==999 && $idtype=="admin")
        return true;
        
        if($id==0 && $idtype=="user")
            return true;

        if($id==99 && $idtype=="tpoadmin")
            return true;

        if($id>0 && $id<40 && $idtype=="samt")
            return true;

        if($id>100 && $id<140 && $idtype=="otagh")
            return true;

        if($id>=40 && $id<70 && $idtype=="tpo")
            return true; 
            
        return false;
    
    }

    protected function redirect($route, $parameteres = [])
    {
        return redirect()->route($route, $parameteres);
    }

    protected function fill_requests(Request $request, &$data, $keys)
    {
        foreach ($keys as $key)
            $data[$key] = is_null($request[$key]) ? null : $request[$key];
    }

    protected function handle_view($view_name, $compact = null, $subtitle = null, $with = null)
    {
        $compact = is_null($compact) ? array() : $compact;
        $compact['subtitle'] = $subtitle;

        if (Session::has('errors')) {
            if (session('errors')->has('_result'))
                $compact['_result'] = session('errors')->first('_result');

            if (session('errors')->has('_message'))
                $compact['_message'] = session('errors')->first('_message');
        }
        else {
            if (Session::has('_result'))
                $compact['_result'] = session('_result');

            if (Session::has('_message'))
                $compact['_message'] = session('_message');
        }

        if (!is_null($with))
            foreach ($with as $key => $value)
                $compact[$key] = $value;
        
        return view($view_name, $compact);
    }

    protected function handle_alter($success, $route_name, $store = true)
    {
        if ($success)
            if ($store)
                return $this->redirect($route_name)->with(['_result' => '1', '_message' => __('general.success', ['action' => __('general.store')])]);
            else
                return $this->redirect($route_name)->with(['_result' => '1', '_message' => __('general.success', ['action' => __('general.update')])]);

        return $this->redirect($route_name)->with(['_result' => '0', '_message' => __('general.error_occured')]);
    }

    protected function handle_destroy($success)
    {
        if ($success)
            return response()->json(['_result' => '1', '_message' => __('general.success', ['action' => __('general.destroy')])], 200);

        return response()->json(['_result' => '0', '_message' => __('general.failure')], 200);
    }

    protected function handle_error(\Exception $e,$isDIE="")
    {
        
        dd($e);
        $userid = 0;
        if(Auth::user())
            $userid = Auth::user()->mobile;
        callview::add_error($_SERVER['REQUEST_URI'],$e->getMessage(),$userid);
        if($isDIE=="DIE")
            die("HomePage Error !!!");
        return $this->redirect('front.home');
        //
        //Helper::handle_error($e);
        //return $this->redirect('front.home')->withErrors(['_result' => '0', '_message' => __('general.error_occured')]);
    }

    protected function strip_tags($value)
    {
        try {
            $value = trim($value);
            $value = str_replace("\"", "", $value);
            $value = str_replace("''", "", $value);
            $value = str_replace("&lt;", "", $value);
            $value = str_replace("&gt;", "", $value);
            $value = strip_tags($value);

            return $value;
        } catch (\Exception $e) { return null; }
    }
}