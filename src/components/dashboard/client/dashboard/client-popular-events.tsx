"use client"

import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data - in a real app, this would come from your API
const popularEvents = [
  {
    id: "1",
    eventName: "International Jazz Festival",
    date: "August 25, 2025",
    location: "Riverside Park, Chicago",
    attendees: 5000,
    category: "Music",
    price: "TZS 500,000.00",
  },
  {
    id: "2",
    eventName: "Digital Innovation Summit",
    date: "September 15, 2025",
    location: "Tech Center, Boston",
    attendees: 3000,
    category: "Technology",
    price: "TZS 120,000.00",
  },
  {
    id: "3",
    eventName: "Culinary Masterclass",
    date: "October 5, 2025",
    location: "Grand Hotel, Miami",
    attendees: 500,
    category: "Food",
    price: "TZS 950,000.00",
  },
]

export function ClientPopularEvents() {
  return (
    <div className="space-y-4">
      {popularEvents.map((event) => (
        <div key={event.id} className="flex items-start space-x-4 rounded-lg border p-4">
          <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
            <img
              src={`/placeholder.svg?height=64&width=64&text=${event.category}`}
              alt={event.category}
              className="h-full w-full object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{event.eventName}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{event.attendees.toLocaleString()} attending</span>
                  </div>
                </div>
              </div>
              <Badge>{event.category}</Badge>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="font-bold">{event.price}</div>
              <Button size="sm">Book Now</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
