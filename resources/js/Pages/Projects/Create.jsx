import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Popover, PopoverTrigger } from '@/Components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Label } from "@/components/ui/label"
import { Head } from '@inertiajs/react';
import { PopoverContent } from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';

export default function Create() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Project
                </h2>
            }
        >
            <Head title="Create" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form>
                                <div className='mb-5'>
                                    <Label>Project Name</Label>
                                    <Input/>
                                </div>

                                <div className='mb-5'>
                                    <Label>Project Description (Optional)</Label>
                                    <Textarea/>
                                </div>
                                <div className='mb-5'>
                                    <Label>Project Status</Label>
                                    <Select>
                                    <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Pending" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Pending</SelectItem>
                                            <SelectItem value="dark">In Progress</SelectItem>
                                            <SelectItem value="system">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </div>
                                {/* <div className='mb-5'>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className= {cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
