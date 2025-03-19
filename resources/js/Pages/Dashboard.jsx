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
                <div className="grid flex-wrap justify-center grid-cols-3 gap-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {Object.entries(statusCount).map(([status, count]) => (
                        <Card
                            key={status}
                            className={`h-40 ${
                                status === "Pending"
                                    ? "bg-red-600"
                                    : status === "In Progress"
                                    ? "bg-yellow-600"
                                    : status === "Completed"
                                    ? "bg-green-600"
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
