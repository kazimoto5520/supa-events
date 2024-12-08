"use client"

import { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Booking {
    id: number
    customerName: string
    event: string
    date: string
    status: 'Confirmed' | 'Pending' | 'Canceled'
    paymentStatus: 'Paid' | 'Unpaid' | 'Refunded'
}

interface BookingTableProps {
    dateRange: { from?: Date; to?: Date }
    statusFilter: string
    onViewDetails: (booking: Booking) => void
}

// Mock data (replace with actual data fetching in a real application)
const mockBookings: Booking[] = [
    { id: 1, customerName: 'John Doe', event: 'Summer Music Festival', date: '2024-07-15', status: 'Confirmed', paymentStatus: 'Paid' },
    { id: 2, customerName: 'Jane Smith', event: 'Tech Conference 2024', date: '2024-09-22', status: 'Pending', paymentStatus: 'Unpaid' },
    { id: 3, customerName: 'Mike Johnson', event: 'Food & Wine Expo', date: '2024-05-10', status: 'Confirmed', paymentStatus: 'Paid' },
    { id: 4, customerName: 'Emily Brown', event: 'Yoga Retreat', date: '2024-08-05', status: 'Canceled', paymentStatus: 'Refunded' },
]

export function BookingTable({ dateRange, statusFilter, onViewDetails } : BookingTableProps) {
    const [filteredBookings, setFilteredBookings] = useState(mockBookings)

    useEffect(() => {
        let filtered = mockBookings

        if (dateRange.from && dateRange.to) {
            filtered = filtered.filter(booking => {
                const bookingDate = new Date(booking.date)
                return bookingDate >= (dateRange.from ? dateRange.from : new Date()) && bookingDate <= (dateRange.to ? dateRange.to : new Date)
            })
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(booking =>
                booking.status.toLowerCase() === statusFilter
            )
        }

        setFilteredBookings(filtered)
    }, [dateRange, statusFilter])

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.customerName}</TableCell>
                        <TableCell>{booking.event}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                            <Badge variant={
                                booking.status === 'Confirmed' ? 'default' :
                                    booking.status === 'Pending' ? 'secondary' :
                                        'destructive'
                            }>
                                {booking.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={
                                booking.paymentStatus === 'Paid' ? 'success' :
                                    booking.paymentStatus === 'Unpaid' ? 'warning' :
                                        'default'
                            }>
                                {booking.paymentStatus}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => onViewDetails(booking)}>
                                View Details
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

