import exp from "constants";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log("middleware ",req.url);
    if (req.url ==="/"){
        return NextResponse.redirect("/home")
    }
}

export { default} from "next-auth/middleware"

export const config = {
    matcher: "/home",
    runtime : 'edge'
}