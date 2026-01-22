import { NextResponse } from "next/server";

export function middleware(request){
    
    if (request.nextUrl.pathname.startsWith('/list')) {
        console.log(request.headers.get('sec-ch-ua-platform'))
        console.log(new Date())
        return NextResponse.next()
    }
}