import { Navbar } from "@/reusables/Navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronDown } from "lucide-react"
import { useEffect } from "react"

// tab title
export default function Applicants() {
    useEffect(() => {
    document.title = "Applicants";
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">Applicants</h1>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border rounded-md p-4 bg-white shadow-sm">
            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applicants..."
                  className="pl-9 pr-3 py-2 w-[200px] md:w-[250px]"
                />
              </div>

              {/* Dropdown Filters */}
              {[
                "All Internal",
                "All Status",
                "All Job Position",
                "All Departments",
                "Employment Type",
              ].map((label) => (
                <DropdownMenu key={label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-sm font-normal flex items-center gap-1"
                    >
                      {label}
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {/* Empty for now */}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>

            {/* Clear filters */}
            <button className="text-xs text-muted-foreground hover:underline">
              Clear filters
            </button>
          </div>

          {/* Applicants Table */}
          <div className="mt-6 overflow-x-auto rounded-md border bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr className="text-xs text-muted-foreground uppercase">
                  <th className="px-6 py-4 font-medium">Applicants</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Position applying for</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Employment Type</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  {
                    name: "Maria White",
                    status: "Hired",
                    position: "Project Manager",
                    department: "CI",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=1",
                  },
                  {
                    name: "Carmen Martinez",
                    status: "Failed",
                    position: "Social Media Manager",
                    department: "Marketing",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=2",
                  },
                  {
                    name: "Olivia Miller",
                    status: "Warm",
                    position: "Senior UI/UX Designer",
                    department: "CI",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=3",
                  },
                  {
                    name: "Jessica Gonzalez",
                    status: "Hired",
                    position: "Lead Developer",
                    department: "CI",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=4",
                  },
                  {
                    name: "Rachel Miller",
                    status: "Hired",
                    position: "Lead Developer",
                    department: "CI",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=5",
                  },
                  {
                    name: "Olivia Miller",
                    status: "For Interview",
                    position: "Lead Developer",
                    department: "CI",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=6",
                  },
                  {
                    name: "Nathan Wood",
                    status: "For Interview",
                    position: "QA Engineer",
                    department: "CI",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=7",
                  },
                  {
                    name: "Sarah White",
                    status: "For Job Offer",
                    position: "QA Engineer",
                    department: "CI",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=8",
                  },
                  {
                    name: "Michael Taylor",
                    status: "Onboarding",
                    position: "Operations Manager",
                    department: "HR",
                    type: "Full Time",
                    avatar: "https://i.pravatar.cc/40?u=9",
                  },
                ].map((applicant, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={applicant.avatar}
                        alt={applicant.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{applicant.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          applicant.status === "Hired"
                            ? "bg-green-100 text-green-800"
                            : applicant.status === "Failed"
                            ? "bg-red-100 text-red-800"
                            : applicant.status === "Warm"
                            ? "bg-yellow-100 text-yellow-800"
                            : applicant.status === "For Interview"
                            ? "bg-orange-100 text-orange-800"
                            : applicant.status === "For Job Offer"
                            ? "bg-blue-100 text-blue-800"
                            : applicant.status === "Onboarding"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{applicant.position}</td>
                    <td className="px-6 py-4">{applicant.department}</td>
                    <td className="px-6 py-4">{applicant.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer buttons */}
            <div className="flex justify-between items-center px-6 py-3 border-t bg-gray-50">
              <Button
                variant="default"
                size="sm"
                style={{ backgroundColor: "#0056D2", color: "white" }}
              >
                Pool Applicant
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Next &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
