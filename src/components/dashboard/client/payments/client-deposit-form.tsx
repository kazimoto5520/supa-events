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
import { ApiError } from '@/services/auth/type'
import { ApiDepositResponse, DepositRequest } from '@/services/account/type'
import { makeClientDeposit } from '@/services/account/account-service'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import Cookies from "js-cookie"

const formSchema = z.object({
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number",
    }),
    method: z.enum(["mpesa", "mix_by_yas", "halopesa", "airtelmoney"]),
    accountDetails: z.string().min(1, {
        message: "Account number or phone number is required",
    }),
})

const ClientDepositForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const accessToken = Cookies.get("supa.events.co.tz.access");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            method: "mpesa",
            accountDetails: "",
        },
    })

    const mutation = useMutation<ApiDepositResponse, ApiError, DepositRequest>({
        mutationFn: (request: DepositRequest) => makeClientDeposit(accessToken, request),
        onSuccess: (response) => {
            console.log("Transaction successful:", response)
            toast({
                variant: "success",
                title: "Success",
                description: "Transaction successful",
                duration: 5000,
                action: <ToastAction altText="Close">Close</ToastAction>,
            });

            form.reset();
            
        },
        onError: (error) => {
            const errorData = error?.response?.data;
            console.error("Transaction failed:", errorData);

            if (errorData?.validationErrors?.length) {
                toast({
                    variant: "destructive",
                    title: "Validation error",
                    description: errorData.validationErrors.join(", "),
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });
            } else if (errorData?.error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: errorData.error,
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });
            } else if (errorData?.errorDescription) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: errorData.errorDescription,
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });

            } else if (errorData?.message) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: errorData.message,
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "An error occurred",
                    duration: 5000,
                    action: <ToastAction altText="Close">Close</ToastAction>,
                });
            }
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const request: DepositRequest = {
            amount: Number(values.amount),
            method: values.method,
            accountDetails: values.accountDetails,
        };

        mutation.mutate(request);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount to Deposit</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the amount you wish to deposit.
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
                            <FormLabel>Deposit Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a deposit method" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="mpesa">MPESA</SelectItem>
                                    <SelectItem value="mix_by_yas">Mix By Yas</SelectItem>
                                    <SelectItem value="halopesa">HaloPesa</SelectItem>
                                    <SelectItem value="airtelmoney">AirtelMoney</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose your preferred deposit method.
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
                            <FormLabel>Account Number / Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter account number or phone number" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter your account number or phone number.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit Deposit Request"}
                </Button>
            </form>
        </Form>
    )
}

export default ClientDepositForm