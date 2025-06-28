"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentHistory } from "@/components/dashboard/vendor/wallet/PaymentHistory"
import { WithdrawEarnings } from "@/components/dashboard/vendor/wallet/WithdrawEarnings"
import Cookies from "js-cookie"
import { useQuery } from '@tanstack/react-query'
import { getAccountDetails, getAccountSummaries } from '@/services/account/account-service'

export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState("withdraw")

    const accessToken = Cookies.get("supa.events.co.tz.access");

    const {
        data: accountDetails,
        isLoading: isAccountDetailsLoading,
        isError: isAccountDetailsError,
    } = useQuery({
        queryKey: ["account-details"],
        queryFn: () => getAccountDetails(accessToken)
    });

    const {
        data: accountSummary,
        isLoading: isAccountSummaryLoading,
        isError: isAccountSummaryError,
    } = useQuery({
        queryKey: ["account-summaries"],
        queryFn: () => getAccountSummaries(accessToken)
    });

    const account = accountDetails?.data;

    if (isAccountDetailsLoading) {
        return <div>Loading...</div>;
    }

    if (isAccountDetailsError || !account) {
        return <div>Failed to load account details</div>;
    }

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
                        <span className="text-xl font-mono">{account?.accountNumber}</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Wallet Balance</CardTitle>
                        <CardDescription>Current balance in your wallet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <span className="text-xl font-bold">{account?.balance}</span>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Payment Management</CardTitle>
                    <CardDescription>View your payment history and withdraw your earnings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="withdraw">Withdraw Earnings</TabsTrigger>
                            <TabsTrigger value="history">Payment History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="withdraw">
                            <WithdrawEarnings />
                        </TabsContent>
                        <TabsContent value="history">
                            <PaymentHistory payments={accountSummary?.data} isLoading={isAccountSummaryLoading} isError={isAccountSummaryError} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
