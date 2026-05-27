import { Mail, MapPin, Phone } from "lucide-react";

interface Props {
  data: any;
  summary: string;
}

export default function CorporateTemplate({
  data,
  summary,
}: Props) {
  return (
    <div
      id="cv-template"
      className="w-[794px] min-h-[1123px] mx-auto bg-white flex shadow-2xl overflow-hidden"
    >
      {/* LEFT SIDEBAR */}
      <div className="w-[32%] bg-[#f7f5f5] p-8 border-r border-gray-200">

        {/* PROFILE IMAGE */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={
                data.profileImage ||
                "https://via.placeholder.com/150"
              }
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border-[6px] border-white shadow-lg"
            />

            <div className="absolute inset-0 rounded-full border-2 border-[#5a1f46]"></div>
          </div>
        </div>

<div className="mt-4 space-y-4 text-sm">
  <h2 className="text-[#5a1f46] text-[20px] font-bold tracking-wide uppercase border-b-[3px] border-[#5a1f46] pb-2">
    Contact
  </h2>
  <div className="flex items-center gap-3">
    <Phone size={16} />
    <p>{data.phone}</p>
  </div>

  <div className="flex items-center gap-3">
    <Mail size={16} />
    <p>{data.email}</p>
  </div>

  <div className="flex items-start gap-3">
    <MapPin size={16} className="mt-1" />
    <p>{data.address}</p>
  </div>
</div>

        {/* SKILLS */}
        <div className="mt-12">
          <h2 className="text-[#5a1f46] text-[20px] font-bold tracking-wide uppercase border-b-[3px] border-[#5a1f46] pb-2">
            Skills
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {data.skills
              ?.split(",")
              .map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-[#5a1f46]/10 text-[#5a1f46] text-sm px-3 py-1 rounded-full font-medium"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </div>

        {/* EDUCATION SHORT */}
        <div className="mt-12">
          <h2 className="text-[#5a1f46] text-[20px] font-bold tracking-wide uppercase border-b-[3px] border-[#5a1f46] pb-2">
            Language
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-gray-700 whitespace-pre-line">
            {data.education}
          </p>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-[68%]">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#5a1f46] to-[#7a2f61] text-white px-10 py-14">

          <h1 className="text-5xl font-extrabold uppercase tracking-wide leading-tight">
            {data.fullName}
          </h1>

          <div className="w-24 h-1 bg-white mt-4 rounded-full"></div>

          <p className="mt-5 text-2xl font-light uppercase tracking-[3px]">
            {data.jobTitle}
          </p>
        </div>

        {/* BODY */}
        <div className="px-10 py-10 text-black">

          {/* PROFILE */}
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-4">

              <div className="w-4 h-4 rounded-full bg-[#5a1f46]"></div>

              <h2 className="text-[#5a1f46] text-[20px] font-bold uppercase tracking-wide">
                Profile
              </h2>
            </div>

            <p className="leading-8 text-gray-700 text-[15px]">
              {summary}
            </p>
          </section>

          {/* EXPERIENCE */}
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-4">

              <div className="w-4 h-4 rounded-full bg-[#5a1f46]"></div>

              <h2 className="text-[#5a1f46] text-[20px] font-bold uppercase tracking-wide">
                Experience
              </h2>
            </div>

            <p className="leading-8 text-gray-700 text-[15px] whitespace-pre-line">
              {data.experience}
            </p>
          </section>

          {/* EDUCATION */}
          <section>
            <div className="flex items-center gap-4 mb-4">

              <div className="w-4 h-4 rounded-full bg-[#5a1f46]"></div>

              <h2 className="text-[#5a1f46] text-[20px] font-bold uppercase tracking-wide">
                Education
              </h2>
            </div>

            <p className="leading-8 text-gray-700 text-[15px] whitespace-pre-line">
              {data.education}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}