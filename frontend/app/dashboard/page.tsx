"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
    } else {
      setEmail(user.email || "");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            EthioCV AI Dashboard 🚀
          </h1>

          <p className="mt-2 text-gray-600">
            Logged in as: {email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-10">
        <Link
          href="/dashboard/create-cv"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create New CV
        </Link>
      </div>
    </div>
  );
}