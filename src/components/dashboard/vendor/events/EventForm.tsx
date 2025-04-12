"use client"

import {useEffect, useState} from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Event name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    category: z.string({
        required_error: "Please select a category.",
    }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Please enter a valid date in YYYY-MM-DD format.",
    }),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
        message: "Please enter a valid price.",
    }),
    availability: z.enum(["available", "soldout", "unavailable"]),
})

interface Event {
    id?: number;
    name: string;
    category: string;
    description: string;
    date: string;
    price: number;
    status: "available" | "soldout" | "unavailable";
}


interface EventFormProps {
    event: Event | null;
    onClose: () => void
}

export function EventForm({ event, onClose }: EventFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            date: "",
            price: "",
            availability: "available",
        },
    })

    useEffect(() => {
        if (event) {
            const availability =
                ["available", "soldout", "unavailable"].includes(event.status.toLowerCase())
                    ? (event.status.toLowerCase() as "available" | "soldout" | "unavailable")
                    : "unavailable"; // Default to 'unavailable' if the status doesn't match

            form.reset({
                name: event.name,
                description: event.description || "",
                category: event.category,
                date: event.date,
                price: event.price?.toString() || "",
                availability,
            });
        }
    }, [event, form]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        // Here you would typically send the form data to your backend
        console.log(values)
        setTimeout(() => {
            setIsSubmitting(false)
            onClose()
        }, 1000)
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{event ? 'Edit Event' : 'Add New Event'}</CardTitle>
            </CardHeader>
            <CardContent>
                
            </CardContent>
        </Card>
    )
}

