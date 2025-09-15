"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Welcome to <span className="text-indigo-500">Auth App</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A secure and modern authentication solution built with Next.js
        </p>
        <div className="space-x-4">
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg 
              shadow-lg transition-all duration-200 hover:shadow-indigo-500/25 transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-lg 
              shadow-lg transition-all duration-200 border border-gray-700 hover:text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
