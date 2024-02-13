import User from "@/model/user.model";
import Task from "@/model/task.model";
import { getDecodeToken } from "@/utils/getDecodeToken";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/dbConfig/dbConfig";
connectMongoose();
export async function GET({ params }: any) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: " invalid id" }, { status: 403 });
    }
    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ message: " task not found" }, { status: 403 });
    }

    return NextResponse.json(
      { message: "created Task", data: task },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.message);
  }
}
