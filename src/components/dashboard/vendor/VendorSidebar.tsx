import Link from 'next/link'
import {
    Calendar01Icon,
    ChartBubble01Icon,
    CursorPointer01Icon,
    Home01Icon,
    Settings01Icon,
    Wallet01Icon
} from "hugeicons-react";

export function VendorSidebar() {
    return (
        <aside className="w-64 bg-gray-100 h-screen p-4">
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/vendor/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <Home01Icon size={20}/>
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/vendor/events" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <Calendar01Icon size={20}/>
                            <span>Events</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/vendor/bookings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <CursorPointer01Icon size={20}/>
                            <span>Bookings</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/vendor/wallet" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <Wallet01Icon size={20}/>
                            <span>Wallet</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/vendor/analytics" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <ChartBubble01Icon size={20}/>
                            <span>Analytics</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/vendor/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <Settings01Icon size={20}/>
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

