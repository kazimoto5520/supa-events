"use client"

import { Button } from "@/components/ui/button"
import { Clock, MapPin, Ticket } from "lucide-react"

// Sample data - in a real app, this would come from your API
const upcomingEvents = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    date: "July 15, 2025",
    location: "Central Park, NY",
    tickets: 2,
    daysLeft: 3,
  },
  {
    id: "2",
    eventName: "Tech Conference 2025",
    date: "August 10, 2025",
    location: "Convention Center, SF",
    tickets: 1,
    daysLeft: 15,
  },
  {
    id: "3",
    eventName: "Food & Wine Festival",
    date: "September 5, 2025",
    location: "Waterfront Park, Chicago",
    tickets: 4,
    daysLeft: 30,
  },
]

export function ClientUpcomingEvents() {
  return (
    <div className="space-y-4">
      {upcomingEvents.map((event) => (
        <div key={event.id} className="flex flex-col space-y-3 rounded-lg border p-4">
          <div className="flex justify-between">
            <h3 className="font-semibold">{event.eventName}</h3>
            <div className="text-sm font-medium text-orange-500">{event.daysLeft} days left</div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Ticket className="h-3 w-3" />
              <span>{event.tickets} Tickets</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <Button variant="outline" size="sm">
              View Tickets
            </Button>
            <Button size="sm">Event Details</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
