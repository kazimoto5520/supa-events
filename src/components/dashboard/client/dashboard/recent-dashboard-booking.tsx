"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CreditCard, Ticket } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { formatMoney } from '@/lib/utils'
import Cookies from 'js-cookie'
import { getAllBookings } from '@/services/booking/bookingService'

const RecentDashboardBookings = () => {
    const accessToken = Cookies.get("supa.events.co.tz.access");
    const {
        data: bookings,
        isLoading: isBookingsLoading,
        isError: isBookingsError,
    } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => getAllBookings(accessToken)
    });

    const bookingList = bookings?.data || [];

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Your most recent event bookings</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            {bookingList.slice(0, 5).map((booking, index) => (
                                <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-primary/10">
                                        <Ticket className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h3 className="font-semibold">{booking?.event?.name || `Event ${index + 1}`}</h3>
                                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{(new Date(booking?.bookingDate).toLocaleDateString()) || 'Date not available'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <CreditCard className="h-3 w-3" />
                                                <span>{formatMoney(Number(booking.totalAmount)) || 'Amount not available'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Ticket className="h-3 w-3" />
                                                <span>{booking.paymentReference || 'Tickets not available'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default RecentDashboardBookings
