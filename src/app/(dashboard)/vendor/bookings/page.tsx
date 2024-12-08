"use client"

import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {DateRangePicker} from "@/components/dashboard/vendor/bookings/DateRangePicker";
import {BookingTable} from "@/components/dashboard/vendor/bookings/BookingTable";
import {BookingDetails} from "@/components/dashboard/vendor/bookings/BookingDetails";
import {DateRange} from "react-day-picker";

interface Booking {
    id: number
    customerName: string
    event: string
    date: string
    status: 'Confirmed' | 'Pending' | 'Canceled'
    paymentStatus: 'Paid' | 'Unpaid' | 'Refunded'
}

export default function BookingsPage() {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
        from: new Date(),
        to: new Date(),
    });
    const [statusFilter, setStatusFilter] = useState('all')

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Bookings</h1>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <DateRangePicker
                    onChange={(range: DateRange | undefined) => {
                        setDateRange({
                            from: range?.from,
                            to: range?.to,
                        });
                    }}
                />

                <Select onValueChange={setStatusFilter} defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <BookingTable
                dateRange={dateRange}
                statusFilter={statusFilter}
                onViewDetails={setSelectedBooking}></BookingTable>
            {selectedBooking && (
                <BookingDetails
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    )
}

