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
            "ProjectCreated",
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
                    console.log([...prev, event.notification]);
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
