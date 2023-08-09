import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Successfuly loged out",
            success: true
        });
        response.cookies.set("token", "", { httpsOnly: true, expires: new Date(0)})
        return response;
    } catch (error) {
        return NextResponse.json({message: "Not successful", status: 500})
    }
}