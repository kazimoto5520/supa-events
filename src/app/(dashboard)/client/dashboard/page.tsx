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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Next event in 3 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">TZS 1,248,000.50</div>
              <p className="text-xs text-muted-foreground">+$350.00 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Categories</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Music, Tech, Food, Sports, Art</p>
            </CardContent>
          </Card>
        </div>
      </div>

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
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Booking Activity</CardTitle>
                <CardDescription>Your event booking activity over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your most recent event bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <CLientRecentBookings />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events you{"'"}ve booked that are coming up</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientUpcomingEvents />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Upcoming Events</Button>
              </CardFooter>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Popular in Your Area</CardTitle>
                <CardDescription>Trending events near you</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientPopularEvents />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Explore More Events</Button>
              </CardFooter>
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
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>All your past and upcoming event bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <Ticket className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">Tech Conference 202{i}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{i % 2 === 0 ? 'Upcoming' : 'Past'}: March {i * 3}, 202{i}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-3 w-3" />
                            <span>TZS {(i * 100).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Ticket className="h-3 w-3" />
                            <span>{i} Ticket{i > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant={i % 2 === 0 ? "default" : "outline"} size="sm">
                        {i % 2 === 0 ? 'Manage Booking' : 'View Details'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="discover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discover Events</CardTitle>
              <CardDescription>Find new events based on your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video w-full bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={`/placeholder.svg?height=200&width=400&text=Event+${i}`} 
                          alt={`Event ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">International Art Exhibition {i}</CardTitle>
                      <CardDescription>A showcase of international artists</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>August {i * 5}, 2025</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>Art Gallery, London</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{i * 100} attending</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-bold">TZS {(50 + i * 10).toFixed(2)}</div>
                        <Button size="sm">Book Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Load More Events</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
