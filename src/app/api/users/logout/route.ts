import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout Successfully",
      status: 200,
    });
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (error: any) {
    NextResponse.json({ status: 400, success: false, error: error.message });
  }
}
