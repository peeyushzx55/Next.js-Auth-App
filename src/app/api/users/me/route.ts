import { connect } from "@/db/db";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    //extract data from token
    const userId = await getDataFromToken(request);
    const user = await User.findOne({
      _id: userId,
    }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "User found", data: user });
  } catch (error) {}
}
