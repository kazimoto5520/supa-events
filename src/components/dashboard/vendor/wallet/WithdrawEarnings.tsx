"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

const formSchema = z.object({
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number",
    }),
    method: z.enum(["paypal", "bank_transfer"]),
    accountDetails: z.string().min(1, {
        message: "Account details are required",
    }),
})

export function WithdrawEarnings() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            method: "paypal",
            accountDetails: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        // Here you would typically send the withdrawal request to your backend
        console.log(values)
        setTimeout(() => {
            setIsSubmitting(false)
            // toast({
            //     title: "Withdrawal Request Submitted",
            //     description: `$${values.amount} will be sent to your ${values.method === 'paypal' ? 'PayPal' : 'bank'} account.`,
            // })
            form.reset()
        }, 2000)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount to Withdraw</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the amount you wish to withdraw.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Withdrawal Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a withdrawal method" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose your preferred withdrawal method.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="accountDetails"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Details</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter account details" {...field} />
                            </FormControl>
                            <FormDescription>
                                {form.watch("method") === "paypal"
                                    ? "Enter your PayPal email address."
                                    : "Enter your bank account details."}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit Withdrawal Request"}
                </Button>
            </form>
        </Form>
    )
}

