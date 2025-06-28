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
    getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { ArrowLeft01Icon, ArrowRight01Icon, Search01Icon, ViewIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/services/event/type";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/services/event/eventService";
import Cookies from "js-cookie";

export default function EventTable() {
    const [rowSelection, setRowSelection] = React.useState({});
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const router = useRouter();
    const accessToken = Cookies.get("supa.events.co.tz.access");

    const {
        data: events,
        isLoading: iseventsLoading,
        isError: iseventsError,
    } = useQuery({
        queryKey: ["events"],
        queryFn: () => getAllEvents(accessToken)
    });

    const columns: ColumnDef<Event>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
        },
        {
            accessorKey: "name",
            header: "Event Name",
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "description",
            header: "Event Description",
            cell: ({ row }) => <div>{row.getValue("description")}</div>,
        },
        {
            accessorKey: "category",
            header: "Event Category",
            cell: ({ row }) => {
                const category = row.original.category;
                return (
                    <div className="capitalize">
                        {category.name}
                    </div>
                )
            },
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => <div>{(row.getValue("amount") as number).toLocaleString()}</div>,
        },
        {
            accessorKey: "user",
            header: "Created By",
            cell: ({ row }) => {
                const user = row.original.user;
                return (
                    <div className="capitalize">
                        {user.firstName} {user.middleName} {user.lastName}
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status");
                return (
                    <div className="uppercase">
                        {status === "P" ? (
                            <Badge>{String("Pending")}</Badge>
                        ) : status === "A" ? (
                            <Badge variant={"success"}>{String("Active")}</Badge>
                        ) : status === "I" ? (
                            <Badge variant={"destructive"}>{"Inactive"}</Badge>
                        ) : (
                            <Badge>{String(status)}</Badge>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: "createdAt",
            header: "Initiated Time",
            cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>,
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <span className="bg-blue-50 p-3 rounded-md">
                                    <ViewIcon className="h-5 w-5 text-primary" />
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                View
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const eventList = React.useMemo(() => {
        const list = Array.isArray(events?.data) ? events.data : [];
        return [...list].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [events]);


    const table = useReactTable({
        data: eventList,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="bg-white p-4 border rounded-2xl">
            <div className="flex items-center justify-between py-4">
                <h2 className="text-lg font-semibold text-gray-800">Event List</h2>
                <div className="flex gap-4 items-center">
                    <div className="relative max-sm:w-full">
                        <Input
                            placeholder="Search..."
                            value={globalFilter || ""}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="pr-8 bg-gray-100 max-sm:w-full"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center text-center py-3 px-3">
                            <Search01Icon size={18} className="text-muted-foreground" />
                        </div>
                    </div>
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
                                No data available
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
