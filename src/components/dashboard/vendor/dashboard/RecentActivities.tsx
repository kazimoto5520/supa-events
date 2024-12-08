import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
    { user: "John Doe", action: "Booked", event: "Summer Music Festival", time: "2 hours ago" },
    { user: "Jane Smith", action: "Cancelled", event: "Yoga Retreat", time: "5 hours ago" },
    { user: "Mike Johnson", action: "Registered", event: "Tech Conference 2024", time: "1 day ago" },
    { user: "Emily Brown", action: "Reviewed", event: "Food & Wine Expo", time: "2 days ago" },
]

export function RecentActivities() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {activities.map((activity, index) => (
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
                                <p className="text-sm font-medium">{activity.user}</p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.action} {activity.event}
                                </p>
                            </div>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

