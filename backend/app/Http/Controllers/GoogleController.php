<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Socialite;
use Illuminate\Support\Str;
use Throwable;

class GoogleController extends Controller
{
    public function redirectToGoogle(Request $request) {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request) {
        try {

            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::updateOrCreate(
                ['email' => $googleUser->email],
                [
                    'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'email_verified_at' => now(),
                    'password' => Hash::make(Str::random(32)),
                ]
            );
                $token = $user->createToken('authToken')->plainTextToken;
                
                return redirect('http://localhost:3000/dashboard')
                        ->cookie(
                            'auth_token',
                            $token,
                            60*24*30,
                            '/',
                            null,
                            false,
                            true,
                        );
            } catch (Throwable $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Google authentication failed: '. $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ], 500);
            }
        }
    }

