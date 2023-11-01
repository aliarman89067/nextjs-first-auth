import { GetTokenData } from "@/helpers/GetTokenData";
import { sendMail } from "@/helpers/mailer";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export const POST = async (request: NextRequest) => {
  const { id, email } = await GetTokenData(request);
  await sendMail({ email, emailType: "RESET", userId: id });
  return NextResponse.json({
    success: true,
    message: "Forget Password Key Created",
  });
};
