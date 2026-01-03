"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span
                className={`text-2xl font-bold transition-colors ${
                  isScrolled ? "text-blue-600" : "text-white"
                }`}
              >
                DaNang<span className="text-orange-500">Trip</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-orange-400 ${
                isScrolled ? "text-gray-800" : "text-white text-shadow-sm"
              }`}
            >
              Trang chủ
            </Link>
            <Link
              href="/review"
              className={`text-sm font-medium transition-colors hover:text-orange-400 ${
                isScrolled ? "text-gray-800" : "text-white text-shadow-sm"
              }`}
            >
              Review
            </Link>
            <Link
              href="/map"
              className={`text-sm font-medium transition-colors hover:text-orange-400 ${
                isScrolled ? "text-gray-800" : "text-white text-shadow-sm"
              }`}
            >
              Bản đồ
            </Link>
            <Link
              href="/login"
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                isScrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              Đăng nhập
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } focus:outline-none`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
