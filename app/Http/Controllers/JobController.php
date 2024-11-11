<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\job_vacancy;
use Auth;
use Response;


class JobController extends Controller
{
    public function create(Request $request)
    {
        // variable declaration
        $banner_name = null;
        $company_logo_name = null;

        $data = $request->all();
        $files=$data['file']; 
        $company_logo=$data['company_logo']; 

        // store main banner image
        if($data['file']){
            $banner=$data['file'];
            $banner_name = time() . '_' . $banner->getClientOriginalName();
            $banner->move(public_path('files'), $banner_name);
        }

        // store company logo
        if($data['company_logo']){
            $company_logo=$data['company_logo'];
            $company_logo_name = time() . '_' . $company_logo->getClientOriginalName();
            $company_logo->move(public_path('files'), $company_logo_name);
        }

        $data = ([
            "user_id"=>auth()->id(),
            "title"=>$request->title,
            "description"=>$request->description,
            "requirement"=>$request->requirement,
            "location"=>$request->location,
            "files"=>$banner_name,
            "closing_date"=>$request->closing_date,
            "company_name"=>$request->company_name,   
            "company_logo"=>$company_logo_name,
            "contact_phone"=>$request->contact_phone,   
            "contact_email"=>$request->contact_email,   
            "address"=>$request->address 
        ]);
        try{
            $responsedata = job_vacancy::create($data);
            return Response::json($responsedata);
        } catch (\Illuminate\Database\QueryException $exception) {
            // You can check get the details of the error using `errorInfo`:
            $errorInfo = $exception->errorInfo;
            //print_r($errorInfo);
            return response()->json('Unable to save data, please contact administrator !', 404); 
        }
    }
}
