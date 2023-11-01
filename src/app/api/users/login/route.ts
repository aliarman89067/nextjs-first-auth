import { connect } from "@/dbConfig/dbConfig.ts";
import User from "@/models/userModel.ts";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const userPass = await bcryptjs.compare(password, userDoc.password);
      if (userPass) {
        const tokenData = {
          id: userDoc._id,
          username: userDoc.username,
          email: userDoc.email,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });
        const response = NextResponse.json({
          success: true,
          message: "Login Successfull",
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
      } else {
        return NextResponse.json({
          error: "Password is Not Correct!",
          status: 400,
          success: false,
        });
      }
    } else {
      return NextResponse.json({
        error: "User Not Found!",
        status: 404,
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    });
  }
}
