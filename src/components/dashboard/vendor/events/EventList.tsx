"use client"

import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Edit, AlertTriangle, Trash } from 'lucide-react'

interface Event {
    id: number
    name: string
    category: string
    date: string
    status: string
    description?: string | undefined
    price?: number
}

// Define the props for EventList
interface EventListProps {
    onEdit: (event: Event | null) => void
}

// Mock data (replace with actual data fetching in a real application)
const mockEvents: Event[] = [
    { id: 1, name: 'Summer Music Festival', category: 'Music', date: '2024-07-15', status: 'Upcoming' },
    { id: 2, name: 'Tech Conference 2024', category: 'Technology', date: '2024-09-22', status: 'Open for Registration' },
    { id: 3, name: 'Food & Wine Expo', category: 'Culinary', date: '2024-05-10', status: 'Sold Out' },
    { id: 4, name: 'Yoga Retreat', category: 'Wellness', date: '2024-08-05', status: 'Available' },
]

export function EventList({ onEdit } : EventListProps) {
    const [events, setEvents] = useState(mockEvents)

    const handleDelete = (id: number) => {
        setEvents(events.filter(event => event.id !== id))
    }

    const handleMarkUnavailable = (id: number) => {
        setEvents(events.map(event =>
            event.id === id ? { ...event, status: 'Unavailable' } : event
        ))
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map((event) => (
                    <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.category}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>
                            <Badge variant={event.status === 'Available' ? 'default' :
                                event.status === 'Sold Out' ? 'secondary' :
                                    event.status === 'Unavailable' ? 'destructive' : 'outline'}>
                                {event.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onEdit(event)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleMarkUnavailable(event.id)}>
                                        <AlertTriangle className="mr-2 h-4 w-4" />
                                        Mark as Unavailable
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(event.id)}>
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

