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
   
  //  public function getApplications(){
     
  //   $user = auth()->id();
  //   //  $applications = applications::where('status', 1)->paginate(10);
  //       //$applications = applications::join('job_vacancy', 'application.job_id', '=', 'job_vacancy.id')
  //       $applications = applications::where('application.user_id', $user)
  //       ->where('status', '!=', 9) // Exclude deleted records
  //       ->join('job_vacancy', 'application.job_id', '=', 'job_vacancy.id') 
  //       ->select('application.*', 'job_vacancy.title as job_title') 
  //       ->paginate(10); // Paginate the results


         

     
  //       // ->paginate($perPage = 10, $columns = ['application.*','job_vacancy.title', 'users.name']);

  //    return Inertia::render('userDashboard/myApplications', ['posts' => $applications]);

  //  }

//   public function getApplications(){
//    $user = auth()->id();

//     // Fetch applications along with the related job_vacancy title using a join
//     $applications = applications::where('application.user_id', $user) // Specify table for user_id
//         ->where('application.status', '!=', 9) // Exclude deleted records, specify table for status
//         ->join('job_vacancy', 'application.job_id', '=', 'job_vacancy.id') // Corrected table reference 'applications'
//         ->select('application.*', 'job_vacancy.title as job_title') // Select all columns from applications and the job title from job_vacancy
//         ->paginate(10); // Paginate the results

//     // Return data to the Inertia view with posts (applications)
//     return Inertia::render('userDashboard/myApplications', ['posts' => $applications]);
// }


public function getApplications(){
     
  $user = auth()->id();
  //  $applications = applications::where('status', 1)->paginate(10);
      $applications = applications::where('application.user_id', $user)
      ->where('application.status', '!=', 9)
      ->join('users', 'application.user_id', '=', 'users.id')
      ->join('job_vacancy', 'application.job_id', '=', 'job_vacancy.id') 
      
      ->paginate($perPage = 10, $columns = ['application.*','job_vacancy.title', 'users.name']);

   return Inertia::render('userDashboard/myApplications', ['posts' => $applications]);

 }

}
?>