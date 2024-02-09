import { connectMongoose } from "../../../../dbConfig/dbConfig";
import { NextRequest } from "next/server";
connectMongoose();
export async function GET(request:NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;
    console.log("from signup route", email, password);
  } catch (error:any) {
    console.error("error", error.message);
  }
}