import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("supa.events.co.tz.access")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp < Date.now() / 1000;

        if (isExpired) {
            const response = NextResponse.redirect(new URL("/signin", req.url));
            response.cookies.set("supa.events.co.tz.access", "", {
                maxAge: -1,
                path: "/",
            });
            return response;
        }

        const userRoles = payload.roles || [];
        const roleNames = userRoles.map((role: any) => role.name);
        const pathname = req.nextUrl.pathname;


    } catch (error) {
        console.error("Error decoding token:", error);
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/vendor/:path*", "/client/:path*"],
};