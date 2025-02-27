import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { AlertDialogDemo } from "@/Components/AlertDialogDemo";
import { Link } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";

export default function Index({ tasks }) {
    return (
        <Table className="mt-20">
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Task Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>
                            <Link
                                className="hover:underline hover:text-blue-600"
                                href={route("tasks.show", task.id)}
                            >
                                {task.title}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Badge
                                className={`${
                                    task.status === "To do"
                                        ? "bg-red-600"
                                        : task.status === "In Progress"
                                        ? "bg-yellow-500"
                                        : task.status === "Completed"
                                        ? "bg-green-600"
                                        : ""
                                }`}
                            >
                                {task.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{task.start_date}</TableCell>
                        <TableCell>{task.end_date}</TableCell>
                        <TableCell>{task.assigned_to.name}</TableCell>
                        <TableCell>
                            <Link
                                className="mx-2"
                                href={route("tasks.edit", task.id)}
                            >
                                Edit
                            </Link>
                            <AlertDialogDemo project={task} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
