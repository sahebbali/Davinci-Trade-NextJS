import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" }, // Existing domain
      { hostname: "res.cloudinary.com" }, // ✅ Add Cloudinary
    ],
  },
};

export default nextConfig;
