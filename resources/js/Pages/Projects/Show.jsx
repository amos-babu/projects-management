import { Badge } from "@/Components/ui/badge";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ project }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Show Project
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-wrap mb-4 gap-7">
                                <div className="mb-4 text-xl font-bold">
                                    {project.data.name}
                                </div>
                                <div className="mb-4 text-xl font-bold">
                                    <Badge
                                        className={`${
                                            project.data.status ===
                                            "In Progress"
                                                ? "bg-yellow-500"
                                                : project.data.status ===
                                                  "Pending"
                                                ? "bg-red-500"
                                                : project.data.status ===
                                                  "Completed"
                                                ? "bg-green-500"
                                                : ""
                                        }`}
                                    >
                                        {project.data.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="mb-5 font-medium">
                                {project.data.description}
                            </div>

                            <div className="font-medium ">
                                <span>Project Assigned By:</span>
                                {project.data.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
