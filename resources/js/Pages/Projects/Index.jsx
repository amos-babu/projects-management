import PrimaryButton from '@/Components/PrimaryButton';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
// import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ projects }) {
const { flash } = usePage().props;
console.log(projects);

const handleDeleteProject = (id) => {
    if(confirm('Are you sure you want to delete this projects?')){
        Inertia.delete(route('projects.destroy', id));
    }
}
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

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <PrimaryButton className='mb-4'>
                        <Link href={route('projects.create')}>Create Project</Link>
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
                                        { projects.data.map((project)=>(
                                            <TableRow key={project.id}>
                                                <TableCell>{project.id}</TableCell>
                                                <TableCell>{project.name}</TableCell>
                                                <TableCell>{project.status}</TableCell>
                                                <TableCell>{project.start_date}</TableCell>
                                                <TableCell>{project.end_date}</TableCell>
                                                <TableCell>Complete</TableCell>
                                            </TableRow>
                                         ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <Pagination className='mt-4'>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href={projects.links.prev}/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href={projects.links.first}>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis/>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href={projects.links.last}>{projects.meta.last_page}</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href={projects.links.next}/>
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
