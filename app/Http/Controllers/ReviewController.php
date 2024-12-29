<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Auth;
use Response;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function create(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'text' => 'required|string',
            'job_id' => 'required|exists:job_vacancy,id',  // Ensure the job_id exists in the jobs table
        ]);

        // Prepare the review data
        $data = [
            'user_id' => auth()->id(),
            'text' => $request->text,
            'job_id' => $request->job_id,  // Include the job_id in the review data
        ];

        try {
            // Create the review record
            $review = Review::create($data);

            // Return a success response
            return response()->json($review, 200);

        } catch (\Exception $e) {
            // Handle errors
            return response()->json('Unable to save data, please contact administrator!', 404);
        }
    }

    // Method to view the review
    public function getReview(Request $request)
    {
        $review = Review::find($request->id);
        return Inertia::render('Review/viewReview', [
            'data' => $review
        ]);
    }

    public function getReviewByid(Request $request)
    {
        $review = Review::where('job_id', $request->id)->get();
        return Response::json($review);
    }
}

?>