import { router } from "@inertiajs/react";
import { toast } from "sonner";

import { createContext, useContext, useEffect, useState } from "react";

const ProjectUpdateContext = createContext();

export const ProjectUpdateProvider = ({
    children,
    auth,
    initialProjects = [],
    initialTasks = [],
    notifications: initialNotifications,
    notificationCount,
}) => {
    const [realtimeProjects, setRealtimeProjects] = useState(initialProjects);
    const [realtimeTasks, setRealtimeTasks] = useState(initialTasks);
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
                setRealtimeProjects((prev) => {
                    const exists = prev.find((p) => p.id === event.project.id);
                    if (exists) {
                        return prev.map((p) =>
                            p.id === event.project.id ? project : p
                        );
                    } else {
                        return [...prev, event.project];
                    }
                });

                setNotifications((prev) => [event.notification, ...prev]);

                toast.info(message, {
                    action: {
                        label: "View Project",
                        onClick: () => {
                            router.visit(
                                route("projects.show", event.project.id)
                            );
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
                const message = "A project was deleted";
                toast.success(message);

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

                setRealtimeTasks((prev) => {
                    const exists = prev.find((p) => p.id === event.task.id);
                    if (exists) {
                        return prev.map((p) =>
                            p.id === event.task.id ? task : p
                        );
                    } else {
                        return [...prev, event.task];
                    }
                });

                setNotifications((prev) => [event.notification, ...prev]);

                toast.info(message, {
                    action: {
                        label: "View Task",
                        onClick: () => {
                            router.visit(route("tasks.show", event.task.id));
                        },
                    },
                });
            }
        );

        return () => {
            window.Echo.leaveChannel(`task.${auth.user.id}`);
        };
    }, [auth?.user?.id]);

    useEffect(() => {
        if (!auth?.user?.id) return;

        window.Echo.private(`task_deleted.${auth.user.id}`).listen(
            "TaskDeleted",
            (event) => {
                const message = "A task was deleted";
                toast.success(message);

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

                console.log(event);
            }
        );

        return () => {
            window.Echo.leaveChannel(`task_deleted.${auth.user.id}`);
        };
    }, [auth?.user?.id]);

    return (
        <ProjectUpdateContext.Provider
            value={{
                notifications,
                notificationCount,
                realtimeProjects,
                realtimeTasks,
            }}
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
