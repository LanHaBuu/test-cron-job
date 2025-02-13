import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const allowedOrigin = "https://test-cron-job-mu.vercel.app";
    const origin = req.headers.get("origin");

    // If no origin header is present, reject the request
    if (!origin || origin !== allowedOrigin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next();
}

// Apply middleware only to the API route
export const config = {
    matcher: "/api/cron-average",
};
