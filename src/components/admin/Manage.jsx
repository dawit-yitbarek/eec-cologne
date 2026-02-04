"use client";

import { useState } from "react";
import axios from "axios";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ManageSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.trim() !== confirmPassword.trim()) {
      return setError("passwords must match");
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.post("/api/admin/change-password", {
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
      });
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("");
      setSuccess("Password changed successfully");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const TogglePassword = ({show, setShow}) => {
    return (
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    );
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-white to-yellow-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 z-10">
        <h2 className="text-3xl font-heading text-center mb-6">
          Change password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            />
            <TogglePassword show={showCurrent} setShow={setShowCurrent}/>
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            />
            <TogglePassword show={showNew} setShow={setShowNew}/>
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            />
            <TogglePassword show={showConfirm} setShow={setShowConfirm}/>
          </div>

          {error && <p className="text-red-500 font-body text-md">{error}</p>}
          {success && (
            <p className="text-green-500 font-body text-md">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-heading text-black bg-yellow-500 hover:bg-yellow-400 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
