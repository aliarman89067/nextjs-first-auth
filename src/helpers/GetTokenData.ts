import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GetTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET!);
    return tokenData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
