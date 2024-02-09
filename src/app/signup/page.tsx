"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
const SignUpPage = () => {
  type FormState = {
    email: string;
    password: string;
  };
  const [userData, setUserData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = userData;
  const onChange = (e: any) => {
    setUserData((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get("/api/user/signup");
      console.log("from onsigup");
    } catch (error: any) {
      console.error("error ", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="bg-red-500 min-h-screen flex flex-col justify-center items-center  text-white">
      <h1 className="text-4xl font-bold pb-12"> Pomodoro App</h1>
      <div className=" max-w-md border-2 border-dashed w-full rounded-lg p-10 shadow-md ">
        <h1 className="text-center text-2xl">SignUp</h1>
        <form action="" onSubmit={onSignup}>
          <div className="min-h-64 flex flex-col gap-6">
            <div className="">
              <label htmlFor="" className="block pb-2 pl-1">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                name="email"
                value={email}
                onChange={(e) => {
                  onChange(e);
                }}
                className="block w-full px-6 py-2 rounded-lg text-red-500 outline-none"
              />
            </div>
            <div className="">
              <label htmlFor="" className="block pb-2 pl-1">
                password
              </label>
              <input
                required
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => {
                  onChange(e);
                }}
                type="password"
                className="block w-full px-6 py-2 rounded-lg text-red-500 outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-white text-red-500 w-full py-2 px-4 rounded-md font-bold"
          >
            {isLoading ? "proccessing..." : "Sign Up"}
          </button>
        </form>
        <Link
          href="/login"
          className=" flex justify-center text-white mt-8 underline"
        >
          Already Have Account ?
        </Link>
      </div>
      <ul></ul>
    </main>
  );
};

export default SignUpPage;
