import { router } from "@inertiajs/react";
import { toast } from "sonner";

import { createContext, useContext, useEffect, useState } from "react";

const ProjectUpdateContext = createContext();
export const useProjectUpdate = () => useContext(ProjectUpdateContext);

export const ProjectUpdateProvider = ({ children, auth }) => {
    const [notifications, setNotifications] = useState([]);
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
                setNotifications((prev) => [...prev, event]);
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
                console.log(event);
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
