@extends('myPostedJobs.layout')  <!-- Extending the layout -->
@section('content')
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow-lg border-0">
                <div class="card-header bg-success text-white text-uppercase"> 
                    <h5>My Posted Job Vacancies</h5>
                </div>
    <div class="card-body p-8">
        <table class="table table-hover align-middle table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Company Logo</th>
                    <th scope="col">Company</th>
                    <th scope="col">Title</th>
                    <th scope="col">Location</th>
                    <th scope="col">Closing Date</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($jobVacancies as $job)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>
                            <img src="{{ asset('files/' . $job->company_logo) }}" alt="Company Logo" width="100">
                    </td>
                    <td>{{ $job->company_name }}</td>
                    <td>{{ $job->title }}</td>
                    <td>{{ $job->location }}</td>
                    <td>{{ $job->closing_date }}</td>
                    <td>
                        <div class="justify-content-center gap-2">
                            <a href="{{ route('jobVacancies.show', $job->id) }}" class="btn btn-sm btn-primary">
                                <i class="fa fa-eye fa-fw"></i>View</a>

                            <a href="{{ route('jobVacancies.edit', $job->id) }}" class="btn btn-sm btn-warning">
                                <i class="fa fa-pencil fa-fw"></i>Edit</a>

                            <form action="{{ route('jobVacancies.delete', $job->id) }}" method="GET" style="display:inline-block;">
                                @csrf
                                <button type="submit" class="btn btn-sm btn-danger"
                                    onclick="return confirm('Are you sure you want to delete this job?');">
                                    <i class="fa fa-trash"></i> Delete
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="text-center">No job vacancies posted yet.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
    <div>
        {{ $jobVacancies->links() }} <!-- Pagination links for job vacancies -->
    </div>
        </div>
    </div>
</div>
@endsection
