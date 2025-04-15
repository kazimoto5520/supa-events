"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import {EventForm} from "@/components/dashboard/vendor/events/EventForm";
import {EventList} from "@/components/dashboard/vendor/events/EventList";

interface Event {
    id?: number;
    name: string;
    category: string;
    description: string;
    date: string;
    price: number;
    status: "available" | "soldout" | "unavailable";
}

export default function EventsPage() {
    const [isAddingEvent, setIsAddingEvent] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Events</h1>
                <Button onClick={() => setIsAddingEvent(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                </Button>
            </div>
            {(isAddingEvent || editingEvent) && (
                <EventForm
                    event={editingEvent}
                    onClose={() => {
                        setIsAddingEvent(false)
                        setEditingEvent(null)
                    }}
                />
            )}
            {/* <EventList onEdit={(event) => setEditingEvent(event)} /> */}
        </div>
    )
}

