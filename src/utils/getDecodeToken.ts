import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
const getDecodeToken = async (request: any) => {
  try {
    const tokenValue = (await request.cookies.get("token")?.value) || "";
    const decodeToken: any = Jwt.verify(tokenValue, process.env.SECRET_TOKEN!);
    return decodeToken._id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export { getDecodeToken };
