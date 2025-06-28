import { z } from "zod";

// Chat request schema
export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(500, "Message is too long"),
  userId: z.string().optional(),
});

// Chat response schema
export const chatResponseSchema = z.object({
  message: z.string(),
  status: z.enum(["success", "error"]),
  timestamp: z.number(),
});

// Quick question schema
export const quickQuestionSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  userId: z.string().optional(),
});

// Export types
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type QuickQuestion = z.infer<typeof quickQuestionSchema>;