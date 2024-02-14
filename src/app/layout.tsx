import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TaskProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
            <footer className="min-h-20 flex justify-center border-t-2">
              <ul className="flex justify-center items-center gap-4">
                <li className="underline">
                  <Link href="https://saket-kumar.netlify.app/">
                    Saket Kumar
                  </Link>
                </li>
                <li className="underline">
                  <Link href="https://github.com/saketkum11">Github</Link>
                </li>
                <li className="underline">
                  <Link href="https://www.linkedin.com/in/saketkumar21/">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </footer>
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
