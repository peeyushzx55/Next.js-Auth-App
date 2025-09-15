"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    const loadingToast = toast.loading("Verifying your email...");
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
      toast.success("Email verified successfully!", { id: loadingToast });
    } catch (error: any) {
      setError(true);
      console.error("Verification error:", error);
      toast.error(error.response?.data?.error || "Failed to verify email", {
        id: loadingToast,
      });
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (!urlToken) {
      toast.error("No verification token found");
      return;
    }
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-2">
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
        <h1 className="text-3xl font-bold text-white text-center">
          Email Verification
        </h1>

        {!verified && !error && (
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-300">Verifying your email...</p>
          </div>
        )}

        {verified && (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-400">You can now log in to your account.</p>
            <Link
              href="/login"
              className="block w-full py-3 px-4 text-center font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-200"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Verification Failed
            </h2>
            <p className="text-gray-400">
              The verification link may be invalid or expired.
            </p>
            <Link
              href="/login"
              className="block w-full py-3 px-4 text-center font-semibold rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition duration-200"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
