import {BookingsOverview} from "@/components/dashboard/vendor/dashboard/BookingsOverview";
import {RevenueChart} from "@/components/dashboard/vendor/dashboard/RevenueChart";
import {PopularEvents} from "@/components/dashboard/vendor/dashboard/PopularEvents";
import {UserAcquisitionChart} from "@/components/dashboard/vendor/dashboard/UserAcquisitionChart";
import {RecentActivities} from "@/components/dashboard/vendor/dashboard/RecentActivities";
import {UpcomingEventsCalendar} from "@/components/dashboard/vendor/dashboard/UpcomingEventsCalendar";


export default function Home() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <BookingsOverview/>
                <RevenueChart/>
                <PopularEvents/>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <UpcomingEventsCalendar/>
                <div className="space-y-8">
                    <RecentActivities/>
                    <UserAcquisitionChart/>
                </div>
            </div>
        </div>
    )
}

