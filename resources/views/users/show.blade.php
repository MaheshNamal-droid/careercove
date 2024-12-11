@extends('users.layout')

@section('content')
<div class="container my-5">
    <div class="card shadow-lg">
        <div class="card-header bg-success text-white text-uppercase">
            <h4>View User Profile</h4>
        </div>
        <div class="card-body">
            <!-- Profile Picture -->
       <div class="text-center mb-4">
        @if ($user->profile && $user->profile->profile_picture)
          <img src="{{ asset('files/' . $user->profile->profile_picture) }}" 
             alt="Profile Picture" 
             class="img-fluid rounded-circle shadow-sm" 
             style="max-width: 150px; height: 150px; object-fit: cover;">
        @else
          <p>Profile Picture Not Provided</p>
        @endif
       </div>

            <!-- Profile Information -->
            <!-- Full Name -->
            <div class="form-group mb-4">
                <label><strong>Full Name:</strong></label>
                <input type="text" class="form-control" value="{{ $user->name }}" readonly>
            </div>
            <!-- Email -->
            <div class="form-group mb-4">
                <label><strong>Email:</strong></label>
                <input type="email" class="form-control" value="{{ $user->email }}" readonly>
            </div>
            <!-- First Name -->
            <div class="form-group mb-4">
                <label><strong>First Name:</strong></label>
                <input type="text" class="form-control" value="{{ $user->profile ? $user->profile->first_name : 'Not provided' }}" readonly>
            </div>
            <!-- Last Name -->
            <div class="form-group mb-4">
                <label><strong>Last Name:</strong></label>
                <input type="text" class="form-control" value="{{ $user->profile ? $user->profile->last_name : 'Not provided' }}" readonly>
            </div>
            <!-- Address -->
            <div class="form-group mb-4">
                <label><strong>Address:</strong></label>
                <input type="text" class="form-control" value="{{ $user->profile ? $user->profile->address : 'Not provided' }}" readonly>
            </div>
            <!-- Phone Number -->
            <div class="form-group mb-4">
                <label><strong>Phone Number:</strong></label>
                <input type="text" class="form-control" value="{{ $user->profile ? $user->profile->contact_phone : 'Not provided' }}" readonly>
            </div>

            <!-- Social Media -->
            <div class="form-group mb-4">
                <label><strong>Social Media:</strong></label>
                @if ($user->profile && $user->profile->social_media)
                    <a href="{{ $user->profile->social_media }}" target="_blank" class="form-control text-primary" style="border: none; background: none;">
                        {{ $user->profile->social_media }}
                    </a>
                @else
                    <input type="text" class="form-control" value="Not provided" readonly>
                @endif
            </div>

            <!-- Resume -->
            <div class="form-group mb-4">
                <label><strong>Resume:</strong></label>
                @if ($user->profile && $user->profile->resume)
                    <a href="{{ asset('files/' . $user->profile->resume) }}" class="btn btn-link" download>Download Resume</a>
                @else
                    <input type="text" class="form-control" value="Not uploaded" readonly>
                @endif
            </div>

            <!-- Description -->
            <div class="form-group mb-4">
                <label><strong>Description:</strong></label>
                <textarea class="form-control" rows="4" readonly>{{ $user->profile ? $user->profile->description : 'Not provided' }}</textarea>
            </div>

            <!-- Back Button -->
            <div class="text-center mt-4">
                <a href="{{ url('/manageUsers') }}" class="btn btn-secondary">
                    <i class="fa fa-arrow-left"></i> Back
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
