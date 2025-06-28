import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatResponse, getEventRecommendations, getEventDetails, getBookingHelp, getBookingInsights } from "@/services/intelligence/ai-service";
import { ChatRequest, ChatResponse } from "@/services/intelligence/type";

// Query keys
export const AI_QUERY_KEYS = {
  chat: ['ai', 'chat'] as const,
  recommendations: (userId: string) => ['ai', 'recommendations', userId] as const,
  eventDetails: (eventId: string) => ['ai', 'eventDetails', eventId] as const,
  bookingHelp: (eventId: string) => ['ai', 'bookingHelp', eventId] as const,
  bookingInsights: (userId?: string) => ['ai', 'bookingInsights', userId] as const,
};

// Chat mutation hook
export const useChatMutation = (accessToken?: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (chatRequest: ChatRequest) => getChatResponse(accessToken, chatRequest),
    onSuccess: (data: ChatResponse) => {
      // Optionally invalidate related queries
      queryClient.invalidateQueries({ queryKey: AI_QUERY_KEYS.chat });
    },
    onError: (error) => {
      console.error('Chat mutation error:', error);
    },
  });
};

// Recommendations query hook
export const useRecommendationsQuery = (
  accessToken: string | undefined,
  userId: string,
  preferences?: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.recommendations(userId),
    queryFn: () => getEventRecommendations(accessToken, userId, preferences),
    enabled: enabled && !!userId && !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Event details query hook
export const useEventDetailsQuery = (
  accessToken: string | undefined,
  eventId: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.eventDetails(eventId),
    queryFn: () => getEventDetails(accessToken, eventId),
    enabled: enabled && !!eventId && !!accessToken,
    staleTime: 10 * 60 * 1000, // 10 minute
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Booking help query hook
export const useBookingHelpQuery = (
  accessToken: string | undefined,
  eventId: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.bookingHelp(eventId),
    queryFn: () => getBookingHelp(accessToken, eventId),
    enabled: enabled && !!eventId && !!accessToken,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Quick question mutation (reuses chat mutation)
export const useQuickQuestionMutation = (accessToken?: string) => {
  return useChatMutation(accessToken);
};

export const useBookingInsightsQuery = (
  accessToken: string | undefined,
  userId?: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.bookingInsights(userId),
    queryFn: () => getBookingInsights(accessToken, userId),
    enabled: enabled && !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};