import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BookingsOverview() {
    const bookings = [
        { label: "Current", value: 12, status: "default" },
        { label: "Upcoming", value: 25, status: "default" },
        { label: "Completed", value: 142, status: "success" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bookings Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <div key={booking.label} className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{booking.label}</p>
                                <p className="text-2xl font-bold">{booking.value}</p>
                            </div>
                            <Badge variant={booking.status as "default" | "success"}>{booking.label}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

