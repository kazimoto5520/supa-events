"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '@/services/event/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import EventTable from '@/components/dashboard/vendor/events/EventTable';
import { ApiError } from '@/services/auth/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Event, EventRequest } from '@/services/event/type';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { createEvent } from '@/services/event/eventService';
import Cookies from 'js-cookie';
import { getAllCategories } from '@/services/category/categoryService';

const EventsPage = () => {
    const [isAddingEvent, setIsAddingEvent] = useState(false)
    const [editingEvent, setEditingEvent] = useState(null)
    const queryClient = useQueryClient()

    const accessToken = Cookies.get("supa.events.co.tz.access");

    const {
        data: categories,
        isLoading: iscategoriesLoading,
        isError: iscategoriesError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(accessToken)
    });


    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            amount: "",
        },
    })

    const eventMutation = useMutation<Event, ApiError, EventRequest>({
        mutationFn: (request: EventRequest) => createEvent(accessToken, request),
        onSuccess: (response) => {
            console.log("Event created successful:", response)
            toast({
                variant: "success",
                title: "Success",
                description: "Login successful",
                duration: 5000,
                action: <ToastAction altText="Close">Close</ToastAction>,
            });

            form.reset();
            setIsAddingEvent(false);
            queryClient.invalidateQueries({ queryKey: ["events"] });

        },
        onError: (error) => {
            const errorData = error?.response?.data;
            console.error("Creating event failed:", errorData);

            if (errorData?.error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: errorData.error,
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });
            } else if (errorData?.errorDescription) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: errorData.errorDescription,
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });

            } else if (errorData?.message) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: errorData.message,
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "An error occurred",
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });
            }
        },
    });

    function onSubmit(values: z.infer<typeof eventSchema>) {
        eventMutation.mutate({
            name: values.name,
            description: values.description,
            category: values.category,
            amount: parseFloat(values.amount),
        });
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Events</h1>
                <Button onClick={() => setIsAddingEvent(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                </Button>
            </div>

            {/* <EventList onEdit={setEditingEvent} /> */}
            <EventTable />

            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                        <DialogDescription>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Event Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter event name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter event description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories?.data && categories.data.length > 0 ? (
                                                            categories.data.map((category) => (
                                                                <SelectItem key={category.ref} value={category.ref}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))
                                                        ) : (
                                                            <SelectItem disabled value="">
                                                                No categories found
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-between">
                                        <Button variant="outline" onClick={() => setIsAddingEvent(false)}>Cancel</Button>
                                        <Button type="submit" disabled={eventMutation.isPending}>
                                            {eventMutation.isPending ? 'Submitting...' : 'Create Event'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default EventsPage;
