"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Booking, CreateBookingResponse, PayEventRequest } from '@/services/booking/type'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@/services/auth/type'
import { payEventBooking } from '@/services/booking/bookingService'
import { on } from 'events'

interface PayEventDialogProps {
    booking: Booking | undefined
    isOpen: boolean
    onClose: () => void
}


type PaymentFormValues = {
    bookingId: string;
    amount: number;
};

const PayEventDialog = ({ booking, isOpen, onClose }: PayEventDialogProps) => {
    const accessToken = Cookies.get("supa.events.co.tz.access");
    const queryClient = useQueryClient();
    const form = useForm<PaymentFormValues>({
        defaultValues: {
            bookingId: '',
            amount: 0,
        }
    });

    const bookingMutation = useMutation<CreateBookingResponse, ApiError, PayEventRequest>({
        mutationFn: (request: PayEventRequest) => payEventBooking(accessToken, request),
        onSuccess: (response) => {
            console.log("Booking created successful:", response)
            toast({
                variant: "success",
                title: "Success",
                description: response.message || "Payment created successfully",
                duration: 5000,
                action: <ToastAction altText="Close">Close</ToastAction>,
            });

            form.reset();
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            onClose();

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

    const handleBookingSubmit = (data: PaymentFormValues) => {
        console.log("Booking data:", data);
        const payload = {
            bookingId: booking?.rowId,
            amount: data?.amount,
        };
        if (payload) {
            bookingMutation.mutate(payload as PayEventRequest);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Booking ID is required to make a booking.",
                duration: 5000,
                action: <ToastAction altText="Close">Close</ToastAction>,
            });
        }

    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Pay: {booking?.event?.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleBookingSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor={`amount-${booking?.rowId}`} className="block text-sm font-medium">
                            Amount
                        </label>
                        <Input id={`amount-${booking?.rowId}`} type="number" {...form.register("amount", { required: true })} />
                    </div>
                    <Button type="submit" className="w-full" disabled={bookingMutation.isPending}>
                        {bookingMutation.isPending ? "Processing..." : "Pay"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default PayEventDialog