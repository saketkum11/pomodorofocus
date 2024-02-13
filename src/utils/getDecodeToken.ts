import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
const getDecodeToken = (request: any) => {
  try {
    const tokenValue = request.cookies.get("token")?.value || "";
    const decodeToken: any = Jwt.verify(tokenValue, process.env.SECRET_TOKEN!);
    return decodeToken._id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export { getDecodeToken };
