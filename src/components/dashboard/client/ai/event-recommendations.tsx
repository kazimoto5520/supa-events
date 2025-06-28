"use client"

import { useState, useEffect, use } from "react"
import { Calendar, Clock, DollarSignIcon, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { getAllEventsForClients } from "@/services/event/eventService"
import Cookies from "js-cookie"
import { Money01Icon } from "hugeicons-react"
import { useRouter } from "next/navigation"

export function EventRecommendations() {
  const accessToken = Cookies.get("supa.events.co.tz.access");
  const router = useRouter();

  const {
    data: events,
    isLoading: iseventsLoading,
    isError: iseventsError,
    refetch
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEventsForClients(accessToken)
  });


  if (iseventsLoading) {
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
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Refresh Recommendations
        </Button>
      </div>

      {events?.data?.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>No events found based on your preferences.</p>
        </div>
      ) : (
        events?.data?.map((event) => (
          <Card key={event.rowId} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{event.name}</CardTitle>
                {/* <Badge className="bg-green-600">{event.matchScore}% Match</Badge> */}
              </div>
              <CardDescription>{event?.category?.name}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(event.createdAt).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{event?.user?.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Money01Icon className="h-4 w-4" />
                  <span>TZS {event.amount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push("/client/events")}>View Details</Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
