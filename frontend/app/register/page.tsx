"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("Registration successful!");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold">Register</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-3 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} className="bg-black text-white p-3 rounded">
        Register
      </button>
    </div>
  );
}
