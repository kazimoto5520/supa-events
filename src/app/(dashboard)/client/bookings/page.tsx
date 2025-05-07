"use client"

import ClientBookingTable from '@/components/dashboard/client/bookings/ClientBookingTable'


export default function ClientBookingsPage() {

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Bookings</h1>

            <ClientBookingTable />
            
        </div>
    )
}

