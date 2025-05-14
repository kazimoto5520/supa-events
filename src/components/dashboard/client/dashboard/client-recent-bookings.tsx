"use client"

import { CalendarDays, Clock, CreditCard, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data - in a real app, this would come from your API
const recentBookings = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    date: "July 15, 2025",
    location: "Central Park, NY",
    amount: "$120.00",
    status: "confirmed",
  },
  {
    id: "2",
    eventName: "Tech Conference 2025",
    date: "August 10, 2025",
    location: "Convention Center, SF",
    amount: "$350.00",
    status: "pending",
  },
  {
    id: "3",
    eventName: "Food & Wine Festival",
    date: "September 5, 2025",
    location: "Waterfront Park, Chicago",
    amount: "$85.00",
    status: "confirmed",
  },
  {
    id: "4",
    eventName: "Art Exhibition",
    date: "October 20, 2025",
    location: "Modern Art Museum, LA",
    amount: "$45.00",
    status: "confirmed",
  },
]

export function CLientRecentBookings() {
  return (
    <div className="space-y-8">
      {recentBookings.map((booking) => (
        <div key={booking.id} className="flex items-center">
          <div className="flex items-center justify-center rounded-md border bg-muted p-2 mr-4">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{booking.eventName}</p>
            <div className="flex items-center gap-x-2 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{booking.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                <span>{booking.amount}</span>
              </div>
            </div>
          </div>
          <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>{booking.status}</Badge>
        </div>
      ))}
    </div>
  )
}
