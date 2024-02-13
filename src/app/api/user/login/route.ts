import { connectMongoose } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

connectMongoose();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    if (!email && !password) {
      return NextResponse.json(
        { error: "Invalid email id or password" },
        { status: 403 }
      );
    }
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user does not exits" },
        { status: 400 }
      );
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return NextResponse.json(
        {
          error: "Invalid Password",
        },
        { status: 403 }
      );
    }
    const userTokenData = {
      _id: user._id,
    };
    const generateToken = Jwt.sign(userTokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });
    const options = {
      httpOnly: true,
      secure: true,
    };

    const responseNext = NextResponse.json(
      { success: true, message: "succefully Logged In", token: generateToken },
      { status: 200 }
    );
    responseNext.cookies.set("token", generateToken, options);
    return responseNext;
  } catch (error: any) {
    console.error("error", error.message);
  }
}
