import User from "@/model/user.model";
import Task from "@/model/task.model";
import { getDecodeToken } from "@/utils/getDecodeToken";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/dbConfig/dbConfig";
import Jwt from "jsonwebtoken";
connectMongoose();
export async function GET(request: NextRequest) {
  try {
    const tokenValue = (await request.cookies.get("token")?.value) || "";
    const decodeToken: any = Jwt.verify(tokenValue, process.env.SECRET_TOKEN!);
    const decodedId: any = decodeToken._id;
    console.log(decodedId);

    if (!decodedId) {
      return NextResponse.json({ message: "invalid id" }, { status: 403 });
    }
    const user = await User.findById(decodedId);

    if (!user) {
      return NextResponse.json(
        { message: "user does not exit" },
        { status: 403 }
      );
    }
    const allTask = await Task.aggregate([
      {
        $match: {
          owner: user?._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                email: 1,
                _id: 1,
              },
            },
          ],
        },
      },
    ]);

    return NextResponse.json(
      { success: true, message: "Task Fetched Succefully", data: allTask },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
  }
}
