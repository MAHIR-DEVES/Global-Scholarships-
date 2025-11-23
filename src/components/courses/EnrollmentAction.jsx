"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { FaLock, FaPlay, FaClock, FaCheckCircle } from "react-icons/fa";

const EnrollmentAction = ({ courseId, price }) => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState("loading"); // loading, not_enrolled, pending, approved, rejected
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      checkStatus();
    } else if (!authLoading && !user) {
      setStatus("not_enrolled");
    }
  }, [authLoading, user, courseId]);

  const checkStatus = async () => {
    try {
      const res = await api.get(`/api/enrollments/check/${courseId}`);
      if (res.data.success) {
        setStatus(res.data.status);
      }
    } catch (error) {
      console.error("Failed to check enrollment status", error);
      setStatus("not_enrolled");
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.info("Please login to enroll");
      router.push("/login");
      return;
    }

    setActionLoading(true);
    try {
      const res = await api.post("/api/enrollments", { courseId });
      if (res.data.success) {
        toast.success(res.data.message);
        setStatus("pending");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (authLoading || status === "loading") {
    return (
      <button disabled className="btn-primary opacity-70 cursor-wait">
        Checking status...
      </button>
    );
  }

  if (status === "approved") {
    return (
      <button
        onClick={() => router.push(`/ielts/${courseId}/watch`)}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
      >
        <FaPlay /> Start Learning
      </button>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center">
        <button
          disabled
          className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-lg cursor-not-allowed flex items-center gap-2"
        >
          <FaClock /> Enrollment Pending
        </button>
        <p className="text-xs text-gray-300 mt-2">Waiting for admin approval</p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <button
        disabled
        className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg cursor-not-allowed"
      >
        Enrollment Rejected
      </button>
    );
  }

  // Default: Not Enrolled
  return (
    <button
      onClick={handleEnroll}
      disabled={actionLoading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
    >
      {actionLoading ? (
        "Processing..."
      ) : (
        <>
          <FaLock /> Enroll Now {price > 0 ? `($${price})` : "(Free)"}
        </>
      )}
    </button>
  );
};

export default EnrollmentAction;
