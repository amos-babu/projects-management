import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ProjectUpdateProvider } from "./Components/Utilities/ProjectsUpdateContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const { auth } = props.initialPage.props;
        const { notifications } = props.initialPage.props;
        const { notificationCount } = props.initialPage.props;

        root.render(
            <ProjectUpdateProvider
                auth={auth}
                notificationCount={notificationCount}
                notifications={notifications}
            >
                <App {...props} />
            </ProjectUpdateProvider>
        );
    },
    progress: {
        color: "#1c4bcf",
    },
});
