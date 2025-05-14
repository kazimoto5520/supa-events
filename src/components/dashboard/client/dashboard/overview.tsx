"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  {
    name: "Jan",
    total: 1,
  },
  {
    name: "Feb",
    total: 3,
  },
  {
    name: "Mar",
    total: 2,
  },
  {
    name: "Apr",
    total: 4,
  },
  {
    name: "May",
    total: 3,
  },
  {
    name: "Jun",
    total: 2,
  },
  {
    name: "Jul",
    total: 5,
  },
  {
    name: "Aug",
    total: 2,
  },
  {
    name: "Sep",
    total: 6,
  },
  {
    name: "Oct",
    total: 3,
  },
  {
    name: "Nov",
    total: 4,
  },
  {
    name: "Dec",
    total: 3,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip formatter={(value) => [`${value} events`, "Bookings"]} labelFormatter={(label) => `Month: ${label}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
