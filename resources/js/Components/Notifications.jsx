import React, { useState } from "react";
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
import { Switch } from "@headlessui/react";
import { BellRing, Check } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import { useProjectUpdate } from "./Utilities/ProjectsUpdateContext";

export default function Notifications() {
    const { notifications, notificationCount } = useProjectUpdate();
    const [notifList, setNotifList] = useState(notifications);
    const { data, put } = useForm({
        is_read: true,
    });

    console.log(notificationCount);

    const markAsRead = (id) => {
        setNotifList((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, is_read: true } : notif
            )
        );
        put(route("notification.update", id), {
            preserveScroll: true,
        });
    };

    const markAllAsRead = () => {
        setNotifList((prev) =>
            prev.map((notif) => ({ ...notif, is_read: true }))
        );
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
                            You have {notificationCount} unread messages.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center p-4 space-x-4 border rounded-md ">
                            <BellRing />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Push Notifications
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Send notifications to device.
                                </p>
                            </div>
                            <Switch />
                        </div>
                        <div>
                            {notifList.map((notification) => (
                                <div
                                    onClick={(e) => markAsRead(notification.id)}
                                    key={notification.id}
                                    className="mb-4 grid cursor-pointer grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                >
                                    {notification.is_read === 0 ? (
                                        <span className="flex w-2 h-2 translate-y-1 rounded-full bg-sky-500" />
                                    ) : (
                                        <span className="flex w-2 h-2 text-gray-500 translate-y-1 rounded-full" />
                                    )}
                                    <div className="flex justify-between">
                                        <p
                                            className={`text-sm font-medium leading-none ${
                                                notification.is_read === 0
                                                    ? ""
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {notification.message}
                                        </p>
                                        <p
                                            className={`text-sm text-muted-foreground  ${
                                                notification === 0 ? "" : ""
                                            }`}
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
