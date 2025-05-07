"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { ArrowLeft01Icon, ArrowRight01Icon, Search01Icon, ViewIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { DateRangePicker } from "./DateRangePicker";

interface ActiveStandingOrder {
    id: number;
    debitAcc: string;
    creditAcc: string;
    receiverAddress: string;
    amount: number;
    currency: string;
    narrations: string;
    occurrence: string;
    runDate: string;
    status: string;
    createdBy: string;
}

const activeStandingOrders: ActiveStandingOrder[] = [
    {
        id: 1,
        debitAcc: "123456789",
        creditAcc: "987654321",
        receiverAddress: "receiver@example.com",
        amount: 5000,
        currency: "USD",
        narrations: "Monthly subscription",
        occurrence: "Monthly",
        runDate: "2025-04-01",
        status: "Active",
        createdBy: "Admin",
    },
    {
        id: 2,
        debitAcc: "223344556",
        creditAcc: "665544332",
        receiverAddress: "receiver2@example.com",
        amount: 10000,
        currency: "EUR",
        narrations: "Loan repayment",
        occurrence: "Weekly",
        runDate: "2025-03-25",
        status: "Pending",
        createdBy: "User123",
    },
];

const columns: ColumnDef<ActiveStandingOrder>[] = [
    {
        accessorKey: "id",
        header: "S/N",
        cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
        accessorKey: "debitAcc",
        header: "Debit Acc",
        cell: ({ row }) => <div>{row.getValue("debitAcc")}</div>,
    },
    {
        accessorKey: "creditAcc",
        header: "Credit Acc",
        cell: ({ row }) => <div>{row.getValue("creditAcc")}</div>,
    },
    {
        accessorKey: "receiverAddress",
        header: "Receiver Address",
        cell: ({ row }) => <div>{row.getValue("receiverAddress")}</div>,
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <div>{(row.getValue("amount") as number).toLocaleString()}</div>,
    },
    {
        accessorKey: "currency",
        header: "Currency",
        cell: ({ row }) => <div>{row.getValue("currency")}</div>,
    },
    {
        accessorKey: "narrations",
        header: "Narrations",
        cell: ({ row }) => <div>{row.getValue("narrations")}</div>,
    },
    {
        accessorKey: "occurrence",
        header: "Occurrence",
        cell: ({ row }) => <div>{row.getValue("occurrence")}</div>,
    },
    {
        accessorKey: "runDate",
        header: "Run Date",
        cell: ({ row }) => <div>{row.getValue("runDate")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
        accessorKey: "createdBy",
        header: "Created By",
        cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
    },
];


export default function VendorBookingTable() {
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: activeStandingOrders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="bg-white p-4 border rounded-lg">
            <div className="flex items-center justify-between py-4">
                <h2 className="text-lg font-semibold text-gray-800">Standing Orders History List</h2>
                <div className="flex gap-4 items-center">
                    <div className="relative max-sm:w-full">
                        <Input
                            placeholder="Search..."
                            value={String(table.getColumn("batchName")?.getFilterValue() ?? "")}
                            onChange={(event) =>
                                table.getColumn("batchName")?.setFilterValue(event.target.value)
                            }
                            className="pr-8 bg-gray-100 max-sm:w-full"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center text-center py-3 px-3">
                            <Search01Icon size={18} className="text-muted-foreground" />
                        </div>
                    </div>

                    {/* <DateRangePicker /> */}

                </div>
            </div>
            <Table>
                <TableHeader className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center py-4">
                                No data available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center justify-center py-4">
                    {/* Pagination for larger screens */}
                    <div className="hidden sm:flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ArrowLeft01Icon size={16} />
                        </Button>
                        {Array.from({ length: table.getPageCount() }, (_, index) => (
                            <Button
                                key={index}
                                variant={table.getState().pagination.pageIndex === index ? "default" : "outline"}
                                size="sm"
                                onClick={() => table.setPageIndex(index)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ArrowRight01Icon size={16} />
                        </Button>
                    </div>

                    {/* Pagination for mobile */}
                    <div className="sm:hidden flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
