@extends('myPostedJobs.layout')  <!-- Extending the layout -->
@section('content')  <!-- Injecting content into the layout -->
<div class="container my-5">
    <div class="card shadow-lg">  <!-- Card container with shadow -->
        <div class="card-header bg-success text-white text-uppercase">  <!-- Header with background and uppercase styling -->
            <h4>View Job Vacancy</h4>
        </div>
        <div class="card-body">
            <!-- Display the company logo at the top -->
            <div class="text-center mb-4">
                <img src="{{ asset('files/' . $jobVacancies->company_logo) }}" alt="Company Logo" class="img-fluid" style="max-width: 200px;">
            </div>
            <form>
                 <!-- Job Title -->
                <div class="form-group mb-4">
                    <label for="jobTitle" class="form-label"><strong>Job Title:</strong></label> 
                    <input type="text" id="jobTitle" class="form-control" value="{{ $jobVacancies->title }}" readonly>
                </div>
                 <!-- Company Name -->
                <div class="form-group mb-4">
                    <label for="companyName" class="form-label"><strong>Company Name:</strong></label>  
                    <input type="text" id="companyName" class="form-control" value="{{ $jobVacancies->company_name }}" readonly>
                </div>
                <!-- Location -->
                <div class="form-group mb-4">
                    <label for="location" class="form-label"><strong>Location:</strong></label>  
                    <input type="text" id="location" class="form-control" value="{{ $jobVacancies->location }}" readonly>
                </div>
                <!-- Job Description -->
                <div class="form-group mb-4">
                    <label for="description" class="form-label"><strong>Description:</strong></label>   
                    <textarea id="description" class="form-control" rows="4" readonly>{{ $jobVacancies->description }}</textarea>
                </div>
                <!-- Requirements -->
                <div class="form-group mb-4">
                    <label for="requirement" class="form-label"><strong>Requirement:</strong></label>
                    <textarea id="requirement" class="form-control" rows="4" readonly>{{ $jobVacancies->requirement }}</textarea>
                </div>
                 <!-- Closing Date -->
                <div class="form-group mb-4">
                    <label for="closingDate" class="form-label"><strong>Closing Date:</strong></label>
                    <input type="text" id="closingDate" class="form-control" value="{{ $jobVacancies->closing_date }}" readonly>
                </div>
                <!-- Contact Email -->
                <div class="form-group mb-4">
                    <label for="contactEmail" class="form-label"><strong>Contact Email:</strong></label>
                    <input type="email" id="contactEmail" class="form-control" value="{{ $jobVacancies->contact_email }}" readonly>
                </div>
                <!-- Contact Phone -->
                <div class="form-group mb-4">
                    <label for="contactPhone" class="form-label"><strong>Contact Phone:</strong></label>
                    <input type="text" id="contactPhone" class="form-control" value="{{ $jobVacancies->contact_phone }}" readonly>
                </div>
                <!-- Address -->
                <div class="form-group mb-4">
                    <label for="address" class="form-label"><strong>Address:</strong></label>
                    <input type="text" id="address" class="form-control" value="{{ $jobVacancies->address }}" readonly>
                </div>
                 <!-- Display Banner -->
                <div class="text-center mb-4">
                    <img src="{{ asset('files/' . $jobVacancies->files) }}" alt="Company Logo" class="img-fluid" style="max-width: 1000px;">
                 </div>
                 <!-- Back Button -->
                <div class="text-center mt-4">
                    <a href="{{ url('/myPostedJobs') }}" class="btn btn-secondary">
                        <i class="fa fa-arrow-left"></i> Back
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
