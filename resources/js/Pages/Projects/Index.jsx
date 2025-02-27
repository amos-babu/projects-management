import { AlertDialogDemo } from "@/Components/AlertDialogDemo";
import PrimaryButton from "@/Components/PrimaryButton";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
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
import { Head, Link, usePage } from "@inertiajs/react";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export default function Index({ projects, children }) {
    const { flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success);

    setTimeout(() => {
        if (successMessage) {
            setSuccessMessage(null);
        }
    }, 3000);

    useEffect(() => {
        setSuccessMessage(flash.success);
    }, [flash.success]);
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
                {successMessage && (
                    <Alert className="mb-4 bg-green-400">
                        <Terminal className="w-4 h-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )}
                {children}

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <PrimaryButton className="mb-4">
                        <Link href={route("projects.create")}>
                            Create Project
                        </Link>
                    </PrimaryButton>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Project Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Start Date</TableHead>
                                            <TableHead>End Date</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projects.data.map((project) => (
                                            <TableRow key={project.id}>
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
                                                        {project.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={`${
                                                            project.status ===
                                                            "Pending"
                                                                ? "bg-red-600"
                                                                : project.status ===
                                                                  "In Progress"
                                                                ? "bg-yellow-500"
                                                                : project.status ===
                                                                  "Completed"
                                                                ? "bg-green-600"
                                                                : ""
                                                        }`}
                                                    >
                                                        {project.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {project.start_date}
                                                </TableCell>
                                                <TableCell>
                                                    {project.end_date}
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        className="mx-2"
                                                        href={route(
                                                            "projects.edit",
                                                            project.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <AlertDialogDemo
                                                        project={project}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
