import React, { useState } from "react";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Main */}
      <div className="flex flex-col md:flex-row flex-grow min-h-0 bg-gray-50">
        {/* Title and Logo */}
        <div className="w-full md:w-[45%] bg-white p-6 flex flex-col justify-center items-center flex-shrink-0">
  <img
    src="/OODC logo2.png"
    alt="OODC Logo"
    className="w-60 sm:w-72 md:w-96 lg:w-[30rem] xl:w-[36rem] mb-6"
  />
</div>

      {/* Login Form */}
<div className="w-full md:w-[55%] bg-gray-50 flex items-center justify-center px-6 sm:px-8 py-10">
  <div className="w-full max-w-2xl relative z-10">
    <form className="space-y-10">
      <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-6 font-oswald">
        Welcome!
      </h1>

      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-lg font-medium text-black mb-2">
          Email:
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className="pl-14 pr-4 py-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-medium text-black mb-2">
          Password:
        </label>
        <div className="relative flex items-center border border-gray-300 rounded-md py-3 px-4 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6-6h-1V9a5 5 0 00-10 0v2H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-3 0H9V9a3 3 0 016 0v2z" />
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="flex-1 text-lg bg-transparent focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {/* eye icon here */}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <div className="mb-6">
        <label className="inline-flex items-center cursor-pointer text-lg">
          <input type="checkbox" className="peer hidden" id="remember" name="remember" />
          <div className="w-6 h-6 mr-3 rounded-sm border border-gray-400 flex items-center justify-center peer-checked:bg-blue-600">
            <svg className="w-5 h-5 text-white hidden peer-checked:block" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          Keep me logged in
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 text-lg px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </form>
  </div>
</div>
</div>

      {/* Footer */}
      <footer className="bg-white text-center py-2 text-sm text-gray-700 shadow-md mt-auto">
        © 2024 Outsource Direct Corporation |{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
      </footer>
    </div>
  );
};

export default Login;
