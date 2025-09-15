"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    const loadingToast = toast.loading("Creating your account...");
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      toast.success("Account created successfully! Please log in.", {
        id: loadingToast,
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.error || "Failed to create account", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "rgba(40, 200, 120, 0.9)",
              color: "#fff",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "rgba(220, 50, 50, 0.9)",
              color: "#fff",
            },
          },
        }}
      />
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us today and start your journey</p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              className={`w-full px-4 py-2 bg-gray-700 border text-white rounded-lg transition-all duration-200
                ${loading ? "opacity-60 cursor-not-allowed" : "border-gray-600"}
                ${user.username ? "border-gray-400" : "border-gray-600"}
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                placeholder-gray-400`}
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              className={`w-full px-4 py-2 bg-gray-700 border text-white rounded-lg transition-all duration-200
                ${loading ? "opacity-60 cursor-not-allowed" : "border-gray-600"}
                ${user.email ? "border-gray-400" : "border-gray-600"}
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                placeholder-gray-400`}
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              disabled={loading}
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
              className={`w-full px-4 py-2 bg-gray-700 border text-white rounded-lg transition-all duration-200
                ${loading ? "opacity-60 cursor-not-allowed" : "border-gray-600"}
                ${user.password ? "border-gray-400" : "border-gray-600"}
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                placeholder-gray-400`}
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Create a password"
              disabled={loading}
            />
          </div>
        </div>

        <button
          className={`w-full py-3 px-4 font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center
            ${
              buttonDisabled || loading
                ? "bg-gray-600 cursor-not-allowed opacity-60"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/25"
            } 
            text-white`}
          onClick={onSignup}
          disabled={buttonDisabled || loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
