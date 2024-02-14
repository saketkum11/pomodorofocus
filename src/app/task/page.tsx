"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import {
  Cog8ToothIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import TaskCard from "../component/TaskCard";
import TaskList from "../component/TaskList";
import Timer from "@/utils/timer";
export default function Task() {
  const [toggleSetting, setToggleSetting] = useState(false);
  const [toggleTask, setToggleTask] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const router = useRouter();
  const handleClick = () => {
    setToggleTask((flag) => !flag);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");
      console.log("Signup success", response.data);
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const getAllTaskList = async () => {
      try {
        const { data } = await axios.get("/api/tasks/getTask", {});
        setAllTasks(data.data);
      } catch (error: any) {
        console.log("Signup failed", error);
        toast.error(error.message);
      }
    };
    getAllTaskList();
  }, [setAllTasks]);

  const { time, isActive, setTime, setIsActive } = Timer();
  const getTimerConvert = (time: number) => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    if (time === 0) {
    }
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };
  const handleStart = () => {
    setIsActive((flag: any) => !flag);
  };
  const handleReset = () => {
    setTime(25 * 60);
    setIsActive(false);
  };
  return (
    <main>
      <header className="  bg-red-500 text-white px-3 min-h-screen ">
        <div className="md:max-w-xl m-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 py-6 ">
              <CheckCircleIcon className="w-8 h-8" />
              <span className="font-semibold text-2xl">Pomodoro App</span>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <button className="flex items-center justify-center gap-2 bg-red-400 rounded-md p-2">
                  <UserCircleIcon className="w-8 flex justify-center" />
                  <span className="hidden sm:block">Login</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-red-400 rounded-md p-2"
                >
                  <UserCircleIcon className="w-8 flex justify-center" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center gap-6 bg-red-400 p-14 text-center rounded-md shadow-2xl">
              <div>
                <ul className="flex justify-center items-center gap-4">
                  <li>Pomodoro</li>
                </ul>
              </div>
              <div className="text-9xl text-center">
                {getTimerConvert(time)}
              </div>
              <button
                onClick={() => handleStart()}
                className="bg-white text-red-400 px-8 py-2 rounded-sm"
              >
                {isActive ? "Stop" : "Start"}
              </button>
              <button onClick={() => handleReset()}>Reset</button>
            </div>
            <div className="text-center my-4">
              <p>#4</p>
              <p className="text-xl">Time for a break!</p>
            </div>
            <div className="flex justify-between items-end border-b-2 pb-4">
              <span className="text-2xl">Tasks</span>
              <button className="bg-red-400 rounded-md px-2 py-2">
                <EllipsisVerticalIcon className="w-8" />
              </button>
            </div>
            <ul className="flex flex-col gap-4 mt-4">
              {[...allTasks].reverse().map((task) => {
                const { _id } = task;
                return (
                  <>
                    <TaskList
                      task={task}
                      key={_id}
                      setToggleTask={setToggleTask}
                      setAllTasks={setAllTasks}
                    />
                  </>
                );
              })}
            </ul>
            <div className="relative py-4">
              <button
                onClick={handleClick}
                className=" flex items-center justify-center w-full gap-4  border-2 border-dashed bg-red-400 py-4 mt-8 shadow-2xl rounded-lg"
              >
                <PlusCircleIcon className="w-8" />
                <span>Add Task</span>
              </button>
              {toggleTask && (
                <TaskCard
                  setToggleTask={setToggleTask}
                  handleTask={setAllTasks}
                  allTasks={allTasks}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
