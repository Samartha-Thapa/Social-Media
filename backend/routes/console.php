<?php

use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    $deleteCount = User::whereNull('email_verified_at')
        ->where('create_at', '<', now()->subHours(24))
        ->delete();
        
    logger("Cleaned up {$deleteCount} unverified accounts.");
})->daily();