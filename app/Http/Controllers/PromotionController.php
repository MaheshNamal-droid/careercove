<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\promotion;
use Auth;
use Response;
use Redirect;
use Inertia\Inertia;


class PromotionController extends Controller
{
    public function create(Request $request)
    {
        // variable declaration
        $ads_image_name = null;

        $data = $request->all();

        $ads_image=$data['ads_image']; 

        // store advertisment image
        if($data['ads_image']){
            $ads_image=$data['ads_image'];
            $ads_image_name = time() . '_' . $ads_image->getClientOriginalName();
            $ads_image->move(public_path('files'), $ads_image_name);
        }

        $data = ([
            "user_id"=>auth()->id(),
            "ads_image"=>$ads_image_name,
            "description"=>$request->description,
            "text"=>$request->text,
           
        ]);

        try{
            $responsedata = promotion::create($data);
            return Response::json($responsedata);
        } catch (\Illuminate\Database\QueryException $exception) {
            // You can check get the details of the error using `errorInfo`:
            $errorInfo = $exception->errorInfo;
            //print_r($errorInfo);
            return response()->json('Unable to save data, please contact administrator !', 404); 
        }
    }

    // view promotion
    public function getPromotion(Request $request)
    {
        $promotion = promotion::find($request->id);
       // return Response::json($promotion);
        // return view('viewPromotion', compact('promotion'));
        // return Redirect::route('viewPromotion')->with( ['data' => $promotion] );
        return Inertia::render('Promotion/viewPromotion', [
           'data' => $promotion
        ]);
    }

    // get all promotions
    public function getPromotions()
    {
        $promotions = promotion::where('status', 1)->paginate(2);
       // return Response::json($promotions);
        return Inertia::render('Admininistrator/Promotions', ['posts' => $promotions]);
        // $promotions = promotion::where('status', 1)->paginate(10);
        // return Response::json($promotions);
    } 
    
    public function getRandomPromotion(){
        $promotions = promotion::where('status', 1)->inRandomOrder()->first();
        return Response::json($promotions);
    }
}

?>