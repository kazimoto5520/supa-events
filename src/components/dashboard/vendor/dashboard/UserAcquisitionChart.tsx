"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 600 },
    { name: "Mar", users: 800 },
    { name: "Apr", users: 1000 },
    { name: "May", users: 1400 },
    { name: "Jun", users: 1800 },
]

export function UserAcquisitionChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                            <Tooltip />
                            <Line type="monotone" dataKey="users" stroke="#adfa1d" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div>Total Users</div>
                    <div>6,000</div>
                </div>
            </CardContent>
        </Card>
    )
}

