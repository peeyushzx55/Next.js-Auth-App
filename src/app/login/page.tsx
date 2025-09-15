"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Log in to your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors
                placeholder-gray-400"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors
                placeholder-gray-400"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg 
            shadow-lg transition-colors duration-200 hover:shadow-indigo-500/25"
          onClick={onLogin}
        >
          Log In
        </button>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
