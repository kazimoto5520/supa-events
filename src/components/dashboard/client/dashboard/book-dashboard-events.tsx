"use client"

import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { getAllEventsForClients } from '@/services/event/eventService'
import { bookEvent } from '@/services/booking/bookingService'
import { ApiError } from '@/services/auth/type'
import { BookingRequest, CreateBookingResponse } from '@/services/booking/type'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { ApiDepositResponse } from '@/services/account/type'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ToastAction } from '@/components/ui/toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { formatMoney } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type BookingFormValues = {
    eventStartDate: string;
    eventEndDate: string;
    eventTime: string;
};

const BookDashboardEvents = () => {
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
    const accessToken = Cookies.get("supa.events.co.tz.access");
    const queryClient = useQueryClient();

    const {
        data: events,
        isLoading: iseventsLoading,
        isError: iseventsError,
    } = useQuery({
        queryKey: ["events"],
        queryFn: () => getAllEventsForClients(accessToken)
    });

    const selectedEvent = events?.data.find((e) => e.rowId === selectedEventId) || null

    const form = useForm<BookingFormValues>({
        defaultValues: {
            eventStartDate: '',
            eventEndDate: '',
            eventTime: '',
        }
    });

    const bookingMutation = useMutation<CreateBookingResponse, ApiError, BookingRequest>({
        mutationFn: (request: BookingRequest) => bookEvent(accessToken, request),
        onSuccess: (response) => {
            console.log("Booking created successful:", response)
            toast({
                variant: "success",
                title: "Success",
                description: "Booking created successful",
                duration: 5000,
                action: <ToastAction altText="Close">Close</ToastAction>,
            });

            form.reset();
            queryClient.invalidateQueries({ queryKey: ["events"] });
            setSelectedEventId(null);

        },
        onError: (error) => {
            const errorData = error?.response?.data;
            console.error("Booking event failed:", errorData);

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

    const handleBookingSubmit = (data: BookingFormValues) => {
        console.log("Booking data:", data);
        console.log("Selected event:", selectedEvent);
        const payload = {
            eventId: selectedEvent?.rowId,
            eventStartDate: new Date(data.eventStartDate),
            eventEndDate: new Date(data.eventEndDate),
            eventTime: data.eventTime,
            amount: selectedEvent?.amount,
            totalAmount: selectedEvent?.amount,
        };
        if (payload.eventId) {
            bookingMutation.mutate(payload as BookingRequest);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Event ID is required to make a booking.",
                duration: 5000,
                action: <ToastAction altText="Close">Close</ToastAction>,
            });
        }

    }
    return (
        <>
            <div className="space-y-8">
                <h1 className="text-2xl font-bold">Discover Events</h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events?.data.length === 0 ? (
                        <p className="text-gray-500">No events available at the moment.</p>
                    ) : (
                        events?.data.map((event) => (
                            <Dialog
                                key={event.rowId}
                                open={selectedEventId === event.rowId}
                                onOpenChange={(isOpen) => setSelectedEventId(isOpen ? event.rowId : null)}
                            >
                                <div className="border rounded-lg p-4 shadow">
                                    <img
                                        src={"/event1.jpg"}
                                        alt={event.name}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                    <h2 className="text-lg font-semibold mt-2">{event.name}</h2>
                                    <p className="text-sm text-gray-600">{event.description}</p>
                                    <DialogTrigger asChild>
                                        <Button className="mt-4 w-full hover:bg-red-500">{formatMoney(event.amount)} </Button>
                                    </DialogTrigger>
                                </div>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Book: {event.name}</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={form.handleSubmit(handleBookingSubmit)} className="space-y-4">
                                        <div>
                                            <label htmlFor={`startDate-${event.rowId}`} className="block text-sm font-medium">
                                                Start Date
                                            </label>
                                            <Input id={`startDate-${event.rowId}`} type="date" {...form.register("eventStartDate", { required: true })} />
                                        </div>
                                        <div>
                                            <label htmlFor={`endDate-${event.rowId}`} className="block text-sm font-medium">
                                                End Date
                                            </label>
                                            <Input id={`endDate-${event.rowId}`} type="date" {...form.register("eventEndDate", { required: true })} />
                                        </div>
                                        <div>
                                            <label htmlFor={`time-${event.rowId}`} className="block text-sm font-medium">
                                                Time
                                            </label>
                                            <Input id={`time-${event.rowId}`} type="time" {...form.register("eventTime", { required: true })} />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={bookingMutation.isPending}>
                                            {bookingMutation.isPending ? "Booking..." : "Book Event"}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default BookDashboardEvents