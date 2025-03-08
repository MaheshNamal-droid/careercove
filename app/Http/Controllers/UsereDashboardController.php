<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\job_category;
use App\Models\job_vacancy;
use App\Models\applications;
use Auth;
use Response;
use Inertia\Inertia;
use DB;

class UsereDashboardController extends Controller
{
    public function home(){
        $userId = auth()->id();
        $job_categorys= job_category::all();
        $my_vacancies = job_vacancy::where('user_id', $userId)->get();
        $my_applications = applications::join('job_vacancy', 'application.job_id', '=', 'job_vacancy.id')
        ->where('application.user_id', $userId)
        ->get();
        $all_vacancies = job_vacancy::select ('job_category', DB::raw('count(*) as count'))->groupBy('job_category')->get();
        $all_applications = applications::join('job_vacancy', 'application.job_id', '=', 'job_vacancy.id')
        ->select ('job_vacancy.job_category', DB::raw('count(*) as count'))->groupBy('job_category')->where('application.user_id', $userId)->get();
        $vacancies_locations=job_vacancy::select('city as label', DB::raw('count(*) as value'))->groupBy('city')->get();
        return Inertia::render('userDashboard/home',[
            'job_categorys' => $job_categorys,
            'my_vacancies' => $my_vacancies,
            'my_applications' => $my_applications,
            'all_vacancies' => $all_vacancies,
            'all_applications' => $all_applications,
            'vacancies_locations' => $vacancies_locations
        ]);
    }
}
?>