@extends('AppliedJobs.layout')  <!-- Extending the main layout -->

@section('content')  <!-- Injecting content into the layout -->
    <div class="container my-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow-lg">
                    <div class="card-header bg-success text-white text-uppercase">
                        <h5>My Applied Job Vacancies</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr class="table-info">
                                        <th>#</th>
                                        <th>Company Logo</th>
                                        <th>Job Title</th>
                                        <th>Company Name</th>
                                        <th>Location</th>
                                        <th>Application Status</th>
                                        <th>Action</th>  <!-- Add a column for actions -->
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($applications as $application)
                                        <tr>
                                            <td>{{ $loop->iteration }}</td>
                                            <td>
                                                <img src="{{ asset('files/' . $application->job_vacancy->company_logo) }}" alt="Company Logo" width="100">
                                            </td>
                                            <td>{{ $application->job_vacancy->title }}</td>
                                            <td>{{ $application->job_vacancy->company_name }}</td>
                                            <td>{{ $application->job_vacancy->location }}</td>
                                            <td>{{ $application->is_approved ? 'Approved' : 'Pending' }}</td>
                                            <td>
                                                <!-- Add a "View" button with an icon to see full job details -->
                                                <a href="{{ route('jobVacancy.show', $application->job_vacancy->id) }}" class="btn btn-primary">
                                                    <i class="fa fa-eye"></i> View
                                                </a>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="7" class="text-center">You have not applied to any job vacancies yet.</td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                        <!-- Pagination links if needed -->
                        <div>
                            {{ $applications->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
