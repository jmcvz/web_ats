"use client"

import { Navbar } from "@/reusables/Navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function PRF() {
  useEffect(() => {
    document.title = "Personnel Requisition Form"
  }, [])

  const navigate = useNavigate()

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-4">
          {/* Title */}
          <h2 className="text-4xl font-bold text-gray-800">Personnel Requisition Form</h2>


          {/* Form Stepper */}
          <div className="flex space-x-6 mt-6">
            {['Step 01', 'Step 02', 'Step 03', 'Step 04'].map((step, idx) => (
              <div
                key={idx}
                className={`text-sm font-semibold px-4 py-2 border-b-4 ${idx === 0 ? 'border-blue-600 text-blue-600' : 'border-gray-200 text-gray-400'}`}
              >
                {step}
              </div>
            ))}
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Left Form */}
            <div className="space-y-6">
              <div>
                <h2 className="text-blue-700 font-bold text-sm mb-2">POSITION INFORMATION</h2>
                <Input placeholder="All Job Title" className="mb-3" />
                <Input placeholder="Ex: 5" className="mb-3" />
                <Input placeholder="Ex: Replacement for Resigned Employee" className="mb-3" />
                <Input type="date" className="mb-3" />
              </div>

              <div>
                <h2 className="text-blue-700 font-bold text-sm mb-2">DEPARTMENT INFORMATION</h2>
                <div className="flex space-x-4 mb-3">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="unit" value="OODC" /> <span>OODC</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="unit" value="OORS" /> <span>OORS</span>
                  </label>
                </div>
                <Select>
                  <SelectTrigger className="mb-3">
                    <SelectValue placeholder="Ex: Information Technology" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Information Technology</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="4" className="mb-3" />
                <Select>
                  <SelectTrigger className="mb-3">
                    <SelectValue placeholder="Ex: Ms. Hailey Adams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hailey">Ms. Hailey Adams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Interview Levels */}
              <div className="border rounded-md">
                <div className="grid grid-cols-2 text-sm font-semibold bg-gray-100 p-2">
                  <div>LEVELS OF INTERVIEW</div>
                  <div>HIRING MANAGERS</div>
                </div>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="grid grid-cols-2 p-2 border-t items-center">
                    <span className="text-sm">👤 Hiring Manager {num}</span>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={`manager${num}`}>Manager {num}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-4">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate("/positions/job")}>Next</Button>
              </div>
            </div>

            {/* Right Preview Panel */}
            <div className="bg-white border rounded-md p-4 text-sm">
              <h2 className="text-blue-700 font-bold text-sm mb-2">POSITION INFORMATION</h2>
              <p><strong>Job Title:</strong> UI Designer Manager</p>
              <p><strong>Target Start Date:</strong> March 28, 2025</p>
              <p><strong>Number of Vacancies:</strong> 3</p>
              <p><strong>Reason for Posting Position:</strong> New role to support product development</p>

              <h2 className="text-blue-700 font-bold text-sm mt-4 mb-2">DEPARTMENT INFORMATION</h2>
              <p><strong>Business Unit:</strong> OODC</p>
              <p><strong>Levels of Interview:</strong> 3</p>
              <p><strong>Department Name:</strong> Continuous Improvement Department</p>
              <p><strong>Immediate Supervisor:</strong> Hailey Adams</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
