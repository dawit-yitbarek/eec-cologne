"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Lock, Loader, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get("/api/admin/me");
        router.push("/admin");
      } catch (err) {
        console.log("Error on checking admin: ", err);
        setChecking(false);
      }
    };
    check();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/admin/login", { password: password.trim() });

      // server sets httpOnly cookie; redirect to dashboard
      router.push("/admin");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl font-bold text-gray-500">
        Loading admin dashboard
        <Loader size={64} className="animate-spin my-4 text-yellow-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-yellow-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 z-10">
        <h2 className="text-3xl font-heading text-center mb-6 text-yellow-700">
          Admin Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 font-body text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-heading text-black bg-yellow-500 hover:bg-yellow-400 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
