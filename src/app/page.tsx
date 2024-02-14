"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  return (
    <main className="md:grid md:grid-cols-12 ">
      <section className="min-h-screen  hidden md:flex justify-center items-center bg-white md:col-start-1 col-end-8 text-black ">
        <h1 className="text-5xl text-center">Let Do more Productive work</h1>
      </section>
      <section className=" min-h-screen flex justify-center items-center bg-red-500   md:col-start-8 md:col-end-13  text-white">
        <div className=" hidden md:flex md:justify-center md:mt-8 gap-8 md:min-h-60">
          <Link href="/login" className="">
            Login
          </Link>
          <Link href="/signup" className="">
            Signup
          </Link>
        </div>
        <div className=" flex flex-col justify-center items-center  gap-8">
          <h2 className=" flex flex-wrap items-center text-3xl lg:text-6xl">
            PomodoroFocus
          </h2>
          <Link
            href="/signup"
            className="bg-white text-red-500 md:px-6 md:py-2 rounded-md md:text-2xl px-4 py-2"
          >
            Start
          </Link>
        </div>
      </section>
    </main>
  );
}
