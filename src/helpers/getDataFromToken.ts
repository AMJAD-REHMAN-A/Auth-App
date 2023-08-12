import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: any) => {
    try {
        const token: any = request.cookies.get("token").value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    } catch (error: any) {
        
    }
}