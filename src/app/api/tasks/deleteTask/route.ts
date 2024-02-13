import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/dbConfig/dbConfig";
import { validateRequest } from "@/utils/validateRequest";
import Task from "@/model/task.model";

connectMongoose();
export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { _id } = requestBody;
    console.log("delete function called", requestBody);
    const deleteTasks = await Task.findByIdAndDelete(_id);
    console.log(deleteTasks);

    return NextResponse.json(
      { messge: "Successfully deleted", deleteTasks },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
  }
}
