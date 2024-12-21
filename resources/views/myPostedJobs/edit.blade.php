@extends('myPostedJobs.layout') 
@section('content')
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow-lg border-0">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0">Edit Job Vacancy</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('jobVacancies.update', $jobVacancy->id) }}" method="POST">
                        @csrf <!-- CSRF token for security -->

                        <!-- Job Title input -->
                        <div class="form-group mb-3">
                            <label for="title">Job Title</label>
                            <input type="text" name="title" id="title" class="form-control" value="{{ $jobVacancy->title }}" required>
                        </div>

                         <!-- Job Description input -->
                        <div class="form-group mb-3">
                            <label for="description">Job Description</label>
                            <textarea name="description" id="description" rows="4" class="form-control" required>{{ $jobVacancy->description }}</textarea>
                        </div>

                         <!-- Job Requirements input -->
                        <div class="form-group mb-3">
                            <label for="requirement">Job Requirements</label>
                            <textarea name="requirement" id="requirement" rows="4" class="form-control" required>{{ $jobVacancy->requirement }}</textarea>
                        </div>

                        <!-- Location input -->
                        <div class="form-group mb-3">
                            <label for="location">Location</label>
                            <input type="text" name="location" id="location" class="form-control" value="{{ $jobVacancy->location }}" required>
                        </div>

                          <!-- Closing Date input -->
                        <div class="form-group mb-3">
                            <label for="closing_date">Closing Date</label>
                            <input type="date" name="closing_date" id="closing_date" class="form-control" value="{{ $jobVacancy->closing_date }}" required>
                        </div>

                        <!-- Company Name input -->
                        <div class="form-group mb-3">
                            <label for="company_name">Company Name</label>
                            <input type="text" name="company_name" id="company_name" class="form-control" value="{{ $jobVacancy->company_name }}" required>
                        </div>

                        <!-- Contact Phone input -->
                        <div class="form-group mb-3">
                            <label for="contact_phone">Contact Phone</label>
                            <input type="text" name="contact_phone" id="contact_phone" class="form-control" value="{{ $jobVacancy->contact_phone }}">
                        </div>

                        <!-- Contact Email input -->
                        <div class="form-group mb-3">
                            <label for="contact_email">Contact Email</label>
                            <input type="email" name="contact_email" id="contact_email" class="form-control" value="{{ $jobVacancy->contact_email }}">
                        </div>

                         <!-- Address input -->
                        <div class="form-group mb-3">
                            <label for="address">Address</label>
                            <input type="text" name="address" id="address" class="form-control" value="{{ $jobVacancy->address }}">
                        </div>

                         <!-- Submit and Cancel buttons -->
                         <div class="justify-content-between">
                            <button type="submit" class="btn btn-primary btn-md px-2">Update</button>
                            <a href="{{ route('myPostedJobs') }}" class="btn btn-warning">Cancel</a>
                         </div>
                            
                    </form>
                </div>
                <div class="card-footer text-center bg-light">
                    <a href="{{ url('/myPostedJobs') }}" class="btn btn-secondary">
                        <i class="fa fa-arrow-left"></i> Back
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
