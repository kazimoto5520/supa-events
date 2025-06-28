"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { useBookingInsightsQuery } from "@/hooks/use-ai-queries"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, TrendingUp, Calendar, Users } from "lucide-react"

interface AIInsightsChartProps {
  accessToken?: string;
  userId?: string;
}

export function AIInsightsChart({ accessToken, userId }: AIInsightsChartProps) {
  const { 
    data: insightsData, 
    isLoading, 
    error,
    isError 
  } = useBookingInsightsQuery(accessToken, userId);

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load booking insights. Please try again later.
          {error?.message && ` Error: ${error.message}`}
        </AlertDescription>
      </Alert>
    );
  }

  if (!insightsData || !insightsData.insights?.length) {
    return (
      <Alert>
        <Calendar className="h-4 w-4" />
        <AlertDescription>
          No booking insights available at the moment.
        </AlertDescription>
      </Alert>
    );
  }

  const { insights, totalBookings, userBookings, generatedAt } = insightsData;

  return (
    <div className="w-full space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings?.toLocaleString() || 0}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        {userId && (
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Your Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{userBookings?.toLocaleString() || 0}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="text-sm font-semibold text-gray-900">
                {generatedAt ? new Date(generatedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Booking Trends & AI Predictions</h3>
          <p className="text-sm text-gray-600">Actual bookings vs AI-predicted trends by month</p>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={insights}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => [
                  value.toLocaleString(),
                  name === 'bookings' ? 'Actual Bookings' : 'AI Predicted'
                ]}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="bookings" 
                fill="#3b82f6" 
                name="Actual Bookings"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="predicted" 
                fill="#10b981" 
                name="AI Predicted"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}