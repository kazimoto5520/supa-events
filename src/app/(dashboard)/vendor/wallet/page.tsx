"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {PaymentHistory} from "@/components/dashboard/vendor/wallet/PaymentHistory";
import {WithdrawEarnings} from "@/components/dashboard/vendor/wallet/WithdrawEarnings";

export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState("history")

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Payments</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Payment Management</CardTitle>
                    <CardDescription>View your payment history and withdraw your earnings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="history">Payment History</TabsTrigger>
                            <TabsTrigger value="withdraw">Withdraw Earnings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="history">
                            <PaymentHistory />
                        </TabsContent>
                        <TabsContent value="withdraw">
                            <WithdrawEarnings />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

