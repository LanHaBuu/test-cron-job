import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // const allowedOrigin = "https://test-cron-job-mu.vercel.app";
    // const origin = req.headers.get("origin") || req.headers.get("referer");

    // // Allow only requests from your website
    // if (!origin || !origin.startsWith(allowedOrigin)) {
    //     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    // return NextResponse.next();
    const allowedOrigin = "https://test-cron.vercel.app"; // Thay bằng domain của bạn
    const origin = req.headers.get("origin");
  
    if (origin && origin !== allowedOrigin) {
      return new Response("Forbidden", { status: 403 });
    }
  
    return new Response("OK", { status: 200 });
}

// Apply middleware only to the API route
export const config = {
    matcher: "/api/cron-average",
};
