"use client"

import ClientDepositForm from '@/components/dashboard/client/payments/client-deposit-form'
import { PaymentHistory } from "@/components/dashboard/vendor/wallet/PaymentHistory"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'

export default function ClientPaymentsPage() {
    const [activeTab, setActiveTab] = useState("deposit")

    // Example data, replace with real data as needed
    const accountNumber = "000033300000"
    const walletBalance = "TZS 1,500,000.00"

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Payments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Number</CardTitle>
                        <CardDescription>Your wallet account number</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <span className="text-xl font-mono">{accountNumber}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Wallet Balance</CardTitle>
                        <CardDescription>Current balance in your wallet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <span className="text-xl font-bold">{walletBalance}</span>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Payment Management</CardTitle>
                    <CardDescription>View your payment history and deposit.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="deposit">Deposit</TabsTrigger>
                            <TabsTrigger value="history">Payment History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="deposit">
                            <ClientDepositForm />
                        </TabsContent>
                        <TabsContent value="history">
                            <PaymentHistory />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
