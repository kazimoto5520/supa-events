"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Sample data - in a real app, this would come from your API
const recommendedEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    description: "A three-day music festival featuring top artists from around the world.",
    date: "July 15-17, 2025",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    category: "Music",
    attendees: 5000,
    matchScore: 98,
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    description: "The biggest tech conference of the year with keynotes from industry leaders.",
    date: "August 10-12, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Convention Center, San Francisco",
    category: "Technology",
    attendees: 3000,
    matchScore: 92,
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    description: "Taste the best food and wine from top chefs and wineries.",
    date: "September 5-7, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "Waterfront Park, Chicago",
    category: "Food & Drink",
    attendees: 2500,
    matchScore: 87,
  },
]

export function EventRecommendations() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="pb-2">
              <Skeleton className="h-20 w-full mb-2" />
              <div className="flex flex-wrap gap-2 mt-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Based on your preferences</h3>
        <Button variant="outline" size="sm">
          Refresh Recommendations
        </Button>
      </div>

      {recommendedEvents.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{event.title}</CardTitle>
              <Badge className="bg-green-600">{event.matchScore}% Match</Badge>
            </div>
            <CardDescription>{event.category}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{event.attendees.toLocaleString()} attendees</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
