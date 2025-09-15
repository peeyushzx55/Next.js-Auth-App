"use client";
import { use } from "react";

interface PageParams {
  id: string;
}

export default function UserProfile({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = use(params);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">User Profile</h1>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-3xl text-white font-bold">
                {resolvedParams.id[0]?.toUpperCase() || "U"}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-100">
                User {resolvedParams.id}
              </h2>
              <p className="text-gray-400">Member ID: {resolvedParams.id}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm border border-gray-600">
                <h3 className="text-lg font-medium text-gray-100 mb-2">
                  Account Info
                </h3>
                <p className="text-gray-300">ID: {resolvedParams.id}</p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm border border-gray-600">
                <h3 className="text-lg font-medium text-gray-100 mb-2">
                  Status
                </h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-100 border border-green-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
