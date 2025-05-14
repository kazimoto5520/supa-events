import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIInsightsChart } from "@/components/dashboard/client/ai/ai-insights-chart"
import { RevenueAnalysis } from "@/components/dashboard/client/ai/revenue-analysis"
import { UserAcquisitionChart } from "@/components/dashboard/vendor/dashboard/UserAcquisitionChart"
import { EventRecommendations } from "@/components/dashboard/client/ai/event-recommendations"
import { AIAssistant } from "@/components/dashboard/client/ai/ai-assistant"

export const metadata: Metadata = {
  title: "AI Features | Client Dashboard",
  description: "AI-powered insights and recommendations for your event planning",
}

export default function ClientAIPage() {
  return (
    <div className="flex flex-col gap-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">
          Discover personalized insights and recommendations powered by artificial intelligence
        </p>
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Insights and Forecasting</CardTitle>
                <CardDescription>AI-powered analysis of event booking trends and predictions</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <AIInsightsChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Prediction and Analysis</CardTitle>
                <CardDescription>Projected revenue based on your booking patterns and event interests</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <RevenueAnalysis />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Acquisition Analysis</CardTitle>
              <CardDescription>Understanding how and when users engage with events</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <UserAcquisitionChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Recommendation Engine</CardTitle>
              <CardDescription>
                Personalized event suggestions based on your preferences and past bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventRecommendations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Virtual Assistant</CardTitle>
              <CardDescription>Get real-time assistance with event bookings and questions</CardDescription>
            </CardHeader>
            <CardContent>
              <AIAssistant />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Forecasting</CardTitle>
                <CardDescription>Predicted attendance for upcoming events you{"'"}re interested in</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Chart visualization coming soon
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Trends</CardTitle>
                <CardDescription>Event popularity based on time of year</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Chart visualization coming soon
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
