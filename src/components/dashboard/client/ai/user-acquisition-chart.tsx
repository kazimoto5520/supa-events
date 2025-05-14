"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

// Sample data - in a real app, this would come from your API
const data = [
  { name: "Week 1", organic: 4000, paid: 2400, referral: 2400 },
  { name: "Week 2", organic: 3000, paid: 1398, referral: 2210 },
  { name: "Week 3", organic: 2000, paid: 9800, referral: 2290 },
  { name: "Week 4", organic: 2780, paid: 3908, referral: 2000 },
  { name: "Week 5", organic: 1890, paid: 4800, referral: 2181 },
  { name: "Week 6", organic: 2390, paid: 3800, referral: 2500 },
  { name: "Week 7", organic: 3490, paid: 4300, referral: 2100 },
]

export function UserAcquisitionChart() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="w-full space-y-3">
        <Skeleton className="h-[250px] w-full" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="organic" stackId="1" stroke="#8884d8" fill="#8884d8" name="Organic" />
        <Area type="monotone" dataKey="paid" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Paid" />
        <Area type="monotone" dataKey="referral" stackId="1" stroke="#ffc658" fill="#ffc658" name="Referral" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
