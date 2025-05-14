"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

// Sample data - in a real app, this would come from your API
const data = [
  { month: "Jan", bookings: 65, predicted: 70 },
  { month: "Feb", bookings: 59, predicted: 63 },
  { month: "Mar", bookings: 80, predicted: 85 },
  { month: "Apr", bookings: 81, predicted: 78 },
  { month: "May", bookings: 56, predicted: 60 },
  { month: "Jun", bookings: 55, predicted: 58 },
  { month: "Jul", bookings: 40, predicted: 45 },
]

export function AIInsightsChart() {
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
      <div className="w-full space-y-3">
        <Skeleton className="h-[250px] w-full" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="bookings" fill="#8884d8" name="Actual Bookings" />
        <Bar dataKey="predicted" fill="#82ca9d" name="AI Predicted" />
      </BarChart>
    </ResponsiveContainer>
  )
}
