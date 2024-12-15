<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\user_profile;

class EnsureProfileIsCreated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // auth()->id()
        $profile = user_profile::where('user_id', '=', auth()->id())->where('status', '=', 1);

        if ($profile->exists()) {
            return $next($request);
        }
        $ErrorResponse = [
            'success' => false,
            'message' =>'Invalid Token',
        ];
        abort(response()->json($ErrorResponse, 403));
    }
}
