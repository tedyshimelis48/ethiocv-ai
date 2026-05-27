import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface Props {
  data: any;
  summary: string;
}

export default function NGOTemplate({
  data,
  summary,
}: Props) {
  return (
    <div
  id="cv-template"
  className="
    w-[794px]
    min-h-[1123px]
    bg-white
    mx-auto
    flex
    overflow-hidden
    shadow-2xl
  "
>
      {/* LEFT */}
      <div className="w-1/3 bg-[#d8c9c9] p-6">

        <div className="flex justify-center">
          <img
            src={
              data.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt="profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-white"
          />
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

        <section className="mt-10">
          <h2 className="text-[#5a1f46] text-[20px] font-bold tracking-wide uppercase border-b-[3px] border-[#5a1f46] pb-2">
            EDUCATION
          </h2>

          <p className="mt-4 whitespace-pre-line">
            {data.education}
          </p>
        </section>
      </div>

      {/* RIGHT */}
      <div className="w-2/3">

        <div className="bg-[#5f95a3] text-white p-10">
          <h1 className="text-5xl font-bold uppercase">
            {data.fullName}
          </h1>

          <p className="mt-3 text-2xl italic">
            {data.jobTitle}
          </p>
        </div>

        <div className="p-10">

          <section className="mb-8">
            <h2 className="text-[#5a1f46] text-[20px] font-bold tracking-wide uppercase border-b-[3px] border-[#5a1f46] pb-2">
              PROFILE
            </h2>

            <p className="leading-7 break-words whitespace-pre-line">
              {summary}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-[#5a1f46] text-[20px] font-bold tracking-wide uppercase border-b-[3px] border-[#5a1f46] pb-2">
              EXPERIENCE
            </h2>

            <p className="leading-7 break-words whitespace-pre-line">
              {data.experience}
            </p>
          </section>

          <section>
            <h2 className="text-[#5a1f46] text-[20px] font-bold tracking-wide uppercase border-b-[3px] border-[#5a1f46] pb-2">
            Skills
          </h2>

            <p className="leading-7 break-words whitespace-pre-line">
              {data.skills}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}