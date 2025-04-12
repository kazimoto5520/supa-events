"use client"

import Link from 'next/link'
import {ArrowDown01, Search} from 'lucide-react'
import Image from "next/image";
import {Notification03Icon} from "hugeicons-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function VendorTopHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        Cookies.remove("supa.events.co.tz.access");
        router.replace("/signin");
      };
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
            <div className="flex items-center">
                <Link href="/public" className="text-2xl font-bold text-gray-800">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="h-8 w-auto"
                    />
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Notification03Icon size={20}/>
                </button>
                <div className="flex space-x-2 items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex space-x-2 items-center cursor-pointer">
                            <Avatar>
                                <AvatarImage src="/assets/images/default-user.png"/>
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>

                            <div className="font-medium text-sm">
                                <h1>Admin</h1>
                            </div>

                            <div className="text-gray-400">
                                <ArrowDown01 size={16}/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>


</header>
)
}

