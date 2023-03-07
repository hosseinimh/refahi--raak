<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use \Illuminate\Support\Facades\DB;

class callview extends  Model
{
    //======================================================
    static function add_logLogin($username,$fpass,$client_IP,$userid=0)
    {
        $username = substr($username,0,20);
        $fpass = substr($fpass,0,255);
        $client_IP = substr($client_IP,0,20);
        if(strlen($client_IP)<7)
            $client_IP = "127.0.0.1";
            
        $userid = intval($userid);
        try {
            return DB::select("CALL add_loglogin('" . $username . "','" . $fpass . "','" . $client_IP . "',$userid)");
        }
        catch (\Exception $e) {
            print_r("<H1> Code : 1 </H1>");
             die("refahi .... Error !");
              die($e->getMessage());
        }
    }
  
    
}

