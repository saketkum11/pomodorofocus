import User from "@/model/user.model";
import Task from "@/model/task.model";
import { getDecodeToken } from "@/utils/getDecodeToken";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/dbConfig/dbConfig";
connectMongoose();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { title, description, esTime } = requestBody;
    if ([title, description, esTime].some((field) => field?.trim() === "")) {
      return NextResponse.json(
        {
          message: " Not Value inputed",
        },
        { status: 403 }
      );
    }
    const decodedId = await getDecodeToken(request);

    if (!decodedId) {
      return NextResponse.json(
        {
          message: " invaild user id",
        },
        { status: 403 }
      );
    }
    const user = await User.findById(decodedId);
    if (!user) {
      return NextResponse.json(
        {
          message: "  user does not exits ",
        },
        { status: 403 }
      );
    }
    const createTask = await Task.create({
      title,
      description,
      owner: user._id,
      esTime,
    });

    return NextResponse.json(
      { message: "created Task", data: createTask },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
  }
}
