"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send, Bot, User, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useChatMutation, useQuickQuestionMutation } from "@/hooks/use-ai-queries"
import { chatRequestSchema, } from "@/services/intelligence/validation"
import { ChatRequest } from "@/services/intelligence/type"
import Cookies from "js-cookie"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/services/user/user-service"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface AIAssistantProps {
  accessToken?: string
  className?: string
}

export function AIAssistant({ className }: AIAssistantProps) {
  const accessToken = Cookies.get("supa.events.co.tz.access");
  // const userId = Cookies.get("supa.events.co.tz.id") || "default_user_id"; // Fallback if user ID is not set
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI event assistant. I can help you find events, make bookings, and answer questions about our event system. What would you like to know?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["get-user"],
    queryFn: () => getUser(accessToken)
  });


  const messagesEndRef = useRef<HTMLDivElement>(null)

  // React Hook Form setup
  const form = useForm<ChatRequest>({
    resolver: zodResolver(chatRequestSchema),
    defaultValues: {
      message: "",
      userId: user?.data?.rowId || "default_user_id", // Use user ID from query or fallback
    },
  })

  // React Query mutations
  const chatMutation = useChatMutation(accessToken)
  const quickQuestionMutation = useQuickQuestionMutation(accessToken)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle successful chat response
  useEffect(() => {
    if (chatMutation.isSuccess && chatMutation.data) {
      const aiMessage: Message = {
        id: `ai_${Date.now()}`,
        content: chatMutation.data.message,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      chatMutation.reset()
    }
  }, [chatMutation.isSuccess, chatMutation.data])

  // Handle chat errors
  useEffect(() => {
    if (chatMutation.isError) {
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        content: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team for assistance with event bookings.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      chatMutation.reset()
    }
  }, [chatMutation.isError])

  // Handle successful quick question response
  useEffect(() => {
    if (quickQuestionMutation.isSuccess && quickQuestionMutation.data) {
      const aiMessage: Message = {
        id: `ai_quick_${Date.now()}`,
        content: quickQuestionMutation.data.message,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      quickQuestionMutation.reset()
    }
  }, [quickQuestionMutation.isSuccess, quickQuestionMutation.data])

  // Handle quick question errors
  useEffect(() => {
    if (quickQuestionMutation.isError) {
      const errorMessage: Message = {
        id: `error_quick_${Date.now()}`,
        content: "Sorry, I couldn't process that quick question. Please try typing your question manually.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      quickQuestionMutation.reset()
    }
  }, [quickQuestionMutation.isError])

  const onSubmit = (data: ChatRequest) => {
    if (!data.message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: data.message,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Send to API
    chatMutation.mutate({
      message: data.message,
      userId: user?.data?.rowId || "default_user_id", // Use user ID from query or fallback
    })

    // Reset form
    form.reset({ message: "", userId: user?.data?.rowId })
  }

  const handleQuickQuestion = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user_quick_${Date.now()}`,
      content: question,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Send to API
    quickQuestionMutation.mutate({
      message: question,
      userId: user?.data?.rowId || "default_user_id", // Use user ID from query or fallback
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      form.handleSubmit(onSubmit)()
    }
  }

  const isLoading = chatMutation.isPending || quickQuestionMutation.isPending

  return (
    <div className={cn("flex flex-col h-[600px] border rounded-lg", className)}>
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <h3 className="font-semibold">Event Assistant</h3>
        <p className="text-sm opacity-90">Ask me about events, bookings, and recommendations</p>
      </div>

      {/* Error Alert */}
      {(chatMutation.isError || quickQuestionMutation.isError) && (
        <Alert variant="destructive" className="m-4 mb-0">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to connect to the AI service. Please check your connection and try again.
          </AlertDescription>
        </Alert>
      )}

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 rounded-lg p-3",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground max-w-[80%]"
                  : "bg-muted max-w-[80%]",
              )}
            >
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-foreground" />
                )}
              </div>
              <div className="flex-1 text-sm">
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="mt-1 text-xs opacity-60">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 rounded-lg p-3 bg-muted max-w-[80%]">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      <div className="px-4 py-2 border-t">
        <div className="flex flex-wrap gap-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion("What events are available this month?")}
            disabled={isLoading}
          >
            Available Events
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion("How do I book an event?")}
            disabled={isLoading}
          >
            How to Book
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion("Can you recommend events for me?")}
            disabled={isLoading}
          >
            Recommendations
          </Button>
        </div>
      </div>

      {/* Input Area with React Hook Form */}
      <div className="border-t p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Ask about events, bookings, or recommendations..."
                      disabled={isLoading}
                      onKeyDown={handleKeyDown}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !form.watch("message")?.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-2 text-xs text-muted-foreground">
          I can help with event information, booking assistance, and personalized recommendations
        </div>
      </div>
    </div>
  )
}