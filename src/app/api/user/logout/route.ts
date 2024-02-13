import { connectMongoose } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

connectMongoose();
export async function POST(request: NextRequest) {
  try {
    const option = {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    };
    const response = NextResponse.json(
      {
        message: "Logged out",
      },
      { status: 200 }
    );
    response.cookies.set("token", "", option);
    return response;
  } catch (error: any) {
    console.error("error", error.message);
  }
}
