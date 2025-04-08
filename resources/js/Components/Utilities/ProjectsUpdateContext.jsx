import { router } from "@inertiajs/react";
import { toast } from "sonner";

import { createContext, useContext, useEffect, useState } from "react";

const ProjectUpdateContext = createContext();

export const ProjectUpdateProvider = ({
    children,
    auth,
    notifications: initialNotifications,
    notificationCount,
}) => {
    const [notifications, setNotifications] = useState(
        initialNotifications || []
    );

    useEffect(() => {
        if (!auth?.user?.id) return;
        window.Echo.private(`projects.${auth.user.id}`).listen(
            "ProjectCreatedOrUpdated",
            (event) => {
                const message =
                    event.actionType === "created"
                        ? "New Project Added"
                        : "Project Updated";
                setNotifications((prev) => {
                    if (
                        prev.some(
                            (n) =>
                                Number(n.id) === Number(event.notification.id)
                        )
                    ) {
                        return prev;
                    }
                    return [...prev, event.notification];
                });
                toast.info(message, {
                    action: {
                        label: "View Project",
                        onClick: () => {
                            router.visit(route("projects.show", event.id));
                        },
                    },
                });
            }
        );

        return () => {
            window.Echo.leaveChannel(`projects.${auth.user.id}`);
        };
    }, [auth?.user?.id]);

    useEffect(() => {
        if (!auth?.user?.id) return;

        window.Echo.private(`project_delete.${auth.user.id}`).listen(
            "ProjectDeleted",
            (event) => {
                const message = "Project Deleted Successfully";
                toast.success(message);
            }
        );

        return () => {
            window.Echo.leaveChannel(`project_delete.${auth.user.id}`);
        };
    }, [auth?.user?.id]);

    useEffect(() => {
        if (!auth?.user?.id) return;

        window.Echo.private(`task.${auth.user.id}`).listen(
            "TaskCreatedOrUpdated",
            (event) => {
                const message =
                    event.actionType === "created"
                        ? "New Task Added"
                        : "Task Updated";

                toast.info(message, {
                    action: {
                        label: "View Task",
                        onClick: () => {
                            router.visit(route("tasks.show", event.id));
                        },
                    },
                });
                console.log(event);
            }
        );

        return () => {
            window.Echo.leaveChannel(`task.${auth.user.id}`);
        };
    }, [auth?.user?.id]);

    return (
        <ProjectUpdateContext.Provider
            value={{ notifications, notificationCount }}
        >
            {children}
        </ProjectUpdateContext.Provider>
    );
};

export const useProjectUpdate = () => {
    const context = useContext(ProjectUpdateContext);

    if (!context) {
        throw new Error(
            "useProjectUpdate must be used within a ProjectUpdateProvider"
        );
    }
    return context;
};
