<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
         // Fetch users with pagination
        $users = User::where('status', 1)->paginate(10); // 10 users per page
        return view('users.index', compact('users'));
    }

    public function getUsers(Request $request){
        $users = User::where('status', 1)->paginate(10); // 10 users per page
        return Response::json($users);
    }


    public function deleteUser(Request $request){
        $user = User::find($request->id);
        $user->status = 9;
        $user->save();
        return Response::json($user);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): View
    {
        $user = User::with('profile')->find($id);
        return view('users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): View
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
{
    // Find the user
    $user = User::findOrFail($id);

    // Update the status to 9 (inactive/deleted)
    $user->status = 9;
    $user->save();

    // Redirect back with a success message
    return redirect()->route('users.index')->with('flash_message', 'User deleted successfully!');
}
}
