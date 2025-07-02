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
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { AccountSummary } from '@/services/account/type'
import { formatMoney } from '@/lib/utils'

interface PaymentHistoryProps {
    payments: AccountSummary[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

export function PaymentHistory({ payments, isLoading, isError }: PaymentHistoryProps) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredPayments = Array.isArray(payments)
    ? payments
        .filter(payment =>
            payment.rowId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.lastTransactionAt?.includes(searchTerm)
        )
        .sort((a, b) =>
            new Date(b.lastTransactionAt).getTime() - new Date(a.lastTransactionAt).getTime()
        )
    : []


    return (
        <div className="space-y-4">
            <Input
                type="text"
                placeholder="Search by Transaction ID or Date"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPayments?.map((payment) => (
                        <TableRow key={payment.rowId}>
                            <TableCell className="font-medium">{payment.rowId}</TableCell>
                            <TableCell>{formatMoney((Number(payment.totalDeposits.toFixed(2)) + Number(payment.totalWithdrawals.toFixed(2))), payment?.account?.currency)}</TableCell>
                            <TableCell>{payment.lastTransactionAt ? new Date(payment.lastTransactionAt).toLocaleDateString() : new Date().toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge variant={"success"}>
                                    {/* {payment.status} */}
                                    Completed
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

