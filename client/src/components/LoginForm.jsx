import React, { useState } from "react";
import EmployeeFormLeftSide from "./EmployeeFormLelfSide";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Eye, EyeOff } from "lucide-react";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    setError("");

    console.log({
      role,
      email,
      password,
    });

    // API call goes here
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <EmployeeFormLeftSide />

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-8 transition-colors"
          >
            <ArrowLeftIcon size={18} />
            Back to portals
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-800">
              {title}
            </h1>
            <p className="text-slate-500 mt-2">{subtitle}</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-950 hover:bg-indigo-900 text-white py-3 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;