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
public function getUserProfile()
{
    $user_profile = user_profile::where('user_id', auth()->id())->first();

    return Inertia::render('UserProfile/ViewUserProfile', [
        'user_profile' => $user_profile,
    ]);
}

// edit user profile
public function edit($id)
{
    $user_profile = user_profile::findOrFail($id);
    return Inertia::render('UserProfile/EditUserProfile', ['user_profile' => $user_profile]);
}

// update user profile
public function update(Request $request, $id)
{
    $user_profile = user_profile::findOrFail($id);

    // Handle Profile Picture
    if ($request->hasFile('profile_picture')) {
        $profile_picture = $request->file('profile_picture');
        $profile_picture_name = time() . '_' . $profile_picture->getClientOriginalName();
        $profile_picture->move(public_path('files'), $profile_picture_name);

        // Delete old profile picture
        if ($user_profile->profile_picture) {
            $oldProfilePath = public_path('files/' . $user_profile->profile_picture);
            if (file_exists($oldProfilePath)) {
                unlink($oldProfilePath);
            }
        }

        $user_profile->profile_picture = $profile_picture_name;
    }

    // Handle Resume
    if ($request->hasFile('resume')) {
        $resume = $request->file('resume');
        $resume_name = time() . '_' . $resume->getClientOriginalName();
        $resume->move(public_path('files'), $resume_name);

        // Delete old resume
        if ($user_profile->resume) {
            $oldResumePath = public_path('files/' . $user_profile->resume);
            if (file_exists($oldResumePath)) {
                unlink($oldResumePath);
            }
        }

        $user_profile->resume = $resume_name;
    }

    // Update other fields
    $user_profile->update([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'address' => $request->address,
        'contact_phone' => $request->contact_phone,
        'social_media' => $request->social_media,
        'description' => $request->description,
    ]);

    return redirect()->route('userProfile')->with('success', 'Profile updated successfully.');
}
}