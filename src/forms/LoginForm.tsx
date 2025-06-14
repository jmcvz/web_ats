import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Dummy credentials
    const dummyEmail = "test@example.com"
    const dummyPassword = "password123"

    if (email === dummyEmail && password === dummyPassword) {
      window.location.href = "http://localhost:5173/dashboard"
    } else {
      alert("Invalid email or password")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-6 font-oswald">
        Welcome!
      </h1>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            className="pl-10 pr-4 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-lg">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            className="pl-10 pr-12 text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="mb-6">
        <label className="inline-flex items-center cursor-pointer text-lg">
          <input type="checkbox" className="peer hidden" />
          <div className="w-6 h-6 mr-3 rounded-sm border border-gray-400 flex items-center justify-center peer-checked:bg-blue-600">
            <svg
              className="w-5 h-5 text-white hidden peer-checked:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          Keep me logged in
        </label>
      </div>

      <Button type="submit" className="w-full text-lg py-6 bg-blue-800">
        LOG IN
      </Button>
    </form>
  )
}

export default LoginForm
