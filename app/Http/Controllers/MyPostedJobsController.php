<?php

namespace App\Http\Controllers;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Models\job_vacancy;
use App\Models\user_profile;

use Auth;
use Response;
use Redirect;
use Inertia\Inertia;

class MyPostedJobsController extends Controller
{
   
    //view one job vacancy
    public function show($id): View
    {
        $jobVacancies = job_vacancy::findOrFail($id);
        return view('myPostedJobs.show', compact('jobVacancies'));
    }

    // logged-in users to view only their posted job vacancies in table
    public function index()
    {
        $userId = auth()->id();
        $jobVacancies = job_vacancy::where('user_id', $userId)
            ->where('status', '!=', 9) // Exclude deleted records
            ->paginate(10); // Paginate the results

        return view('myPostedJobs.index', compact('jobVacancies'));
    }

    // edit job vacancy
    public function edit($id)
    {
        $jobVacancy = job_vacancy::findOrFail($id); // Find the job by ID or throw a 404 error
        return view('myPostedJobs.edit', compact('jobVacancy')); // Pass the data to the edit view
    }

    // Update job vacancy
    public function update(Request $request, $id)
    {
        $jobVacancy = job_vacancy::findOrFail($id); // Find the job by ID
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirement' => 'required|string',
            'location' => 'required|string|max:255',
            'closing_date' => 'required|date',
            'company_name' => 'required|string|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
        ]);

        // Update the job vacancy data
        $jobVacancy->update($validatedData);

       // Redirect back with a success message
        return redirect()->route('myPostedJobs')->with('success', 'Job vacancy updated successfully.');
    }

    // delete job vacancies from the list
    public function delete($id)
    {
        $job_vacancy = job_vacancy::findOrFail($id);  // Find the job vacancy by its ID, if not found, an exception is thrown
        $job_vacancy->status = 9; // Update status to 9
        $job_vacancy->save();  // Save the changes to the database

        // Redirect the user back to the 'manageJobVacancies' route with a success message
        return redirect()->route('myPostedJobs')->with('success', 'Job vacancy deleted successfully.');
    }

   
}