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
import { useQuery } from "@tanstack/react-query";
import { getAllVendorBookings } from "@/services/booking/bookingService";
import { formatMoney } from "@/lib/utils";
import { Booking } from "@/services/booking/type";
import Cookies from "js-cookie";

export default function VendorBookingTable() {
    const [rowSelection, setRowSelection] = React.useState({});
    const accessToken = Cookies.get("supa.events.co.tz.access");

    const columns: ColumnDef<Booking>[] = [
        {
            accessorKey: "sn",
            header: "S/N",
            cell: ({ row }) => <div>{row.index + 1}</div>,
        },
        {
            accessorKey: "event.name",
            header: "Event Name",
            cell: ({ row }) => <div>{row.original.event?.name}</div>,
        },
        {
            accessorKey: "user.fullName",
            header: "Customer Name",
            cell: ({ row }) => {
                const user = row.original.user;
                return <div>{`${user.firstName} ${user.middleName ?? ""} ${user.lastName}`.trim()}</div>;
            },
        },
        {
            accessorKey: "user.phoneNumber",
            header: "Phone Number",
            cell: ({ row }) => <div>{row.original.user?.phoneNumber}</div>,
        },
        {
            accessorKey: "quantity",
            header: "Tickets",
            cell: ({ row }) => <div>{row.original.quantity}</div>,
        },
        {
            accessorKey: "totalAmount",
            header: "Total Amount",
            cell: ({ row }) => <div>{formatMoney(parseFloat(row.original.totalAmount))}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status as "P" | "C" | "F";
                const statusStyles: Record<"P" | "C" | "F", string> = {
                    P: "bg-yellow-100 text-yellow-800",
                    C: "bg-green-100 text-green-800",
                    F: "bg-red-100 text-red-800",
                };
                return (
                    <div
                        className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}
                    >
                        {status === "P" ? "Pending" : status === "C" ? "Complete" : "Failed"}
                    </div>
                );
            }

        },
        {
            accessorKey: "bookingDate",
            header: "Booking Date",
            cell: ({ row }) => <div>{new Date(row.original.bookingDate).toLocaleDateString()}</div>,
        },
        {
            accessorKey: "paymentDate",
            header: "Payment Date",
            cell: ({ row }) => (
                <div>
                    {row.original.paymentDate ? new Date(row.original.paymentDate).toLocaleDateString() : "N/A"}
                </div>
            ),
        },
        {
            accessorKey: "paymentR</div>eference",
            header: "Payment Ref",
            cell: ({ row }) => <div>{row.original.paymentReference}</div>,
        },
        {
            accessorKey: "eventStartDate",
            header: "Event Start Date",
            cell: ({ row }) => <div>{new Date(row.original.eventStartDate).toLocaleDateString()}</div>,
        },
        {
            accessorKey: "eventEndDate",
            header: "Event End Date",
            cell: ({ row }) => <div>{new Date(row.original.eventEndDate).toLocaleDateString()}</div>,
        },
        {
            accessorKey: "eventTime",
            header: "Event Time",
            cell: ({ row }) => <div>{row.original.eventTime}</div>,
        },
        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <ViewIcon size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Pay</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const {
        data: bookings,
        isLoading: isBookingsLoading,
        isError: isBookingsError,
    } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => getAllVendorBookings(accessToken)
    });

    const bookingsList = React.useMemo(() => {
        const list = Array.isArray(bookings?.data) ? bookings.data : [];
        return [...list].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [bookings]);

    const table = useReactTable({
        data: bookingsList,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="bg-white p-4 border rounded-lg">
            <div className="flex items-center justify-between py-4">
                <h2 className="text-lg font-semibold text-gray-800">All Bookings</h2>
                <div className="flex gap-4 items-center">
                    <div className="relative max-sm:w-full">
                        <Input
                            placeholder="Search..."
                            value={String(table.getColumn("status")?.getFilterValue() ?? "")}
                            onChange={(event) =>
                                table.getColumn("status")?.setFilterValue(event.target.value)
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
