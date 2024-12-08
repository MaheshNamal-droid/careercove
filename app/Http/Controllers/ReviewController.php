<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\review;
use Auth;
use Response;
use Redirect;
use Inertia\Inertia; 

class ReviewController extends Controller
{
  public function create(Request $request)
  {
  
    $data = ([
      "user_id"=>auth()->id(),
      "text"=>$request->text
  ]);
  try{
    $responsedata = review ::create($data);
    return Response::json($responsedata);
} catch (\Illuminate\Database\QueryException $exception) {
    // You can check get the details of the error using `errorInfo`:
    $errorInfo = $exception->errorInfo;
    //print_r($errorInfo);
    return response()->json('Unable to save data, please contact administrator !', 404); 
}
  }
  // view review
  public function getReview(Request $request)
  {
      $review = review::find($request->id);
      // return Response::json($review);
      // return view('viewReview', compact('review'));
      // return Redirect::route('viewReview')->with( ['data' => $review] );
      return Inertia::render('Review/viewReview', [
         'data' => $review
      ]);
  }



}
?>