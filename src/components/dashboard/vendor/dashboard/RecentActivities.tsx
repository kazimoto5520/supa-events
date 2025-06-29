"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatMoney } from "@/lib/utils";
import { getAllVendorBookings } from "@/services/booking/bookingService";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Cookies from "js-cookie"

export function RecentActivities() {
    const accessToken = Cookies.get("supa.events.co.tz.access");

    const {
        data: bookings,
        isLoading: isBookingsLoading,
        isError: isBookingsError,
    } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => getAllVendorBookings(accessToken)
    });

const bookingList = bookings?.data.slice(0, 5) || [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {bookingList.map((activity, index) => (
                        <li key={index} className="flex items-start space-x-4">
                            <div className="bg-primary rounded-full p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-primary-foreground"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{activity?.user?.firstName + " " + activity?.user?.lastName}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatMoney(Number(activity.totalAmount))} • {activity.event.name}
                                </p>
                            </div>
                            <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(activity.bookingDate), { addSuffix: true })}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

