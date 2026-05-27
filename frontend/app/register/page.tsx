"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleRegister = async () => {

    setLoading(true);
    setError("");
    setSuccess("");

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(
      "Registration successful! Please check your email for verification."
    );

    setLoading(false);

    setEmail("");
    setPassword("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7f2f5] to-[#ebe4e9] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-10">

        {/* LOGO */}
        <div className="flex flex-col items-center">

          <div className="bg-[#5a1f46] p-4 rounded-2xl text-white">
            <FileText size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#5a1f46]">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Start building professional AI-powered resumes
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mt-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
            <CheckCircle size={20} />
            <p className="text-sm">
              {success}
            </p>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <AlertCircle size={20} />
            <p className="text-sm">
              {error}
            </p>
          </div>
        )}

        {/* FORM */}
        <div className="mt-8 space-y-5">

          {/* EMAIL */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:border-[#5a1f46]">

              <Mail
                size={20}
                className="text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none ml-3"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:border-[#5a1f46]">

              <Lock
                size={20}
                className="text-gray-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create password"
                className="w-full outline-none ml-3"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={20}
                    className="text-gray-400"
                  />
                ) : (
                  <Eye
                    size={20}
                    className="text-gray-400"
                  />
                )}
              </button>
            </div>
          </div>

          {/* REGISTER BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className={`
              w-full py-4 rounded-xl text-white font-semibold transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5a1f46] hover:bg-[#471737]"
              }
            `}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

          {/* LOGIN LINK */}
          <div className="text-center pt-3">

            <p className="text-gray-500">
              Already have an account?{" "}

              <Link
                href="/login"
                className="text-[#5a1f46] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}