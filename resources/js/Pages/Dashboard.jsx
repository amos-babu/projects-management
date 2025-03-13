import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ statusCount }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="flex flex-wrap justify-center gap-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {Object.entries(statusCount).map(([status, count]) => (
                        <Card
                            className={`w-1/4 h-40 grow ${
                                status === "Pending"
                                    ? "bg-red-500"
                                    : status === "In Progress"
                                    ? "bg-yellow-500"
                                    : status === "Completed"
                                    ? "bg-green-500"
                                    : ""
                            }`}
                        >
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl text-white">
                                    {status}
                                </CardTitle>
                                <CardDescription className="text-xl text-white">
                                    {count}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
