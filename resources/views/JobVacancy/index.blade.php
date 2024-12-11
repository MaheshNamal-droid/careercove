@extends('JobVacancy.layout')  <!-- Extending the layout -->
@section('content')  <!-- Injecting content into the layout -->
    <div class="container my-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow-lg">  <!-- Card to display job vacancies -->
                    <div class="card-header bg-success text-white text-uppercase">  <!-- Card header with title -->
                        <h5>Manage Job Vacancies</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">    <!-- Responsive table to display job vacancies -->
                            <table class="table table-striped">
                                <thead>
                                    <tr class="table-info">
                                        <!-- Table headers for vacancy details -->
                                        <th>#</th>
                                        <th>Company Logo</th>
                                        <th>Job Title</th>
                                        <th>Company Name</th>
                                        <th>Location</th>
                                        <th>View Count</th> <!-- New column for view count -->
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <!-- Loop through the $JobVacancy collection -->
                                    @foreach($JobVacancy as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>  <!-- Serial number -->
                                         <!-- Display company logo -->
                                        <td>
                                            <img src="{{ asset('files/' . $item->company_logo) }}" alt="Company Logo" width="100">
                                        </td>
                                        <td>{{ $item->title }}</td>   <!-- Display job title -->
                                        <td>{{ $item->company_name }}</td>   <!-- Display company name -->
                                        <td>{{ $item->location }}</td>   <!-- Display job location -->
                                        <td>{{ $item->view_count }}</td>   <!-- Display job view count -->
                                         <!-- Action button to view job vacancy -->
                                        <td>
                                            <a href="{{ url('/JobVacancy/' . $item->id) }}" title="View Job Vacancy">
                                            <button class="btn btn-primary">
                                            <i class="fa fa-eye"></i> View</button>
                                            </a>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
