import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Link } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import { useProjectUpdate } from "@/Components/Utilities/ProjectsUpdateContext";

export default function Index({ tasks }) {
    const { realtimeTasks } = useProjectUpdate();
    const [updatedTasks, setUpdatedTasks] = useState(tasks);

    useEffect(() => {
        if (realtimeTasks.length == 0) return;
        setUpdatedTasks((prev) => {
            const updated = [...prev];

            realtimeTasks.forEach((newProj) => {
                const index = updated.findIndex((p) => p.id === newProj.id);
                if (index !== -1) {
                    updated[index] == newProj;
                } else {
                    updated.unshift(newProj);
                }
            });
            return updated;
        });
    }, [realtimeTasks]);

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
                </TableRow>
            </TableHeader>
            <TableBody>
                {updatedTasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>
                            <Link
                                className="hover:underline hover:text-green-600"
                                href={route("tasks.show", task.id)}
                            >
                                {task.title}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Badge
                                className={`${
                                    task.status.label === "To do"
                                        ? "bg-red-600"
                                        : task.status.label === "In Progress"
                                        ? "bg-yellow-600"
                                        : task.status.label === "Completed"
                                        ? "bg-green-600"
                                        : ""
                                }`}
                            >
                                {task.status.label}
                            </Badge>
                        </TableCell>
                        <TableCell>{task.start_date}</TableCell>
                        <TableCell>{task.end_date}</TableCell>
                        <TableCell>{task.developed_by.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
