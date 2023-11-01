import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { GetTokenData } from "@/helpers/GetTokenData";

export async function GET(request: NextRequest) {
  try {
    const userData = await GetTokenData(request);
    const userDoc = await User.findById(userData.id).select("-password");
    if (!userDoc) {
      return NextResponse.json({ success: false, message: "User Not Found" });
    }
    return NextResponse.json({
      success: true,
      message: "User Found",
      user: userDoc,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
