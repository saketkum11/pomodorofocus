"use client";
import React from "react";
import Link from "next/link";
const loginPage = () => {
  return (
    <main className="bg-red-500 min-h-screen flex  flex-col  justify-center items-center  text-white">
      <h1 className="text-4xl font-bold pb-12"> Pomodoro App</h1>
      <div className=" max-w-md border-2 border-dashed w-full rounded-lg p-10 shadow-md ">
        <h1 className="text-center text-2xl">Login</h1>
        <form action="">
          <div className="min-h-64 flex flex-col gap-6">
            <div className="">
              <label htmlFor="" className="block pb-2 pl-1">
                Email
              </label>
              <input
                type="email"
                className="block w-full px-6 py-2 rounded-lg text-red-500 outline-none"
              />
            </div>
            <div className="">
              <label htmlFor="" className="block pb-2 pl-1">
                password
              </label>
              <input
                type="password"
                className="block w-full px-6 py-2 rounded-lg text-red-500 outline-none"
              />
            </div>
          </div>
          <button className="bg-white text-red-500 w-full py-2 px-4 rounded-md font-bold">
            Login
          </button>
        </form>
        <Link
          href="/signup"
          className=" flex justify-center text-white mt-8 underline"
        >
          Create Account ?
        </Link>
      </div>
    </main>
  );
};

export default loginPage;
