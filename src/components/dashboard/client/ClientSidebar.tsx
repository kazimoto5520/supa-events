import Link from 'next/link'
import {
    AiBeautifyIcon,
    BrowserIcon,
    CursorPointer01Icon,
    Home01Icon,
    Settings01Icon,
    Wallet01Icon
} from "hugeicons-react";

export function ClientSidebar() {
    return (
        <aside className="w-64 bg-gray-100 h-screen p-4">
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/client/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <Home01Icon size={20}/>
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/client/events" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <BrowserIcon size={20}/>
                            <span>Browse</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/client/bookings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <CursorPointer01Icon size={20}/>
                            <span>My Bookings</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/client/payments" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <Wallet01Icon size={20}/>
                            <span>Payments</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/client/ai" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <AiBeautifyIcon size={20}/>
                            <span>Supa Events</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/client/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                            <Settings01Icon size={20}/>
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

