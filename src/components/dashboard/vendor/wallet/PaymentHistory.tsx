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

// Mock data (replace with actual data fetching in a real application)
const mockPayments = [
    { id: 'TRX001', amount: 500, date: '2024-03-15', status: 'Completed' },
    { id: 'TRX002', amount: 750, date: '2024-03-10', status: 'Pending' },
    { id: 'TRX003', amount: 1000, date: '2024-03-05', status: 'Completed' },
    { id: 'TRX004', amount: 250, date: '2024-02-28', status: 'Failed' },
    { id: 'TRX005', amount: 1500, date: '2024-02-20', status: 'Completed' },
]

export function PaymentHistory() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredPayments = mockPayments.filter(payment =>
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.date.includes(searchTerm)
    )

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
                    {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>${payment.amount.toFixed(2)}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>
                                <Badge variant={
                                    payment.status === 'Completed' ? 'success' :
                                        payment.status === 'Pending' ? 'warning' :
                                            'destructive'
                                }>
                                    {payment.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

