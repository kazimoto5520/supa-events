"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

// Sample responses - in a real app, these would come from an AI API
const sampleResponses: Record<string, string> = {
  hello: "Hello! How can I assist you with event planning today?",
  events:
    "Based on your preferences, I recommend checking out the Summer Music Festival in July. It matches your interest in live music events!",
  booking:
    "To book an event, simply navigate to the event details page and click the 'Book Now' button. You can select your tickets and complete payment securely.",
  payment:
    "We accept all major credit cards, PayPal, and bank transfers for event payments. All transactions are secured with industry-standard encryption.",
  cancel:
    "You can cancel a booking up to 48 hours before the event for a full refund. Go to 'My Bookings' in your dashboard to manage your reservations.",
  recommendations:
    "I've analyzed your past bookings and noticed you enjoy music events. Have you considered the upcoming Jazz Festival next month?",
  default:
    "I'm your AI assistant for event planning. I can help with finding events, booking tickets, and answering questions about upcoming events. What would you like to know?",
}

export function AIAssistant() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI event assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let responseContent = sampleResponses.default

      // Check for keywords in the input
      const lowerInput = input.toLowerCase()
      for (const [keyword, response] of Object.entries(sampleResponses)) {
        if (lowerInput.includes(keyword)) {
          responseContent = response
          break
        }
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 rounded-lg p-3",
                message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
              )}
              style={{ maxWidth: "80%" }}
            >
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background">
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className="flex-1 text-sm">
                {message.content}
                <div className="mt-1 text-xs opacity-60">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 rounded-lg p-3 bg-muted" style={{ maxWidth: "80%" }}>
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

      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center gap-2"
        >
          <Input
            placeholder="Ask about events, bookings, or recommendations..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="mt-2 text-xs text-muted-foreground">
          Try asking about event recommendations, booking process, or payment options
        </div>
      </div>
    </div>
  )
}
