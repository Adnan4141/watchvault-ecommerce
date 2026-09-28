"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle } from "lucide-react";

interface AuthProps {
  initialMode: "login" | "register";
}

export function AuthCard({ initialMode }: AuthProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start md:items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="hidden md:flex absolute top-6 left-6 items-center gap-2 text-gray-600 hover:text-[#542A0C] font-bold transition-all transform hover:-translate-x-1 z-20"
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-200">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      {/* Main Auth Container Card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full md:max-w-[760px] grid grid-cols-1 md:grid-cols-2 overflow-hidden min-h-fit mt-2 md:mt-0 border border-gray-100">
        {/* Left Side: Brand Visual with Floating Cart Animation */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-[#542A0C] via-[#3e1d08] to-[#200f04] text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Animated SVG Cart Artwork */}
          <div className="w-48 h-48 relative animate-float z-10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-white/90 drop-shadow-lg"
            >
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="21" r="1.5" fill="#fef08a" />
              <circle cx="20" cy="21" r="1.5" fill="#fef08a" />
              <rect x="8" y="4" width="4" height="4" rx="1" fill="#FACC15" />
              <rect x="14" y="3" width="5" height="5" rx="1" fill="#F87171" />
            </svg>
          </div>

          <div className="text-center mt-6 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold mb-2 backdrop-blur-sm">
              ✨ Original Wristwatches
            </div>
            <h2 className="text-2xl font-black mb-1.5 tracking-tight">
              Watch<span className="text-amber-300">Vault</span>
            </h2>
            <p className="text-white/75 text-xs max-w-xs leading-relaxed">
              Join thousands of watch enthusiasts in Bangladesh. Fast delivery & 100% authentic quality guarantee.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-6 md:p-8 flex flex-col justify-center bg-white relative">
          {/* Mobile Back Link */}
          <div className="flex md:hidden mb-4 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#542A0C] font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <span className="text-xs font-bold text-[#542A0C]">WatchVault</span>
          </div>

          {/* Toggle Button: Login / Register */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setSubmitted(false);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                mode === "login"
                  ? "bg-white text-[#542A0C] shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setSubmitted(false);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                mode === "register"
                  ? "bg-white text-[#542A0C] shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3 animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                {mode === "login" ? "Welcome back!" : "Account Registered Successfully!"}
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                {mode === "login"
                  ? "You have successfully signed into your WatchVault account."
                  : "Your account has been created. You can now track orders and save your wishlist."}
              </p>
              <div className="pt-3">
                <Link
                  href="/"
                  className="inline-block bg-[#542A0C] hover:bg-[#3d1d07] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md"
                >
                  Go to Shop
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Form Header */}
              <div className="mb-5">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                  {mode === "login" ? "Welcome Back!" : "Create an Account"}
                </h2>
                <p className="text-gray-500 text-xs mt-1">
                  {mode === "login"
                    ? "Please enter your details to login."
                    : "Enter your personal details to get started with WatchVault."}
                </p>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-3.5 animate-in slide-in-from-bottom-4 duration-300">
                {mode === "register" && (
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1 uppercase tracking-wide">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Adnan Rahman"
                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C] focus:border-[#542A0C] transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C] focus:border-[#542A0C] transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {mode === "register" && (
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1 uppercase tracking-wide">
                      Phone Number (Mobile)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01700-000000"
                        className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C] focus:border-[#542A0C] transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-9 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C] focus:border-[#542A0C] transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-[#542A0C] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === "register" && (
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1 uppercase tracking-wide">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-9 py-2.5 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C] focus:border-[#542A0C] transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-[#542A0C] cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => alert("Password reset link will be sent to your email.")}
                      className="text-xs font-bold text-[#542A0C] hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#542A0C] hover:bg-[#3E1F09] text-white py-3 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-md flex justify-center items-center gap-2 mt-4 cursor-pointer active:scale-98"
                >
                  {mode === "login" ? "Login Securely" : "Create Account"}
                </button>

                {/* Divider */}
                <div className="mt-5">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-400 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Google Login Button */}
                  <div className="grid grid-cols-1 gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(true);
                      }}
                      className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#542A0C]/30 transition-all group cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                        />
                      </svg>
                      <span className="text-xs font-bold text-gray-700">
                        {mode === "login" ? "Login with Google" : "Sign up with Google"}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
