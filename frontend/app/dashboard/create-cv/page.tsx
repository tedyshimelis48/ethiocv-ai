"use client";
import CVForm from "../components/CVForm";

export default function CreateCVPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Create Your CV
      </h1>

      <CVForm />
    </div>
  );
}