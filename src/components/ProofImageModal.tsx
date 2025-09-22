"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProofImageModal({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Small thumbnail */}
      <Image
        src={src}
        alt={alt}
        width={50}
        height={50}
        className="rounded-md border cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {/* Fullscreen Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setOpen(false)} // click outside closes modal
        >
          <div
            className="relative max-w-4xl w-auto p-4"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image area
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-4 -right-4 bg-white rounded-full px-3 py-1 shadow text-black"
            >
              ✕
            </button>

            {/* Full-size image */}
            <Image
              src={src}
              alt={alt}
              width={800}
              height={800}
              className="mx-auto rounded-lg max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
