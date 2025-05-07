"use client"

import VendorBookingTable from '@/components/dashboard/vendor/bookings/VendorBookingTable'
import { useState } from 'react'


export default function BookingsPage() {

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Bookings</h1>

            <VendorBookingTable />
            
        </div>
    )
}

