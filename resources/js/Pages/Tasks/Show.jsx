import { Badge } from "@/Components/ui/badge";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { AlertDialogDemo } from "@/Components/AlertDialogDemo";

export default function Show({ task }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Show Task
                </h2>
            }
        >
            <Head title={`Task '${task.title}'`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-wrap justify-between mb-4 gap-7">
                                <div className="mb-4 text-xl font-bold">
                                    {task.title}
                                </div>
                                <div className="mb-4 text-xl font-bold">
                                    <Badge
                                        className={`${
                                            task.status.label === "To do"
                                                ? "bg-red-500"
                                                : task.status.label ===
                                                  "In Progress"
                                                ? "bg-yellow-500"
                                                : task.status.label ===
                                                  "Completed"
                                                ? "bg-green-500"
                                                : ""
                                        }`}
                                    >
                                        {task.status.label}
                                    </Badge>
                                </div>
                                <div>
                                    <div className="flex gap-3">
                                        {task.permission.canUpdate && (
                                            <Button className="mb-4">
                                                <Link
                                                    href={route(
                                                        "tasks.edit",
                                                        task
                                                    )}
                                                >
                                                    Update Task
                                                </Link>
                                            </Button>
                                        )}

                                        {task.permission.canDelete && (
                                            <AlertDialogDemo
                                                item={task}
                                                itemType="task"
                                                routeName="tasks.destroy"
                                                itemName={task.title}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5 font-medium">
                                {task.description}
                            </div>

                            <div className="font-medium ">
                                <span className="mr-4">Task Assigned By:</span>
                                {task.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
