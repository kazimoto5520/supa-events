"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

// Sample data - in a real app, this would come from your API
const data = [
  { month: "Jan", actual: 4000, predicted: 4400 },
  { month: "Feb", actual: 3000, predicted: 3200 },
  { month: "Mar", actual: 2000, predicted: 2800 },
  { month: "Apr", actual: 2780, predicted: 3000 },
  { month: "May", actual: 1890, predicted: 2300 },
  { month: "Jun", actual: 2390, predicted: 2800 },
  { month: "Jul", actual: 3490, predicted: 3800 },
]

export function RevenueAnalysis() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)

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
      <LineChart
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
        <Tooltip formatter={(value) => `$${value}`} />
        <Legend />
        <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Revenue" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="AI Predicted" />
      </LineChart>
    </ResponsiveContainer>
  )
}
