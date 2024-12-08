<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\user_profile;
use Auth;
use Response;
use Redirect;
use Inertia\Inertia;

class UserProfileController extends Controller
{
  public function create(Request $request)
  {
      // variable declaration
      $profile_picture_name = null;
      $resume_name = null;

      $data = $request->all();
      $profile_picture=$data['profile_picture']; 
      $resume=$data['resume']; 

      // store profile_picture
      if($data['profile_picture']){
        $profile_picture=$data['profile_picture'];
        $profile_picture_name = time() . '_' . $profile_picture->getClientOriginalName();
        $profile_picture->move(public_path('files'), $profile_picture_name);
    }

      // store resume
      if($data['resume']){
        $resume=$data['resume'];
        $resume_name = time() . '_' . $resume->getClientOriginalName();
        $resume->move(public_path('files'), $resume_name);
    }

    $data = ([
      "user_id"=>auth()->id(),
      "first_name"=>$request->first_name,
      "last_name"=>$request->last_name,
      "email"=>$request->email,
      "address"=>$request->address,
      "contact_phone"=>$request->contact_phone,   
      "social_media"=>$request->social_media,   
      "profile_picture"=>$profile_picture_name, 
      "resume"=>$resume_name,   
      "description"=>$request->description 
  ]);

  try{
    $responsedata = user_profile::create($data);
    return Response::json($responsedata);
} catch (\Illuminate\Database\QueryException $exception) {
    // You can check get the details of the error using `errorInfo`:
    $errorInfo = $exception->errorInfo;
    //print_r($errorInfo);
    return response()->json('Unable to save data, please contact administrator !', 404); 
}
}

// infinate scroll
public function initiateScroll(Request $request)
{
    $user_profiles = user_profile::paginate(10); // Paginate the results, 10 per page
    return Response::json($user_profiles);
    if ($request->ajax()) {
       // return view('users.partials.users_list', compact('users'))->render();
       return Response::json($user_profiles);
    }

    //return view('users.index', compact('users'));
}

// view user profile
public function getUserProfile(Request $request)
{
    $user_profile = user_profile::find($request->id);
   // return Response::json($user_profile);
    // return view('viewUserProfile', compact('user_profile'));
    // return Redirect::route('viewUserProfile')->with( ['data' => $user_profile] );
    return Inertia::render('UserProfile/viewUserProfile', [
       'data' => $user_profile
    ]);
}
}