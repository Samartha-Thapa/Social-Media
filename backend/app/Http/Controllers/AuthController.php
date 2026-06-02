<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){

        $code = random_int(100000, 999999);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_code' => $code,
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

        if(!$user->verfication_code !== $request->code){
            return response([
                'success' => false,
                'message' => 'Invalid verification code',
            ], 400);
        }

        $user->email_verified_at = now();
        $user->verification_code = null;
        $user->save();

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => $user
        ])->cookie(
            'auth_token',
            $token,
            60*24*30,
            '/',
            null,
            false,
            true
        );
    }

    public function login(Request $request){
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'max:255', 'min:8'],
        ]);
    }

    public function logout(Request $request){
        $validated = $request->validate([]);
    }

    public function me(Request $request) {
        return response()->json([
            'user' => $request->user()
        ]);
    }
}
