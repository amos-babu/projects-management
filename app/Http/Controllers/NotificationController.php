<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function markAsRead(Request $request, $id)
    {
        $request->validate([
            'is_read' => ['required','boolean'],
        ]);

        $notification = Notification::findOrFail($id);

        $notification->update($request->only('is_read'));
    }
}
