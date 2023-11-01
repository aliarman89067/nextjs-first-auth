import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Body " + reqBody);

    const { token, password } = reqBody;
    const userDoc = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!userDoc) {
      return NextResponse.json({ success: false, error: "User Not Found" });
    }
    console.log("user found " + userDoc);
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    userDoc.password = hashedPassword;
    userDoc.forgotPasswordToken = undefined;
    userDoc.forgotPasswordTokenExpiry = undefined;
    await userDoc.save();
    return NextResponse.json({ success: true, message: "Password Changed" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
