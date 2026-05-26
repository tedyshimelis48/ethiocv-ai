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
      className="w-[850px] mx-auto bg-white flex"
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



        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            CONTACT
          </h2>

          <div className="mt-4 space-y-2">
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p>{data.address}</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">
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
            <h2 className="text-3xl font-bold">
              PROFILE
            </h2>

            <p className="mt-4 leading-8">
              {summary}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold">
              EXPERIENCE
            </h2>

            <p className="mt-4 whitespace-pre-line">
              {data.experience}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">
              SKILLS
            </h2>

            <p className="mt-4 whitespace-pre-line">
              {data.skills}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}