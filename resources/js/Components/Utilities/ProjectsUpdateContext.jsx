import { router, usePage } from "@inertiajs/react";
import { toast } from "sonner";

import { createContext, useContext, useEffect, useState } from "react";

const ProjectUpdateContext = createContext();

export const ProjectUpdateProvider = ({
    children,
    auth,
    notifications: initialNotifications,
}) => {
    const [notifications, setNotifications] = useState(
        initialNotifications || []
    );
    useEffect(() => {
        setNotifications(initialNotifications);
    }, [initialNotifications]);
    useEffect(() => {
        if (!auth.user || !auth.user.id) return;
        window.Echo.private(`projects.${auth.user.id}`).listen(
            "ProjectCreated",
            (event) => {
                const message =
                    event.actionType === "created"
                        ? "New Project Added"
                        : event.actionType === "updated"
                        ? "Project Updated"
                        : "Project Deleted";
                // setNotifications((prev) => [...prev, event]);
                toast.info(message, {
                    action:
                        event.actionType !== "deleted"
                            ? {
                                  label: "View Project",
                                  onClick: () => {
                                      router.visit(
                                          route("projects.show", event.id)
                                      );
                                  },
                              }
                            : undefined,
                });
            }
        );

        return () => {
            window.Echo.leaveChannel(`projects.${auth.user.id}`);
        };
    }, []);

    return (
        <ProjectUpdateContext.Provider value={{ notifications }}>
            {children}
        </ProjectUpdateContext.Provider>
    );
};

export const useProjectUpdate = () => {
    const context = useContext(ProjectUpdateContext);

    if (!context) {
        throw new Error(
            "useNotifications must be used within a NotificationProvider"
        );
    }
    return context;
};
