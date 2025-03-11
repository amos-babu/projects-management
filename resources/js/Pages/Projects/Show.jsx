import { Badge } from "@/Components/ui/badge";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Index from "../Tasks/Index";
import SuccessMessageDisplay from "@/Components/SuccessMessageDisplay";
import { AlertDialogDemo } from "@/Components/AlertDialogDemo";
import { Button } from "@/Components/ui/button";

export default function Show({ project, canCreate }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Project '{project.name}'
                </h2>
            }
        >
            <Head title={`Project '${project.name}'`} />

            <div className="py-12">
                <SuccessMessageDisplay />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-wrap justify-between mb-4 gap-7">
                                <div className="mb-4 text-xl font-bold">
                                    {project.name}
                                </div>
                                <div className="mb-4 text-xl font-bold">
                                    <Badge
                                        className={`${
                                            project.status.label ===
                                            "In Progress"
                                                ? "bg-yellow-500"
                                                : project.status.label ===
                                                  "Pending"
                                                ? "bg-red-500"
                                                : project.status.label ===
                                                  "Completed"
                                                ? "bg-green-500"
                                                : ""
                                        }`}
                                    >
                                        {project.status.label}
                                    </Badge>
                                </div>
                                <div>
                                    <div className="flex gap-3">
                                        {canCreate && (
                                            <Button className="mb-4">
                                                <Link
                                                    href={route(
                                                        "tasks.create",
                                                        {
                                                            project_id:
                                                                project.id,
                                                        }
                                                    )}
                                                >
                                                    Create Task
                                                </Link>
                                            </Button>
                                        )}
                                        {project.permissions.canUpdate && (
                                            <Button className="mb-4">
                                                <Link
                                                    href={route(
                                                        "projects.edit",
                                                        project
                                                    )}
                                                >
                                                    Update Project
                                                </Link>
                                            </Button>
                                        )}

                                        {project.permissions.canDelete && (
                                            <AlertDialogDemo
                                                item={project}
                                                itemType="task"
                                                routeName="projects.destroy"
                                                itemName={project.name}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5 font-medium">
                                {project.description}
                            </div>

                            <div className="font-medium ">
                                <span className="mr-4">
                                    Project Assigned By:
                                </span>
                                {project.created_by.name}
                            </div>

                            <Index tasks={project.tasks} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
