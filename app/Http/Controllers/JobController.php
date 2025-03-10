<?php

namespace App\Http\Controllers;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Models\job_vacancy;
use App\Models\job_category;
use App\Models\applications;
use App\Models\user_profile;
use Illuminate\Http\RedirectResponse;

use Auth;
use Response;
use Redirect;
use Inertia\Inertia;

class JobController extends Controller
{
    public function createVacancy(Request $request)
    {
        $categorys = job_category::all();
        return Inertia::render('Job/createVacancy', [
           'data' => $categorys
        ]);
        //return Inertia::render('Job/createVacancy');
    }
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
            "job_category"=>$request->category,
            "full_or_part_time"=>$request->full_or_part_time,
            "description"=>$request->description,
            "requirement"=>$request->requirement,
            "location"=>$request->location,
            "files"=>$banner_name,
            "closing_date"=>$request->closing_date,
            "company_name"=>$request->company_name,   
            "company_logo"=>$company_logo_name,
            "contact_phone"=>$request->contact_phone,   
            "contact_email"=>$request->contact_email,   
            "city"=>$request->city, 
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

    // view all job vacancies in table
    public function index(): View
    {
        $job_vacancy = job_vacancy::where('status', '!=', 9)->paginate(10); // Exclude deleted records
        return view('JobVacancy.index')->with('JobVacancy', $job_vacancy);
    }
    
    //view one job vacancy
    public function show($id): View
    {
        $job_vacancy = job_vacancy::findOrFail($id);
        return view('JobVacancy.show', compact('job_vacancy'));
    }

// infinate scroll
    public function initiateScroll(Request $request)
    {
        $vacancies = job_vacancy::ORDERBY('created_at', 'DESC')->paginate(10); // Paginate the results, 10 per page
        return Response::json($vacancies);
        if ($request->ajax()) {
           // return view('users.partials.users_list', compact('users'))->render();
           return Response::json($vacancies);
        }

        //return view('users.index', compact('users'));
    }
// view vacancy
    public function getVacancy(Request $request)
    {
        $vacancy = job_vacancy::find($request->id);
       // return Response::json($vacancy);
        // return view('viewVacancy', compact('vacancy'));
        // return Redirect::route('viewVacancy')->with( ['data' => $vacancy] );
        return Inertia::render('Job/viewVacancy', [
           'data' => $vacancy
        ]);
    }
    // apply vacancy
    public function applyVacancy(Request $request)
    {
        // $vacancy = job_vacancy::find($request->id);
        // $vacancy->status = 1;
        // $vacancy->save();
        // return Redirect::route('viewVacancy')->with( ['data' => $vacancy] );
        $vacancy = job_vacancy::find($request->jobid);
        $profile = user_profile::find(1);
        $data = ([
            "user_id"=>auth()->id(),
            "job_id"=>$vacancy->id,
            "profile_id"=>1,
            "status"=>1,
            "is_approved"=>0,
        ]);
        try{
            $responsedata = applications::create($data);
            return Response::json($responsedata);
        } catch (\Illuminate\Database\QueryException $exception) {
            // You can check get the details of the error using `errorInfo`:
            $errorInfo = $exception->errorInfo;
            //print_r($errorInfo);
            return response()->json('Unable to save data, please contact administrator !', 404); 
        }
    }


    // Method to increment the view count for a job vacancy
    public function incrementViewCount(Request $request)
   {
       // Find the job vacancy by its ID
       $jobVacancy = job_vacancy::findOrFail($request->id);

       // Increment the 'view_count' field by 1
       $jobVacancy->increment('view_count');

       // Return a JSON response indicating success
       return response()->json(['success' => true]);
   }
    // delete job vacancies from the list
    public function delete($id)
    {
        $job_vacancy = job_vacancy::findOrFail($id);  // Find the job vacancy by its ID, if not found, an exception is thrown
        $job_vacancy->status = 9; // Update status to 9
        $job_vacancy->save();  // Save the changes to the database

        // Redirect the user back to the 'manageJobVacancies' route with a success message
        return redirect()->route('manageJobVacancies')->with('success', 'Job vacancy deleted successfully.');
    }

    // search job title or company name
    public function search(Request $request)
    {
        $query = $request->input('query'); // Get the search query from the input field

        $results = job_vacancy::where('status', '!=', 9) // Exclude deleted records
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', '%' . $query . '%')
                ->orWhere('company_name', 'like', '%' . $query . '%');
            })
            ->paginate(10); // Paginate the results

        return view('JobVacancy.index', ['JobVacancy' => $results, 'query' => $query]); // Pass the results and the query to the view
    }

// Controller Method to Get Job Vacancies
public function getJobVacancies(Request $request)
{
    $query = $request->query('query'); // Get search query parameter
    $vacanciesQuery = job_vacancy::where('status', '!=', 9);

    if ($query) {
        // Filter by job title or company name
        $vacanciesQuery->where(function ($q) use ($query) {
            $q->where('title', 'like', '%' . $query . '%')
              ->orWhere('company_name', 'like', '%' . $query . '%');
        });
    }

    $vacancies = $vacanciesQuery->paginate(10); // 10 job vacancies per page
    return response()->json($vacancies);
}


// Controller Method to Delete a Job Vacancy
public function deleteJobVacancy(Request $request, $id)
{
    $vacancy = job_vacancy::find($id);

    if ($vacancy) {
        // Perform delete by updating the status
        $vacancy->status = 9; 
        $vacancy->save();

        return response()->json($vacancy);
    }

    return response()->json(['message' => 'Job vacancy not found'], 404);
}




//  Controller Method to Increment the View Count of a Job Vacancy
public function incrementViewCountOfJob($id)
{
    $vacancy = job_vacancy::find($id);

    if ($vacancy) {
        $vacancy->increment('view_count'); // Increment view count
    }

}


// Search Job Vacancies in dashboard
public function searchVacancies(Request $request)
{
    $searchTerm = $request->get('search', ''); // Get search query parameter
    $jobs = job_vacancy::query()
        ->where('title', 'LIKE', "%{$searchTerm}%")
        ->orWhere('company_name', 'LIKE', "%{$searchTerm}%")
        ->get(); // Fetch all matching results

    return response()->json($jobs);
}


}
