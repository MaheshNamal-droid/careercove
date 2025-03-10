<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\job_vacancy;
use App\Models\applications;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    // Method to display job applications for a specific job vacancy
    public function index($jobId)
    {
        // Fetch the job vacancy details using the provided job ID
        $jobapplication = job_vacancy::findOrFail($jobId);

        // Retrieve all applications related to the job, including user and profile data
        $applications = applications::where('job_id', $jobId)
            ->with('user.profile') // Load the user relationship
            ->get();

        // Render the React page with job and application data
        return Inertia::render('userDashboard/JobApplications', [
            'job' => $jobapplication,
            'applications' => $applications
        ]);
    }

    // Method to update the application status (approve/pending)
    public function updateStatus(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'id' => 'required|exists:application,id',
            'is_approve' => 'required|boolean',
        ]);

        // Find the application record by ID
        $application = applications::find($request->id);

        // Update the application status (approve or pending)
        $application->is_approved = $request->is_approve;
        $application->save();

        // Redirect back with a success message
        return back()->with('success', 'Application status updated successfully.');
    }

    // Method to add a note to an application
    public function addNote(Request $request)
{
    // Validate the input data
    $request->validate([
        'id' => 'required|exists:application,id',
        'note' => 'required|string',
    ]);

    // Find the application
    $application = applications::find($request->id);

    // Update the note field
    $application->note = $request->note;
    $application->save();

    // Return a success response
    return back()->with('success', 'Note added successfully');
}

}
