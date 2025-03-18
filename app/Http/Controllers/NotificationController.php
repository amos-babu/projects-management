<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function getAllNotifications()
    {
        $notifications = Notification::where('user_id', Auth::id())->get();
        // return Inertia::render('Layouts/AuthenticatedLayout')
    }
}
