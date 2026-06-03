"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import NGOTemplate from "../templates/NGOTemplate";
import CorporateTemplate from "../templates/CorporateTemplate";
import ImageUpload from "./ImageUpload";
import CorporatePDF from "../pdf/CorporatePDF";
import NGOPDF from "../pdf/NGOPDF";

interface FormData {
  fullName: string;
  jobTitle: string;
  profileImage: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  skills: string;
}

export default function CVForm() {
  const [summary, setSummary] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("ngo");
  const [formData, setFormData] = useState<FormData>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateSummary = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/ai/generate-summary", {
        job_title: formData.jobTitle,
        experience: formData.experience,
        skills: formData.skills,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
      alert("AI generation failed");
    }
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert("User not logged in"); return; }

    const { error } = await supabase.from("cvs").insert([{
      user_id: user.id,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
    }]);

    if (error) { console.error(error); alert("Error saving CV"); }
    else { alert("CV Saved Successfully!"); }
  };

  return (
    <div className="flex gap-8 items-start">
      <div className="w-1/2 bg-white p-8 rounded-2xl shadow-lg space-y-5 sticky top-5 h-[95vh] overflow-y-auto">
        <h1 className="text-3xl font-bold text-[#5a1f46]">Build Your CV</h1>

        <select className="border p-3 rounded w-full" onChange={(e) => setSelectedTemplate(e.target.value)}>
          <option value="ngo">NGO Template</option>
          <option value="corporate">Corporate Template</option>
        </select>

        <input type="text" name="fullName" placeholder="Full Name" className="w-full border p-3 rounded" onChange={handleChange} />
        <input type="text" name="jobTitle" placeholder="Job Title" className="w-full border p-3 rounded" onChange={handleChange} />

        <ImageUpload setImageUrl={(url) => setFormData((prev) => ({ ...prev, profileImage: url }))} />

        {formData.profileImage && (
          <div className="flex justify-center">
            <img src={formData.profileImage} alt="preview" className="w-32 h-32 rounded-full object-cover border-4 border-[#5a1f46]" />
          </div>
        )}

        <input type="email" name="email" placeholder="Email" className="w-full border p-3 rounded" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" className="w-full border p-3 rounded" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" className="w-full border p-3 rounded" onChange={handleChange} />
        <textarea name="education" placeholder="Education" rows={4} className="w-full border p-3 rounded" onChange={handleChange} />
        <textarea name="experience" placeholder="Work Experience" rows={5} className="w-full border p-3 rounded" onChange={handleChange} />
        <textarea name="skills" placeholder="Skills (comma separated)" rows={3} className="w-full border p-3 rounded" onChange={handleChange} />
        <textarea placeholder="Professional Summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows={5} className="w-full border p-3 rounded" />

        <div className="flex gap-4 flex-wrap">
          <button onClick={generateSummary} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Generate AI Summary
          </button>
          <button onClick={handleSubmit} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Save CV
          </button>
          <PDFDownloadLink
            document={selectedTemplate === "ngo" ? <NGOPDF data={formData} summary={summary} /> : <CorporatePDF data={formData} summary={summary} />}
            fileName="EthioCV.pdf"
          >
            {({ loading }) => (
              <button
                disabled={!summary || loading}
                className={`px-6 py-3 rounded-lg text-white transition ${!summary || loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
              >
                {loading ? "Generating PDF..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="w-1/2 h-screen overflow-y-auto flex justify-center">
        <div className="scale-[0.6] origin-top sticky top-5">
          {selectedTemplate === "ngo"
            ? <NGOTemplate data={formData} summary={summary} />
            : <CorporateTemplate data={formData} summary={summary} />
          }
        </div>
      </div>
    </div>
  );
}
