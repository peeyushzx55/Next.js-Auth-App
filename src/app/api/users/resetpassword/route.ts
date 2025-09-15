import { connect } from "@/db/db";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() }, //$gt -> greater than operator
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 500 });
    }
    console.log(user);

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
