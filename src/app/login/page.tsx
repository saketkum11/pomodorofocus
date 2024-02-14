"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
const LoginPage = () => {
  const router = useRouter();
  const { login }: any = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [loading, setLoading] = useState(false);
  const onChange = (e: any) => {
    setUser((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const onLogin = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      login(user);
      router.push("/task");
      toast.success("Logged In Successfully");
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setUser({
        email: "",
        password: "",
      });
    }
  };
  return (
    <main className="bg-red-500 min-h-screen px-6 flex  flex-col  justify-center items-center  text-white">
      <h1 className="text-4xl font-bold pb-12"> Pomodoro App</h1>
      <div className=" max-w-md border-2 border-dashed w-full rounded-lg p-10 shadow-md ">
        <h1 className="text-center text-2xl">Login</h1>
        <form action="" onSubmit={onLogin}>
          <div className="min-h-64 flex flex-col gap-6">
            <div className="">
              <label htmlFor="" className="block pb-2 pl-1">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                className="block w-full px-6 py-2 rounded-lg text-red-500 outline-none"
              />
            </div>
            <div className="">
              <label htmlFor="" className="block pb-2 pl-1">
                password
              </label>
              <input
                required
                value={password}
                name="password"
                type="password"
                onChange={(e) => onChange(e)}
                className="block w-full px-6 py-2 rounded-lg text-red-500 outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-white text-red-500 w-full py-2 px-4 rounded-md font-bold"
          >
            {loading ? "logging In" : "Login"}
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

export default LoginPage;
