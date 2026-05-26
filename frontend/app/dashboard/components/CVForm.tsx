"use client";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import NGOTemplate from "../templates/NGOTemplate";
import CorporateTemplate from "../templates/CorporateTemplate";
import ImageUpload from "./ImageUpload";

export default function CVForm() {
  const [summary, setSummary] = useState("");
const [formData, setFormData] = useState({
  fullName: "",
  jobTitle: "",
  profileImage: "",
  email: "",
  phone: "",
  address: "",
  education: "",
  experience: "",
  skills: "",
});

  

const [selectedTemplate, setSelectedTemplate] =
  useState("ngo");

  const downloadPDF = async () => {
  const input = document.getElementById(
    "cv-template"
  );

  if (!input) return;

  const canvas = await html2canvas(input);

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save("EthioCV.pdf");
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateSummary = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/ai/generate-summary",
      {
        job_title: "Software Engineer",
        experience: formData.experience,
        skills: formData.skills,
      }
    );

    setSummary(response.data.summary);

  } catch (error) {
    console.log(error);
    alert("AI generation failed");
  }
};

const handleSubmit = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("User not logged in");
    return;
  }

  const { error } = await supabase.from("cvs").insert([
    {
      user_id: user.id,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
    },
  ]);

  if (error) {
    console.log(error);
    alert("Error saving CV");
  } else {
    alert("CV Saved Successfully!");
  }
};

  return (
    <div className="max-w-3xl mx-auto space-y-5">
       <select
    className="border p-3 rounded w-full"
    onChange={(e) =>
      setSelectedTemplate(e.target.value)
    }
  >
    <option value="ngo">
      NGO Template
    </option>

    <option value="corporate">
      Corporate Template
    </option>
  </select>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="w-full border p-3 rounded"
        onChange={handleChange}
      />

      <input
  type="text"
  name="jobTitle"
  placeholder="Job Title"
  className="w-full border p-3 rounded"
  onChange={handleChange}
/>

<ImageUpload
  setImageUrl={(url) =>
    setFormData({
      ...formData,
      profileImage: url,
    })
  }
/>


      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-3 rounded"
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        className="w-full border p-3 rounded"
        onChange={handleChange}
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        className="w-full border p-3 rounded"
        onChange={handleChange}
      />

      <textarea
        name="education"
        placeholder="Education"
        rows={4}
        className="w-full border p-3 rounded"
        onChange={handleChange}
      />

      <textarea
        name="experience"
        placeholder="Work Experience"
        rows={5}
        className="w-full border p-3 rounded"
        onChange={handleChange}
      />

      <textarea
        name="skills"
        placeholder="Skills"
        rows={3}
        className="w-full border p-3 rounded"
        onChange={handleChange}
      />

<textarea
  placeholder="Professional Summary"
  value={summary}
  onChange={(e) => setSummary(e.target.value)}
  rows={5}
  className="w-full border p-3 rounded"
/>

<button
  onClick={generateSummary}
  className="bg-blue-600 text-white px-6 py-3 rounded"
>
  Generate AI Summary
</button>

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Save CV
      </button>

      <button
  onClick={downloadPDF}
  className="bg-green-600 text-white px-6 py-3 rounded"
>
  Download PDF
</button>

<div className="mt-10">
{selectedTemplate === "ngo" ? (
  <NGOTemplate
    data={formData}
    summary={summary}
  />
) : (
  <CorporateTemplate
    data={formData}
    summary={summary}
  />
)}
</div>
    </div>
  );
}