import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const popularEvents = [
    { name: "Summer Music Festival", bookings: 1200, revenue: 60000 },
    { name: "Tech Conference 2024", bookings: 800, revenue: 40000 },
    { name: "Food & Wine Expo", bookings: 650, revenue: 32500 },
    { name: "Yoga Retreat", bookings: 450, revenue: 22500 },
]

export function PopularEvents() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Popular Events</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead className="text-right">Bookings</TableHead>
                            <TableHead className="text-right">Revenue</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {popularEvents.map((event) => (
                            <TableRow key={event.name}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell className="text-right">{event.bookings}</TableCell>
                                <TableCell className="text-right">${event.revenue.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

