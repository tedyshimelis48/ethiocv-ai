"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/lib/supabase";

interface Props {
  setImageUrl: (url: string) => void;
}

export default function ImageUpload({
  setImageUrl,
}: Props) {

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {

      const file = acceptedFiles[0];

      if (!file) return;

      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("profile-images")
        .upload(fileName, file);

      if (error) {
        console.log("UPLOAD ERROR:", error);

alert(
  error.message || "Upload failed"
);
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);

      setImageUrl(publicUrl);
    },
    [setImageUrl]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="
        border-2 border-dashed
        border-gray-400
        p-8
        rounded-xl
        text-center
        cursor-pointer
        hover:border-[#5a1f46]
        transition
      "
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p className="text-[#5a1f46] font-semibold">
          Drop image here...
        </p>
      ) : (
        <div>
          <div className="space-y-2">
  <p className="font-semibold text-lg">
    Upload Professional Photo
  </p>

  <p className="text-gray-500 text-sm">
    Drag & drop or click to browse
  </p>
</div>
          <p className="text-gray-500 text-sm mt-2">
            or click to select image
          </p>
        </div>
      )}
    </div>
  );
}