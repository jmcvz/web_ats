import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/reusables/Navbar"

const applicants = [
  {
    name: "Matthew Jackson",
    email: "matthew.jackson@email.com",
    avatar: "https://i.pravatar.cc/80?u=1",
    status: "Failed",
    badge: "Warm",
    position: "Lead Developer",
    evaluation: "Failed",
    skills: ["Photoshop", "Illustrator", "Agile", "HTML", "CSS"],
    match: "95%",
  },
  {
    name: "Emily Taylor",
    email: "emily.taylor@email.com",
    avatar: "https://i.pravatar.cc/80?u=2",
    status: "Passed",
    badge: "For Job Offer",
    position: "Lead Developer",
    evaluation: "Passed",
    skills: ["Photoshop", "Illustrator", "Agile"],
    match: "90%",
  },
  {
    name: "Brooklyn Wilson",
    email: "brooklyn.wilson@email.com",
    avatar: "https://i.pravatar.cc/80?u=3",
    status: "Passed",
    badge: "Warm",
    position: "Software Developer",
    evaluation: "Passed",
    skills: ["HTML", "CSS", "Java", "Illustrator"],
    match: "87%",
  },
  {
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    avatar: "https://i.pravatar.cc/80?u=4",
    status: "Passed",
    badge: "For Job Offer",
    position: "Lead Developer",
    evaluation: "Passed",
    skills: ["Photoshop", "Agile"],
    match: "85%",
  },
  {
    name: "Anthony Moore",
    email: "anthony.moore@email.com",
    avatar: "https://i.pravatar.cc/80?u=5",
    status: "Failed (Final Interview)",
    badge: "Failed",
    position: "Lead Developer",
    evaluation: "Failed (Final Interview)",
    skills: ["Photoshop", "Illustrator"],
    match: "84%",
  },
]

export default function PoolApplicants() {
  useEffect(() => {
    document.title = "Pool Applicants"
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-[100px] px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-gray-800">Pooling to all Applicants</h2>
            <Input placeholder="Search Applicant Name" className="w-64" />
          </div>

          {/* Position Filter */}
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-60 bg-white shadow-sm">
                <SelectValue placeholder="UI Designer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ui-designer">UI Designer</SelectItem>
                <SelectItem value="lead-dev">Lead Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subheader */}
          <h2 className="text-lg font-semibold text-gray-700">
            Top Applicants for <span className="text-blue-600">UI Designer</span>
          </h2>

          {/* Applicant Cards */}
          <div className="space-y-4 pb-20">
            {applicants.map((applicant, index) => (
              <div
                key={index}
                className="flex items-start justify-between bg-white p-4 rounded-lg shadow-sm border"
              >
                {/* Left side */}
                <div className="flex items-start gap-4">
                  <img
                    src={applicant.avatar}
                    alt={applicant.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-md font-semibold">{applicant.name}</h3>
                      {applicant.badge && (
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            applicant.badge === "Warm"
                              ? "bg-yellow-100 text-yellow-800"
                              : applicant.badge === "For Job Offer"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {applicant.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{applicant.email}</p>
                    <p className="text-sm text-gray-500">
                      Position Applied: <span className="text-gray-700">{applicant.position}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Interview Evaluation Status:{" "}
                      <span className="text-gray-700">{applicant.evaluation}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Matched Skills:{" "}
                      <span className="text-gray-700">{applicant.skills.join(", ")}</span>
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-medium text-gray-700">
                    {applicant.match} matched
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button className="bg-[#0056D2]" size="sm">Email applicant</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
