import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const userDoc = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!userDoc) {
      return NextResponse.json({ success: false, error: "User Not Found" });
    }
    console.log(userDoc);
    userDoc.isVerified = true;
    userDoc.verifyToken = undefined;
    userDoc.verifyTokenExpiry = undefined;
    await userDoc.save();
    return NextResponse.json({ success: true, message: "Email Verified" });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      staus: 400,
    });
  }
}
