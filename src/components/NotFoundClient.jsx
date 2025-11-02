"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";

export default function NotFoundClient() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxX = mounted
    ? (mousePos.x -
        (typeof window !== "undefined" ? window.innerWidth : 0) / 2) /
      50
    : 0;
  const parallaxY = mounted
    ? (mousePos.y -
        (typeof window !== "undefined" ? window.innerHeight : 0) / 2) /
      50
    : 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            top: "20%",
            left: "10%",
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            top: "60%",
            right: "10%",
            transform: `translate(${-parallaxX}px, ${-parallaxY}px)`,
            transition: "transform 0.2s ease-out",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            bottom: "10%",
            left: "50%",
            transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
            transition: "transform 0.2s ease-out",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse leading-none">
            404
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full mt-4 animate-pulse" />
        </div>

        {/* Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto">
            The page you're looking for seems to have vanished into the digital
            void.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.push("/")}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaHome size={20} />
              Go Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => router.back()}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center gap-2">
              <FaArrowLeft size={20} />
              Go Back
            </span>
          </button>

          <button
            onClick={() => router.push("/search")}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center gap-2">
              <FaSearchLocation size={20} />
              Search
            </span>
          </button>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
