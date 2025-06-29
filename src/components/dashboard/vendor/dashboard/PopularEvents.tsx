"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { getAllEvents } from "@/services/event/eventService"
import { formatMoney } from "@/lib/utils"

const popularEvents = [
    { name: "Summer Music Festival", bookings: 1200, revenue: 60000 },
    { name: "Tech Conference 2024", bookings: 800, revenue: 40000 },
    { name: "Food & Wine Expo", bookings: 650, revenue: 32500 },
    { name: "Yoga Retreat", bookings: 450, revenue: 22500 },
]

export function PopularEvents() {
    const accessToken = Cookies.get("supa.events.co.tz.access");

    const {
        data: events,
        isLoading: iseventsLoading,
        isError: iseventsError,
    } = useQuery({
        queryKey: ["events"],
        queryFn: () => getAllEvents(accessToken)
    });

    const displayedEvents = events?.data?.slice(0, 5) ?? [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Popular Events</CardTitle>
            </CardHeader>
            <CardContent>
                {displayedEvents.length === 0 ? (
                    <p>No events available.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead className="text-right">Category</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayedEvents.map((event) => (
                                <TableRow key={event.name}>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell className="text-right">{event?.category?.name}</TableCell>
                                    <TableCell className="text-right">{formatMoney(event?.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}
