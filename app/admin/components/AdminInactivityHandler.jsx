"use client";

import { useEffect } from "react";
import useAdminInactivityLogout from "./useAdminInactivityLogout";

export default function AdminInactivityHandler({ children, showWarning = true }) {
  const { showWarningModal, timeLeft, cancelWarningAndReset, logoutNow } =
    useAdminInactivityLogout({ showWarning });

  return (
    <>
      {children}
      {showWarning && showWarningModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Session Expiring
            </h2>
            <p className="text-gray-600 mb-6">
              Your session will expire in {timeLeft} second{timeLeft !== 1 ? "s" : ""} due to inactivity.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={logoutNow}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Logout Now
              </button>
              <button
                onClick={cancelWarningAndReset}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
