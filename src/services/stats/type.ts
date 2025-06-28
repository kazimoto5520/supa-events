export interface CardStats {
  totalBookings: number;
  deltaBookings: number;
  upcomingEventsCount: number;
  nextEventInDays: number;
  totalSpent: string;
  deltaSpent: string;
  eventCategoriesCount: number;
  categoryList: string[];
};

export interface CardStatsResponse {
  message: string;
  status: string;
  data: CardStats;
}