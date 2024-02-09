"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import {
  Cog8ToothIcon,
  UserCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
export default function Home() {
  const [toggleSetting, setToggleSetting] = useState(true);
  function handleClick() {}
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
                <button className="flex items-center justify-center gap-2 bg-red-400 rounded-md p-2 ">
                  <Cog8ToothIcon className="w-8 " />
                  <span className="hidden sm:block">Setting</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-red-400 rounded-md p-2">
                  <UserCircleIcon className="w-8 flex justify-center" />
                  <span className="hidden sm:block">Login</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center gap-6 bg-red-400 p-14 text-center rounded-md shadow-2xl">
              <div>
                <ul className="flex justify-center items-center gap-4">
                  <li>Pomodoro</li>
                  <li>Short Break</li>
                  <li>Long Break</li>
                </ul>
              </div>
              <div className="text-9xl text-center">15:00</div>
              <button className="bg-white text-red-400 px-8 py-2 rounded-sm">
                Start
              </button>
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
            <button
              onClick={handleClick}
              className="flex items-center justify-center w-full gap-4  border-2 border-dashed bg-red-400 py-4 mt-8 shadow-2xl rounded-lg"
            >
              <PlusCircleIcon className="w-8" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </header>
    </main>
  );
}
