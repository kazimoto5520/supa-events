import type { Metadata } from "next"
import { CalendarDays, Clock, CreditCard, MapPin, Search, Ticket, TrendingUp, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/client/dashboard/overview"
import { CLientRecentBookings } from "@/components/dashboard/client/dashboard/client-recent-bookings"
import { ClientUpcomingEvents } from "@/components/dashboard/client/dashboard/client-upcoming-events"
import { ClientPopularEvents } from "@/components/dashboard/client/dashboard/client-popular-events"
import { CalendarDateRangePicker } from "@/components/dashboard/client/dashboard/date-range-picker"
import ClientCardStats from "@/components/dashboard/client/dashboard/client-card-stats"
import BookDashboardEvents from "@/components/dashboard/client/dashboard/book-dashboard-events"
import RecentDashboardBookings from "@/components/dashboard/client/dashboard/recent-dashboard-booking"

export const metadata: Metadata = {
  title: "Dashboard | Client Portal",
  description: "Manage your event bookings and discover new experiences",
}

export default function ClientDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Manage your event bookings and discover new experiences.
        </p>
      </div>

      <ClientCardStats />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDateRangePicker />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Find Events
          </Button>
          <Button size="sm">
            <Ticket className="mr-2 h-4 w-4" />
            My Tickets
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger> */}
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Booking Activity</CardTitle>
                <CardDescription>Your event booking activity over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Upcoming Events</CardTitle>
              <CardDescription>All events you{"'"}ve booked that are coming up</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Extended list of upcoming events */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <CalendarDays className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">Summer Music Festival {i}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>July {10 + i}, 2025</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>Central Park, New York</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Ticket className="h-3 w-3" />
                            <span>2 Tickets</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <RecentDashboardBookings />
        </TabsContent>
        <TabsContent value="discover" className="space-y-4">
          <BookDashboardEvents />
        </TabsContent>
      </Tabs>
    </div>
  )
}
