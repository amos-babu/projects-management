<?php

namespace App\Http\Middleware;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $notifications = Notification::forUser(Auth::id())->latest()->get();
        $notificationsCount = Notification::forUser(Auth::id())->where('is_read', false)->count();
        $notifications = $notifications->map(function($notification) {
            return [
                'id' => $notification->id,
                'message' => $notification->message,
                'type' => $notification->type,
                'is_read' => $notification->is_read,
                'created_at' => $notification->created_at->diffForHumans(),
            ];
        });

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],

            'flash' => [
                'success' => fn() => $request->session()->get('success')
            ],

            'notifications' => Auth::check()
                ? $notifications
                : [],

            'notificationCount' => Auth::check()
                ? $notificationsCount
                : null,

        ];
    }
}
