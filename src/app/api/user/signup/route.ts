import { connectMongoose } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
connectMongoose();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    if (!email && !password) {
      throw new Error("Invalid email and password");
    }
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return NextResponse.json(
        { error: "user already exits" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    console.log("from signup route", email, password);
    const newUser = await User.create({
      email,
      password: hashed,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error("error", error.message);
  }
}
