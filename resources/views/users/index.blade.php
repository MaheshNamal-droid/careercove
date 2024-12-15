@extends('users.layout')  <!-- Extending the layout -->
@section('content')  <!-- Injecting content into the layout -->
    <div class="container my-5">
        <div class="row">
            <div class="col-md-12">
                <!-- Flash message for success -->
                @if (session('flash_message'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ session('flash_message') }}  <!-- Display the success message -->
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif

                <div class="card shadow-lg">  <!-- Card to display users -->
                    <div class="card-header bg-success text-white text-uppercase">  <!-- Card header with title -->
                        <h5>Manage Users</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive"> <!-- Responsive table to display users -->
                            <table class="table table-striped">
                                <thead>
                                    <tr class="table-info">
                                        <!-- Table headers for user details -->
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Loop through the $users collection -->
                                    @foreach($users as $item)
                                    <tr>
                                        <td>{{ $loop->iteration + $users->firstItem() - 1 }}</td> <!-- Serial number -->
                                        <td>{{ $item->name }}</td> <!-- Display user name -->
                                        <td>{{ $item->email }}</td> <!-- Display user email -->

                                        <!-- Action buttons for viewing and updating user status -->
                                        <td>
                                            <!-- View button: Link to view the user details -->
                                            <a href="{{ url('/user/' . $item->id) }}" title="View User">
                                                <button class="btn btn-primary">
                                                    <i class="fa fa-eye"></i> View
                                                </button>
                                            </a>
                                            <!-- Delete button: Form to submit a DELETE request to delete the user -->
                                            <form method="POST" action="{{ route('user.destroy', $item->id) }}" accept-charset="UTF-8" style="display:inline">
                                                {{ method_field('DELETE') }}
                                                {{ csrf_field() }}
                                                <!-- Submit button for the delete action -->
                                                <button type="submit" class="btn btn-danger" title="Delete User" onclick="return confirm('Confirm delete?')">
                                                    <i class="fa fa-trash"></i> Delete
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                        <!-- Pagination links -->
                        <div class="d-flex justify-content-center">
                            {{ $users->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
