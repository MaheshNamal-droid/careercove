<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdministratorUser;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MyPostedJobsController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AppliedJobsController;
use App\Http\Controllers\UsereDashboardController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\ContactUsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Dashboard');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});
Route::get('/home', function () {
    return Inertia::render('Dashboard');
})->name('home');
// admin routes
// Route::get('/administrator', function () {
//     return Inertia::render('Admin/Home');
// })->middleware(['auth', 'verified', 'isAdminn'])->name('administrator');
Route::get('/administrator/users', function () {
    return Inertia::render('Admin/Users');
})->middleware(['auth', 'verified'])->name('administrator');
// dashboard routes
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::withoutMiddleware('auth')->group(function () {
    Route::get('/dashboard/initiateScroll', [JobController::class, 'initiateScroll']);
});
Route::withoutMiddleware('auth')->group(function () {
    Route::get('/dashboard/{id}', [JobController::class, 'getVacancy']);
});
Route::get('/viewVacancy', function () {
    return Inertia::render('Job/viewVacancy');
})->withoutMiddleware(['auth', 'verified'])->name('viewVacancy');

Route::middleware('auth','EnsureProfileIsCreated')->group(function () {
    Route::POST('/applyVacancy', [JobController::class, 'applyVacancy']);
});


Route::middleware('auth')->group(function () {
    Route::get('/getUsers', [AdministratorUser::class, 'getUsers']);
});

// profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
    


// promotion route
Route::get('/createPromotion', function () {
return Inertia::render('Promotion/createPromotion');
})->middleware(['auth', 'verified'])->name('createPromotion');

Route::get('/getRandomPromotion', [PromotionController::class, 'getRandomPromotion']);

Route::middleware('auth')->group(function () {
    Route::post('/addPromotion', [PromotionController::class, 'create']);
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Edit, Update, Delete Promotion
Route::get('/editPromotion/{id}', [PromotionController::class, 'edit'])->middleware(['auth', 'verified']);
Route::post('/updatePromotion/{id}', [PromotionController::class, 'update'])->middleware(['auth', 'verified']);
Route::post('/deletePromotion/{id}', [PromotionController::class, 'destroy'])->middleware(['auth', 'verified']);



// review route
Route::get('/createReview', function () {
    return Inertia::render('Review/createReview');
    })->middleware(['auth', 'verified'])->name('createReview');
    Route::middleware('auth')->group(function () {
        Route::post('/addReview', [ReviewController::class, 'create']);
        // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    
    // user profile
    Route::middleware('auth')->group(function () {
        Route::get('/userProfile', [UserProfileController::class, 'getUserProfile'])->name('userProfile');
        Route::get('/createUserProfile', function () {
            return Inertia::render('UserProfile/createUserProfile');
        })->name('createUserProfile');
        Route::post('/addUserProfile', [UserProfileController::class, 'create']);
    
    // Edit & Update User Profile
        Route::get('/editUserProfile/{id}', [UserProfileController::class, 'edit'])->name('editUserProfile');
        Route::post('/updateUserProfile/{id}', [UserProfileController::class, 'update'])->name('updateUserProfile');
    });
    


// View all job vacancies
Route::get('/manageJobVacancies', [JobController::class, 'index'])->name('manageJobVacancies');

// View one job vacancy
Route::get('/JobVacancy/{id}', [JobController::class, 'show'])->name('JobVacancy.show');

// job vacancy routes
// Route::get('/createVacancy', function () {
//     //return Inertia::render('Job/createVacancy');
// })->middleware(['auth', 'verified'])->name('createVacancy');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/createVacancy', [JobController::class, 'createVacancy'])->name('createVacancy');
});

Route::middleware('auth')->group(function () {
    Route::post('/addVacancy', [JobController::class, 'create']);
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// View all users
Route::get('/manageUsers', [UserController::class, 'index'])->name('users.index');

// View one user
Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');

// Delete users
Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.destroy');

// POST route to handle view count increment requests
Route::post('/dashboard/increment-view-count', [JobController::class, 'incrementViewCount'])->name('JobVacancy.incrementViewCount');
// Route to delete a job vacancy by ID
Route::get('/deleteJobVacancy/{id}', [JobController::class, 'delete'])->name('JobVacancy.delete');

//search job title or company name
Route::get('/searchJobVacancies', [JobController::class, 'search'])->name('JobVacancy.search');

// Route to AboutUs page
Route::get('/about', function () {
    return Inertia::render('AboutUs/AboutUs');
})->middleware(['auth', 'verified'])->name('about');

// Route to my applied jobs
Route::middleware('auth')->group(function () {
    Route::get('/userDashboard/getApplications', [AppliedJobsController::class, 'getApplications']);
    Route::get('/AppliedJobs', [AppliedJobsController::class, 'viewAppliedVacancies'])->name('myApplications');
});

// Route to view one applied job
Route::get('/job-vacancy/{id}', [AppliedJobsController::class, 'show'])->name('jobVacancy.show');
// contact us route
Route::get('/contactus', function () {
    return Inertia::render('ContactUs/contactus');
    })->middleware(['auth', 'verified'])->name('contactus');
//administrator
// Route::get('/administrator', function () {
//     return Inertia::render('Admininistrator/Home');
// })->middleware(['auth', 'verified', 'IsAdmin'])->name('administrator');
Route::middleware(['auth', 'verified', 'IsAdmin'])->group(function () {
    Route::get('/administrator', [AdministratorUser::class, 'home'])->name('administrator');
});
Route::get('/administrator/users', function () {
    return Inertia::render('Admininistrator/Users');
})->middleware(['auth', 'verified'])->name('administrator');
Route::middleware('auth','verified')->group(function () {
    Route::get('/administrator/getUsers', [UserController::class, 'getUsers']);
    Route::put('/administrator/deleteUser/{id}', [UserController::class, 'deleteUser']);
});
Route::get('/administrator/promotions', function () {
    return Inertia::render('Admininistrator/Promotions');
})->middleware(['auth', 'verified'])->name('administrator');

Route::middleware('auth','verified')->group(function () {
    Route::get('/administrator/getPromotions', [PromotionController::class, 'getPromotions']);
    Route::put('/administrator/deletePromotion/{id}', [UserController::class, 'deleteUser']);
});

// Administrator routes for job vacancies
// Route to manage job vacancies
Route::get('/administrator/manageJobVacancies', function () {
    return Inertia::render('Admininistrator/JobVacancies');
})->middleware(['auth', 'verified'])->name('administrator');

// Route to get all job vacancies
Route::middleware('auth', 'verified')->group(function () {
    Route::get('/administrator/getJobVacancies', [JobController::class, 'getJobVacancies']);
// Route to delete a job vacancy
    Route::put('/administrator/deleteJobVacancy/{id}', [JobController::class, 'deleteJobVacancy']);
});
// Route to increment the view count for a job vacancy
Route::put('/administrator/incrementViewCountOfJob/{id}', [JobController::class, 'incrementViewCountOfJob']);

// Route to user applied jobs
Route::get('/applied-jobs', function () {
    return inertia('UserAppliedJobs/UserAppliedJobs');  
})->name('user.applied-jobs');


// logged-in users to view only their posted job vacancies
Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/myPostedJobs', [MyPostedJobsController::class, 'index'])->name('myPostedJobs');
    });

// Route to display a specific job vacancy by its ID
Route::get('/jobVacancies/{id}', [MyPostedJobsController::class, 'show'])->name('jobVacancies.show');

// Route to delete a specific job vacancy by its ID
Route::get('/deletejobVacancies/{id}', [MyPostedJobsController::class, 'delete'])->name('jobVacancies.delete');

// Route to display the edit form for a specific job vacancy by its ID
Route::get('/jobVacancies/{id}/edit', [MyPostedJobsController::class, 'edit'])->name('jobVacancies.edit');

// Route to handle the update request for a specific job vacancy by its ID
Route::post('/jobVacancies/{id}/update', [MyPostedJobsController::class, 'update'])->name('jobVacancies.update');

// delete promotion from the manage promotion list
Route::delete('/administrator/removePromotion/{id}', [PromotionController::class, 'destroy']);

// count job vacancies, applied users and companies
Route::get('/dashboard', [DashboardController::class, 'getDashboardStats'])
    ->withoutMiddleware(['auth', 'verified'])
    ->name('dashboard');
Route::get('/home', [DashboardController::class, 'getDashboardStats'])
    ->withoutMiddleware(['auth', 'verified'])
    ->name('home');
Route::get('/', [DashboardController::class, 'getDashboardStats'])
    ->withoutMiddleware(['auth', 'verified'])
    ->name('home');

// Route to search for job vacancies in the dashboard
Route::get('/search-vacancies', [JobController::class, 'searchVacancies']); 

// Click the review button in the dashboard then go to the review page
Route::get('/createReview/{job_id}', function ($job_id) {
    return Inertia::render('Review/createReview', [
        'job_id' => $job_id, // Pass job_id to the component
    ]);
})->middleware(['auth', 'verified'])->name('createReview');

Route::post('/addReview', [ReviewController::class, 'create']);
Route::get('/getReviews/{id}', [ReviewController::class, 'getReviewByid']);

// user dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/userDashboard', [UsereDashboardController::class, 'home'])->name('userDashboard');
});
// Route::get('/userDashboard', function () {
//     return Inertia::render('userDashboard/home');
// })->middleware(['auth', 'verified'])->name('userDashboard');

// Route to my posted jobs
Route::middleware('auth')->group(function () {
    Route::get('/userDashboard/getMyPostedJobs', [MyPostedJobsController::class, 'getMyPostedJobs'])->name('myPostedJobs');
});

// Route to display a specific job vacancy by its ID
Route::middleware('auth')->group(function () {
    Route::get('/userDashboard/jobVacancy/{id}', [MyPostedJobsController::class, 'show'])->name('jobVacancy.show');
});

// Route to display the edit form for a specific job vacancy by its ID
Route::middleware('auth')->group(function () {
    Route::get('/userDashboard/jobVacancy/{id}/edit', [MyPostedJobsController::class, 'edit'])->name('jobVacancy.edit');
    Route::put('/userDashboard/jobVacancy/{id}', [MyPostedJobsController::class, 'update'])->name('jobVacancy.update');
});

// Route to delete a specific job vacancy by its ID
Route::get('/userDashboard/jobVacancy/{id}/delete', [MyPostedJobsController::class, 'delete'])->name('jobVacancy.delete');

// Route to display all job applications for a specific job vacancy
Route::get('/userDashboard/jobVacancy/{id}/applications', [JobApplicationController::class, 'index'])
    ->middleware(['auth']);

// Route to update the status of a job application (approve or pending)
Route::post('/updateApplicationStatus', [JobApplicationController::class, 'updateStatus'])->name('applications.updateStatus');
// Send contatct us email
Route::post('/sendContactmessage', [ContactUsController::class, 'sendMail'])->name('contact-us.store');

// Route to add a note to a job application
Route::post('application/addNote', [JobApplicationController::class, 'addNote'])->name('application.addNote');

require __DIR__.'/auth.php';

