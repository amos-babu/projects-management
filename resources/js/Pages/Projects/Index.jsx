import PrimaryButton from "@/Components/PrimaryButton";
import { Badge } from "@/Components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function Index({ projects, canCreatePolicy, authUserId }) {
    const { flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success);

    if (successMessage) {
        setSuccessMessage(null);
        toast.success(successMessage);
    }

    useEffect(() => {
        setSuccessMessage(flash.success);
    }, [flash.success]);

    useEffect(() => {
        if (!authUserId) {
            return;
        }
        window.Echo.private(`projects.${authUserId}`).listen(
            "ProjectCreated",
            (event) => {
                toast.info("New Project Added", {
                    action: {
                        label: "View Project",
                        onClick: () => {
                            router.visit(route("projects.show", event.id));
                        },
                    },
                });
                console.log(event.id);
            }
        );

        return () => {
            window.Echo.leaveChannel(`projects.${authUserId}`);
        };
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <Toaster position="top-right" />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {canCreatePolicy && (
                        <PrimaryButton className="mb-4">
                            <Link href={route("projects.create")}>
                                Create Project
                            </Link>
                        </PrimaryButton>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {projects.data.length === 0 ? (
                                <p className="font-sans font-semibold text-center text-gray-500">
                                    No Projects Assigned
                                </p>
                            ) : (
                                <>
                                    <div className="relative overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>ID</TableHead>
                                                    <TableHead>
                                                        Project Name
                                                    </TableHead>
                                                    <TableHead>
                                                        Status
                                                    </TableHead>
                                                    <TableHead>
                                                        Start Date
                                                    </TableHead>
                                                    <TableHead>
                                                        End Date
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {projects.data.map(
                                                    (project) => (
                                                        <TableRow
                                                            key={project.id}
                                                        >
                                                            <TableCell>
                                                                {project.id}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Link
                                                                    className="hover:underline hover:text-blue-600"
                                                                    href={route(
                                                                        "projects.show",
                                                                        project.id
                                                                    )}
                                                                >
                                                                    {
                                                                        project.name
                                                                    }
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    className={`${
                                                                        project
                                                                            .status
                                                                            .label ===
                                                                        "Pending"
                                                                            ? "bg-red-600"
                                                                            : project
                                                                                  .status
                                                                                  .label ===
                                                                              "In Progress"
                                                                            ? "bg-yellow-600"
                                                                            : project
                                                                                  .status
                                                                                  .label ===
                                                                              "Completed"
                                                                            ? "bg-green-600"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    {
                                                                        project
                                                                            .status
                                                                            .label
                                                                    }
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    project.start_date
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    project.end_date
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <Pagination className="mt-4">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href={projects.links.prev}
                                                />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href={projects.links.first}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href={projects.links.last}
                                                >
                                                    {projects.meta.last_page}
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext
                                                    href={projects.links.next}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
