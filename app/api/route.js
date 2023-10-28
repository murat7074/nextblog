import { NextResponse } from "next/server";


// http://localhost:3000/api  de aşağıdaki route gözükür

export async function GET(request) {
return NextResponse.json({message:"Hello from Next api"})
}


