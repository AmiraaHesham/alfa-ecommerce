"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutRequest } from "../../../utils/requestsUtils";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const WARNING_BEFORE_LOGOUT = 60 * 1000; // 60 seconds before logout

const AUTH_STORAGE_KEYS = [
  "accessToken",
  "refreshToken",
  "id",
  "firstName",
  "lastName",
  "address",
  "email",
  "phone",
  "role",
  "username",
  "governorateId",
];

export function useAdminInactivityLogout(options = {}) {
  const router = useRouter();
  const {
    timeout = INACTIVITY_TIMEOUT,
    warningTime = WARNING_BEFORE_LOGOUT,
    showWarning = true,
    onWarning,
    onLogout,
  } = options;

  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(Math.ceil(warningTime / 1000));
  const warningIntervalRef = useRef(null);
  const isLoggingOutRef = useRef(false);

  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
    if (warningIntervalRef.current) {
      clearInterval(warningIntervalRef.current);
      warningIntervalRef.current = null;
    }
  }, []);

  const performLogout = useCallback(async () => {
    if (isLoggingOutRef.current) {
      return;
    }
    isLoggingOutRef.current = true;
    clearAllTimers();
    setShowWarningModal(false);

    try {
      if (typeof logoutRequest === "function") {
        await logoutRequest();
      }
    } catch (error) {
      // Continue with local cleanup even if logout request fails
    }

    if (typeof window !== "undefined") {
      AUTH_STORAGE_KEYS.forEach((key) => {
        localStorage.removeItem(key);
      });
    }

    if (typeof onLogout === "function") {
      onLogout();
    }

    router.replace("/signin");
  }, [clearAllTimers, onLogout, router]);

  const resetTimer = useCallback(() => {
    clearAllTimers();
    setShowWarningModal(false);

    if (typeof window === "undefined") return;

    if (warningTime > 0 && warningTime < timeout) {
      warningTimeoutRef.current = setTimeout(() => {
        setShowWarningModal(true);
        setTimeLeft(Math.ceil(warningTime / 1000));
        if (typeof onWarning === "function") {
          onWarning();
        }

        warningIntervalRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        timeoutRef.current = setTimeout(() => {
          performLogout();
        }, warningTime);
      }, timeout - warningTime);
    } else {
      timeoutRef.current = setTimeout(() => {
        performLogout();
      }, timeout);
    }
  }, [clearAllTimers, onWarning, performLogout, timeout, warningTime]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => {
      if (isLoggingOutRef.current) return;
      if (showWarningModal) {
        return;
      }
      resetTimer();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (isLoggingOutRef.current) return;
        resetTimer();
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", resetTimer);

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", resetTimer);
      clearAllTimers();
    };
  }, [resetTimer, clearAllTimers, showWarningModal]);

  const cancelWarningAndReset = useCallback(() => {
    if (isLoggingOutRef.current) return;
    setShowWarningModal(false);
    resetTimer();
  }, [resetTimer]);

  const logoutNow = useCallback(() => {
    performLogout();
  }, [performLogout]);

  return {
    showWarningModal: showWarning && showWarningModal,
    timeLeft,
    cancelWarningAndReset,
    logoutNow,
    resetTimer,
  };
}

export default useAdminInactivityLogout;
