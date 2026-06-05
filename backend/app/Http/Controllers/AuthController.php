<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){

        $code = random_int(100000, 999999);
        $username = Str::slug($request->name) . rand(1000, 9999);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $username,
            'password' => Hash::make($request->password),
            'verification_code' => $code,
            'verification_expires_at' => now()->addMinutes(15),
        ]);

        Mail::to($user->email)->send(new \App\Mail\VerifyCodeMail($code));

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully!',
            'user' => $user,
        ], 201);
    }

    public function verifyCode(Request $request) {
        $request->validate([
            'email' => 'required|email|max:255',
            'code' => 'required|numeric',
        ]);
        $user = User::where('email', $request->email)->first();

        if(!$user) {
            return response([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        if(!$user->verification_code) {
            return response()->json([
                'success' => false,
                'message' => 'No verification code found',
            ], 400);
        }

        if(now()->gt($user->verification_expires_at)) {
            return response()->json([
                'success' => false,
                'message' => 'Verification code has expired',
            ], 400);
        }

        if($user->verification_code !== $request->code) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification code',
            ], 400);
        }

        $user->update([
            'email_verified_at' => now(),
            'verification_code' => null,
            'verification_expires_at' => null,
        ]);
        
        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'user' => $user,
        ]);
    }

    public function login(LoginRequest $request){

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Credentials',
            ], 401);
        }

        if(!$user->email_verified_at) {
            return response()->json([
                'success' => false,
                'message' => 'Please Verfiy your email first',
            ], 403);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'user' => $user
        ]);
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function me(Request $request) {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}
