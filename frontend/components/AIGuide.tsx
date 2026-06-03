"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  MousePointerClick,
  Sparkles,
} from "lucide-react";

import { TypeAnimation } from "react-type-animation";

const steps = [
  {
    title: "Signup",
    message:
      "First, create your EthioCV AI account.",
    x: 120,
    y: 120,
  },

  {
    title: "Login",
    message:
      "Now login using your email and password.",
    x: 300,
    y: 220,
  },

  {
    title: "Create CV",
    message:
      "Click the Create CV button to start.",
    x: 500,
    y: 280,
  },

  {
    title: "Select Template",
    message:
      "Choose NGO, Corporate or Graduate template.",
    x: 700,
    y: 320,
  },

  {
    title: "Fill Information",
    message:
      "Enter your education, experience and skills.",
    x: 450,
    y: 500,
  },

  {
    title: "Generate Summary",
    message:
      "AI will generate a professional summary for you.",
    x: 700,
    y: 520,
  },

  {
    title: "Preview CV",
    message:
      "Preview your professional CV instantly.",
    x: 900,
    y: 540,
  },

  {
    title: "Download PDF",
    message:
      "Finally, download your ATS-friendly PDF CV.",
    x: 1100,
    y: 550,
  },
];

export default function AIGuide() {

  const [step, setStep] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setStep((prev) =>
        prev === steps.length - 1
          ? 0
          : prev + 1
      );

    }, 4000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="relative w-full h-[700px] overflow-hidden rounded-[2rem] bg-white shadow-2xl border border-[#ead8e3]">

      {/* AI ASSISTANT */}
      <motion.div
        animate={{
          x: steps[step].x - 100,
          y: steps[step].y - 80,
        }}
        transition={{
          duration: 1.5,
        }}
        className="absolute z-40"
      >

        <div className="bg-white shadow-2xl border border-[#ead8e3] rounded-3xl p-5 max-w-[280px]">

          <div className="flex items-center gap-3 mb-3">

            <div className="bg-[#5a1f46] text-white p-3 rounded-2xl">
              <Sparkles size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#5a1f46]">
                EthioCV AI
              </h3>

              <p className="text-xs text-gray-500">
                AI Assistant
              </p>
            </div>
          </div>

          <TypeAnimation
            sequence={[
              steps[step].message,
              3000,
            ]}
            wrapper="p"
            speed={60}
            repeat={0}
            className="text-gray-700 leading-7 text-sm"
          />
        </div>
      </motion.div>

      {/* CURSOR */}
      <motion.div
        animate={{
          x: steps[step].x,
          y: steps[step].y,
        }}
        transition={{
          duration: 1.5,
        }}
        className="absolute z-50"
      >
        <div className="relative">

          <MousePointerClick
            size={42}
            className="text-[#5a1f46]"
          />

          {/* CLICK EFFECT */}
          <span
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-[#5a1f46]
              animate-ping
            "
          ></span>
        </div>
      </motion.div>

      {/* MOCK WEBSITE UI */}
      <div className="p-10">

        <h1 className="text-5xl font-bold text-[#5a1f46]">
          EthioCV AI
        </h1>

        <p className="mt-4 text-gray-500 text-lg">
          Build your professional CV using AI.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-5 mt-8">

          <button className="bg-[#5a1f46] text-white px-8 py-4 rounded-xl">
            Signup
          </button>

          <button className="border px-8 py-4 rounded-xl">
            Login
          </button>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-4 gap-6 mt-16">

          {steps.map((item, index) => (

            <motion.div
              key={index}
              animate={{
                scale:
                  step === index
                    ? 1.05
                    : 1,
              }}
              className={`
                rounded-2xl
                p-6
                border-2
                transition
                ${
                  step === index
                    ? "border-[#5a1f46] bg-[#f8f1f5]"
                    : "border-gray-200"
                }
              `}
            >

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#5a1f46]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                {index + 1}
              </div>

              <h3 className="mt-4 font-bold text-lg">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-6">
                {item.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}