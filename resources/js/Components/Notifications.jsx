import React, { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BellRing, Check } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useProjectUpdate } from "./Utilities/ProjectsUpdateContext";

export default function Notifications() {
    const { notifications, notificationCount } = useProjectUpdate();
    const [readUnreadNotifications, setReadUnreadNotifications] =
        useState(notifications);
    const [readNotificationCount, setReadNotificationCount] =
        useState(notificationCount);
    const { data, put } = useForm({
        is_read: true,
    });

    useEffect(() => {
        setReadUnreadNotifications(notifications);
    }, [notifications]);

    useEffect(() => {
        setReadNotificationCount(notificationCount);
    }, [notificationCount]);

    const unreadNotifications = readUnreadNotifications.filter(
        (notification) => notification.is_read == false
    );

    const markAsRead = (id) => {
        setReadUnreadNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, is_read: true } : notif
            )
        );
        setReadNotificationCount(
            readNotificationCount > 0
                ? readNotificationCount - 1
                : readNotificationCount
        );
        put(route("notification.update", id), {
            preserveScroll: true,
        });
    };

    const markAllAsRead = () => {
        setReadUnreadNotifications((prev) =>
            prev.map((notif) => ({ ...notif, is_read: true }))
        );

        setReadNotificationCount(readNotificationCount > 0 ? 0 : 0);
        put(route("notification.markAllAsRead"), {
            preserveScroll: true,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <BellRing className="w-5 h-5 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className={cn("w-[380px]")}>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                            You have {readNotificationCount} unread messages.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            {unreadNotifications.map((notification) => (
                                <div
                                    onClick={(e) => markAsRead(notification.id)}
                                    key={notification.id}
                                    className="mb-4 grid cursor-pointer grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                >
                                    <span className="flex w-2 h-2 translate-y-1 rounded-full bg-sky-500" />
                                    <div className="flex justify-between">
                                        <p
                                            className={`text-sm font-medium leading-none`}
                                        >
                                            {notification.message}
                                        </p>
                                        <p
                                            className={`text-sm text-muted-foreground`}
                                        >
                                            {notification.created_at}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={markAllAsRead} className="w-full">
                            <Check /> Mark all as read
                        </Button>
                    </CardFooter>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
