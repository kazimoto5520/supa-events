export interface ChatResponse {
  message: string;
  status: string;
  timestamp: number;
}

export interface ChatRequest {
  message: string;
  userId: string;
}

export interface BookingInsightData {
  month: string;
  bookings: number;
  predicted: number;
}

export interface BookingInsightsResponse {
  insights: BookingInsightData[];
  totalBookings: number;
  userBookings: number;
  generatedAt: string; // ISO date string
}