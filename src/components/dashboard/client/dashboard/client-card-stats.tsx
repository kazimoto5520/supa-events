"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, CreditCard, Ticket, TrendingUp } from 'lucide-react'
import React from 'react'
import Cookies from 'js-cookie'
import { useQuery } from '@tanstack/react-query'
import { getCardStatistics } from '@/services/stats/statisticsService'

const ClientCardStats = () => {
    const accessToken = Cookies.get("supa.events.co.tz.access");

    const {
        data: cardStats,
        isLoading: isCardStatsLoading,
        isError: isCardStatsError,
    } = useQuery({
        queryKey: ["card-stats"],
        queryFn: () => getCardStatistics(accessToken)
    });

    // console.log("Card Stats:", cardStats);
    const stats = cardStats?.data;

    if (isCardStatsLoading) {
        return <div>Loading...</div>;
    }

    if (isCardStatsError || !stats) {
        return <div>Failed to load statistics</div>;
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
                {/* Total Bookings */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalBookings}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.deltaBookings >= 0
                                ? `+${stats?.deltaBookings} from last month`
                                : `${stats?.deltaBookings} from last month`}
                        </p>
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.upcomingEventsCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.nextEventInDays === 0
                                ? "Next event is today"
                                : `Next event in ${stats?.nextEventInDays} day${stats?.nextEventInDays > 1 ? "s" : ""}`}
                        </p>
                    </CardContent>
                </Card>

                {/* Total Spent */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            TZS {Number(stats?.totalSpent).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {Number(stats?.deltaSpent) < 0 ? "-" : "+"}TZS{" "}
                            {Math.abs(Number(stats?.deltaSpent)).toLocaleString()} from last month
                        </p>

                    </CardContent>
                </Card>

                {/* Event Categories */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Event Categories</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats?.eventCategoriesCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.categoryList.join(", ")}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ClientCardStats;