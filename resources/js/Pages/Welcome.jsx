import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center h-screen gap-3 bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div>
                    <div className="mb-5">
                        <img
                            src={`${
                                import.meta.env.BASE_URL
                            }favicon/android-chrome-192x192.png`}
                            alt="Logo"
                            className="w-20 h-20"
                        />
                    </div>
                    <div>
                        {auth.user ? (
                            <Button>
                                <Link href={route("dashboard")}>Dashboard</Link>
                            </Button>
                        ) : (
                            <Button>
                                <Link href={route("register")}>
                                    Get Started
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
