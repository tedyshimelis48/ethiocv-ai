"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  Lock,
  LogIn,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleLogin = async () => {

    setLoading(true);

    setMessage("");
    setErrorMessage("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {

      setMessage(
        "Login successful! Redirecting..."
      );

      setTimeout(() => {
        router.push("/dashboard/create-cv");
      }, 1500);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f4f7] to-[#ece7ec] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        {/* HEADER */}
        <div className="text-center">

          <div className="w-20 h-20 bg-[#5a1f46] rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg">
            <LogIn size={38} />
          </div>

          <h1 className="mt-6 text-4xl font-bold text-[#5a1f46]">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-500 leading-7">
            Login to continue building
            professional ATS-friendly resumes
            with EthioCV AI.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mt-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
            <CheckCircle
              size={22}
              className="mt-0.5"
            />

            <p className="text-sm leading-6">
              {message}
            </p>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            <AlertCircle
              size={22}
              className="mt-0.5"
            />

            <p className="text-sm leading-6">
              {errorMessage}
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

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:border-[#5a1f46] transition">

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

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:border-[#5a1f46] transition">

              <Lock
                size={20}
                className="text-gray-400"
              />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full outline-none ml-3"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`
              w-full py-4 rounded-xl text-white font-semibold transition shadow-lg
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5a1f46] hover:bg-[#471737]"
              }
            `}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center">

          <p className="text-gray-600">
            Don’t have an account?
          </p>

          <Link href="/register">
            <button className="mt-4 text-[#5a1f46] font-semibold hover:underline">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

