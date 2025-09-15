"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async (showToast = false) => {
    let loadingToast;
    if (showToast) {
      loadingToast = toast.loading("Fetching profile...");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id);
      if (showToast) {
        toast.success("Profile loaded successfully", { id: loadingToast });
      }
    } catch (error: any) {
      console.log(error.message);
      const errorMessage =
        error.response?.data?.error || "Failed to load profile";
      if (showToast) {
        toast.error(errorMessage, { id: loadingToast });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load without toast
  useEffect(() => {
    fetchUserDetails(false);
  }, []);

  // Function for manual refresh with toast
  const getUserDetails = () => {
    fetchUserDetails(true);
  };

  const logout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful", { id: loadingToast });
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.response?.data?.error || "Logout failed", {
        id: loadingToast,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
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
      {/* Header Section */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Profile Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"></div>

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6">
              <div className="h-32 w-32 rounded-full ring-4 ring-gray-800 bg-gray-800 shadow-xl overflow-hidden">
                <Image
                  src="/window.svg"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-gray-200">
                    User ID:
                  </h2>
                  {data && (
                    <Link
                      href={`/profile/${data}`}
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                    >
                      {data}
                    </Link>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={getUserDetails}
                    className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
