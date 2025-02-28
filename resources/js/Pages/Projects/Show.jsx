import PrimaryButton from "@/Components/PrimaryButton";
import { Badge } from "@/Components/ui/badge";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Index from "../Tasks/Index";
import SuccessMessageDisplay from "@/Components/SuccessMessageDisplay";

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
                <SuccessMessageDisplay />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-wrap justify-between mb-4 gap-7">
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
                                <div>
                                    <div className="flex gap-3">
                                        <PrimaryButton className="mb-4">
                                            <Link href={route("tasks.create")}>
                                                Create Task
                                            </Link>
                                        </PrimaryButton>
                                        <PrimaryButton className="mb-4">
                                            <Link
                                                href={route(
                                                    "projects.edit",
                                                    project.data
                                                )}
                                            >
                                                Update Project
                                            </Link>
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5 font-medium">
                                {project.data.description}
                            </div>

                            <div className="font-medium ">
                                <span className="mr-4">
                                    Project Assigned By:
                                </span>
                                {project.data.description}
                            </div>

                            <Index tasks={project.data.tasks} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
