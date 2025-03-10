<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\ContactUs;
use Mail;
use Auth;

class ContactUsController extends Controller
{
    //
    public function sendMail(Request $request){
        $user = Auth::user();
        try {
            $bccEmails = ['maheshnamal@rocketmail.com'];
            $user->notify(new ContactUs($request->name,$request->email,$request->phone,$request->message,$bccEmails));
            $notify_status = ([
                "notify_email_status"=>200,
                "email_status"=>9,
                "notify_mail_responce"=>"Email Sent Successfully"
            ]);
        }catch (\Exception $e) {
            $notify_status = ([
                "notify_email_status"=>502,
                "email_status"=>9,
                "notify_mail_responce"=>"Email Did Not Sent"
            ]);
        }

        return response()->json($notify_status);}
}
