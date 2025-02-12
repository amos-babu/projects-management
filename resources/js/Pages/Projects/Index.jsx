import PrimaryButton from '@/Components/PrimaryButton';
// import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ projects }) {
const { flash } = usePage().props;

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
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Product name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                status
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Start Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                End Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        { projects.data.map((project) => (
                                            <tr key={project.id} className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {project.id}
                                                </td>
                                                <td scope="row" className="py-4 font-medium text-gray-900 x-6 whitespace-nowrap dark:text-white">
                                                    {project.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                   <div className={`text-center ${project.status === 'pending' ? 'bg-red-400' : project.status === 'Completed' ? 'bg-green-400' : project.status === 'In Progress' ? 'bg-yellow-400' : 'bg-slate-50'}`}>
                                                    <div className='mt-2 mb-2 text-black rounded-lg'>{project.status}</div>
                                                   </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                   {project.start_date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {project.end_date}
                                                </td>
                                                <td className="px-6 py-4 ">
                                                    <Link href={route('projects.edit', {project : project.id})}>Edit</Link>
                                                    <PrimaryButton onClick = {() => handleDeleteProject(project.id)} className='mx-2 bg-red-600'>Delete</PrimaryButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between justify">
                                <span className="text-sm text-gray-700 dark:text-gray-400">
                                    Showing <span className="font-semibold text-gray-900 dark:text-white">{projects.meta.from}</span> to <span className="font-semibold text-gray-900 dark:text-white">{projects.meta.to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{projects.meta.total}</span> Entries
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">

                                    <button className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                        </svg>
                                        <Link href={projects.links.prev}>Prev</Link>
                                    </button>
                                    <button className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-gray-800 border-0 border-gray-700 border-s rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <Link href={projects.links.next}>Next</Link>
                                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
