<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\job_vacancy;
use App\Models\applications;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboardStats()
    {
        $candidatesCount = applications::distinct('user_id')->count('user_id'); // Count of all applied users
        $jobsPostedCount = job_vacancy::count(); // Count of all job vacancies
        $companiesCount = job_vacancy::distinct('company_name')->count('company_name'); // Count of all companies

        return inertia('Dashboard', [
            'candidates' => $candidatesCount,
            'jobsPosted' => $jobsPostedCount,
            'companies' => $companiesCount,
        ]);
    }
}