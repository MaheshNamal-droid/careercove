<?php

namespace App\Http\Controllers;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Models\job_vacancy;
use App\Models\applications;
use App\Models\user_profile;
use Illuminate\Support\Facades\DB;
use Auth;
use Response;
use Redirect;
use Inertia\Inertia;

class AppliedJobsController extends Controller
{
  public function viewAppliedVacancies()
    {
        $user = auth()->user();
    
        // Paginate the results to make sure the data is handled efficiently
        $applications = applications::where('user_id', $user->id)
            ->with('job_vacancy') // Load related job vacancies
            ->paginate(10); // Paginate to handle large sets of data
    
        // Return data to the view with Inertia
        return view('AppliedJobs.applications', ['applications' => $applications]);
    }

     public function show($id)
   {
      // Find the job vacancy by its ID
      $job_vacancy = job_vacancy::findOrFail($id);

      // Return the view with job vacancy details
      return view('AppliedJobs.show', compact('job_vacancy'));
   }
   
   public function getApplications(){
     
    //  $applications = applications::where('status', 1)->paginate(10);
        $applications = applications::join('job_vacancy', 'application.job_id', '=', 'job_vacancy.id')
        ->join('users', 'application.user_id', '=', 'users.id')
        ->paginate($perPage = 10, $columns = ['application.*','job_vacancy.title', 'users.name']);

     return Inertia::render('userDashboard/myApplications', ['posts' => $applications]);

   }

}
?>