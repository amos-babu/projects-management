import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Label } from "@/components/ui/label"
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

export default function Edit({ managers,statusOptions, project }) {
    const { data, setData, put, errors, processing } = useForm({
        name: project.data.name,
        description: project.data.description,
        status: project.data.status,
        start_date: project.data.start_date,
        end_date: project.data.end_date,
        manager_assigned: project.data.manager_assigned
    });
    // console.log(data.status);
    // console.log(project.data.status);
    // console.log(statusOptions);
    // console.log(useForm());

    const updateProject = (e) => {
        e.preventDefault();
        put(route('projects.update', project.data));
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Project
                </h2>
            }
        >
            <Head title="Edit" />

            <div className="py-12">
                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="w-4 h-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {Object.values(errors).flat().map((err, index) => (
                                <div key={index}>{err}</div>
                            ))}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={updateProject}>
                                <div className='mb-5'>
                                    <Label>Project Name</Label>
                                    <Input
                                        value={ data.name }
                                        onChange = {(e) => setData({ ...data, name: e.target.value })}
                                    />
                                </div>

                                <div className='mb-5'>
                                    <Label>Project Description (Optional)</Label>
                                    <Textarea
                                        value={ data.description }
                                        onChange={(e) => setData({...data, description: e.target.value })}
                                        />
                                </div>
                                <div className='mb-5'>
                                    <Label>Project Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData({ ...data, status: value })}>
                                    <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="PENDING" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions?.map((statusOption, index) => (
                                                 <SelectItem
                                                    key={index}
                                                    value={statusOption.value}>
                                                        {statusOption.name}
                                                    </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-wrap gap-3 mb-5">
                                    <div>
                                        <Label>Start Date</Label>
                                        <input
                                            value={ data.start_date }
                                            onChange={(e) => setData({...data, start_date: e.target.value})}
                                            className='mx-3 border-gray-300 outline-none focus:border-gray-950 rounded-xl'
                                            type='date'
                                            id='start_date'
                                            name='start_date'/>
                                    </div>
                                    <div>
                                        <Label>End Date</Label>
                                        <input
                                            value={ data.end_date }
                                            onChange={(e) => setData({...data, end_date: e.target.value})}
                                            className='mx-3 border-gray-300 outline-none focus:border-gray-950 rounded-xl'
                                            type='date'
                                            id='start_date'
                                            name='start_date'/>
                                    </div>

                                </div>

                                <div className='mb-5'>
                                    <Label>Assigned Project Manager</Label>
                                    <Select
                                        value={data.manager_assigned}
                                        onValueChange={(value) => setData({ ...data, manager_assigned: value })}>
                                    <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Amos Babu" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {managers?.data?.map((manager) => (
                                                <SelectItem
                                                    key={manager.id}
                                                    value={manager.name}>
                                                        {manager.name}
                                                 </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                </div>

                                <Button type="submit" disabled = {processing}>Edit</Button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
