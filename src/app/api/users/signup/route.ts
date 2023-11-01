import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });
    // Check if User already exist
    if (user) {
      return NextResponse.json({
        success: false,
        error: "This User is Already Exist",
        status: 500,
      });
    }
    // Hash the Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const createUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const userDoc = await createUser.save();
    await sendMail({ email, emailType: "VERIFY", userId: createUser._id });
    return NextResponse.json({
      message: "User Created Successfully",
      status: 201,
      success: true,
      userDoc,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
