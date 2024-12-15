<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdministratorUser;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AppliedJobsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// admin routes
Route::get('/administrator', function () {
    return Inertia::render('Admin/Home');
})->middleware(['auth', 'verified'])->name('administrator');
Route::get('/administrator/users', function () {
    return Inertia::render('Admin/Users');
})->middleware(['auth', 'verified'])->name('administrator');
// dashboard routes
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/initiateScroll', [JobController::class, 'initiateScroll']);
});
Route::middleware('auth')->group(function () {
    Route::get('/dashboard/{id}', [JobController::class, 'getVacancy']);
});
Route::get('/viewVacancy', function () {
    return Inertia::render('Job/viewVacancy');
})->middleware(['auth', 'verified'])->name('viewVacancy');

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
Route::middleware('auth')->group(function () {
    Route::post('/addPromotion', [PromotionController::class, 'create']);
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// review route
Route::get('/createReview', function () {
    return Inertia::render('Review/createReview');
    })->middleware(['auth', 'verified'])->name('createReview');
    Route::middleware('auth')->group(function () {
        Route::post('/addReview', [ReviewController::class, 'create']);
        // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // user_profile route
Route::get('/createUserProfile', function () {
    return Inertia::render('UserProfile/createUserProfile');
    })->middleware(['auth', 'verified'])->name('createUserProfile');
    Route::middleware('auth')->group(function () {
        Route::post('/addUserProfile', [UserProfileController::class, 'create']);
        // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

// View all job vacancies
Route::get('/manageJobVacancies', [JobController::class, 'index'])->name('manageJobVacancies');

// View one job vacancy
Route::get('/JobVacancy/{id}', [JobController::class, 'show'])->name('JobVacancy.show');

// job vacancy routes
Route::get('/createVacancy', function () {
    return Inertia::render('Job/createVacancy');
})->middleware(['auth', 'verified'])->name('createVacancy');

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
    Route::get('/AppliedJobs', [AppliedJobsController::class, 'viewAppliedVacancies'])->name('myApplications');
});

// Route to view one applied job
Route::get('/job-vacancy/{id}', [AppliedJobsController::class, 'show'])->name('jobVacancy.show');

require __DIR__.'/auth.php';

