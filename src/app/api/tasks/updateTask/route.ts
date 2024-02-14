import User from "@/model/user.model";
import Task from "@/model/task.model";
import { getDecodeToken } from "@/utils/getDecodeToken";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/dbConfig/dbConfig";
connectMongoose();
export async function PATCH(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { _id } = requestBody;

    if (!_id) {
      return NextResponse.json({ message: "Invalid Task Id" }, { status: 403 });
    }
    const task = await Task.findByIdAndUpdate(_id, requestBody);

    return NextResponse.json(
      { message: "created Task", data: requestBody },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
  }
}
