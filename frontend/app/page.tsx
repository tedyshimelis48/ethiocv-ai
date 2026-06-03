import Link from "next/link";
import AIGuide from "@/components/AIGuide";

import {
  FileText,
  Sparkles,
  Download,
  Briefcase,
  MousePointerClick,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f4f7] to-[#ece7ec]">

      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6 bg-white shadow-sm">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="bg-[#5a1f46] p-3 rounded-xl text-white">
            <FileText size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#5a1f46]">
              EthioCV AI
            </h1>

            <p className="text-sm text-gray-500">
              AI-Powered Resume Builder
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center gap-4">

          <Link href="/login">
            <button className="px-5 py-2 rounded-lg border border-[#5a1f46] text-[#5a1f46] hover:bg-[#5a1f46] hover:text-white transition">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-5 py-2 rounded-lg bg-[#5a1f46] text-white hover:bg-[#471737] transition">
              Get Started
            </button>
          </Link>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>

          <div className="inline-flex items-center gap-2 bg-[#ede3ea] text-[#5a1f46] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            Smart AI Resume Technology
          </div>

          <h2 className="text-6xl font-bold leading-tight text-gray-900">
            Build a Professional CV with AI
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            Create modern, ATS-friendly resumes tailored for Ethiopian job seekers.
            Generate professional summaries, export polished PDFs, and impress recruiters using AI.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap gap-5 mt-10">

            <Link href="/register">
              <button className="bg-[#5a1f46] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#471737] transition shadow-lg">
                Start Building CV
              </button>
            </Link>

            <Link href="/login">
              <button className="border border-gray-300 px-8 py-4 rounded-xl text-lg hover:bg-gray-100 transition">
                Login
              </button>
            </Link>

          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-5 mt-14">

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <div className="bg-[#ede3ea] w-12 h-12 rounded-xl flex items-center justify-center text-[#5a1f46]">
                <Sparkles size={22} />
              </div>

              <h3 className="mt-4 font-bold text-lg">
                AI Summary Generator
              </h3>

              <p className="text-gray-500 mt-2 text-sm leading-6">
                Generate industry-specific professional summaries instantly.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <div className="bg-[#ede3ea] w-12 h-12 rounded-xl flex items-center justify-center text-[#5a1f46]">
                <Download size={22} />
              </div>

              <h3 className="mt-4 font-bold text-lg">
                Professional PDF Export
              </h3>

              <p className="text-gray-500 mt-2 text-sm leading-6">
                Download clean ATS-friendly resumes in high-quality PDF format.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <div className="bg-[#ede3ea] w-12 h-12 rounded-xl flex items-center justify-center text-[#5a1f46]">
                <Briefcase size={22} />
              </div>

              <h3 className="mt-4 font-bold text-lg">
                Multiple CV Templates
              </h3>

              <p className="text-gray-500 mt-2 text-sm leading-6">
                Corporate, NGO, and fresh graduate templates for all professions.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <div className="bg-[#ede3ea] w-12 h-12 rounded-xl flex items-center justify-center text-[#5a1f46]">
                <FileText size={22} />
              </div>

              <h3 className="mt-4 font-bold text-lg">
                ATS-Friendly Layouts
              </h3>

              <p className="text-gray-500 mt-2 text-sm leading-6">
                Optimized resumes designed to pass applicant tracking systems.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        {/* RIGHT SIDE */}
<div>
  <AIGuide />
</div>
      </section>
    </main>
  );
}