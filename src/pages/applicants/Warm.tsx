"use client"
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowLeft} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/reusables/Navbar"

// Sample data with email and phone
const applicants = [
  {
    id: "001",
    name: "John Doe",
    position: "Senior Software Engineer",
    department: "Engineering",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    avatar: "https://i.pravatar.cc/32?u=001",
  },
  {
    id: "002",
    name: "Sarah Johnson",
    position: "Frontend Developer",
    department: "Engineering",
    email: "sarah.johnson@email.com",
    phone: "(555) 234-5678",
    avatar: "https://i.pravatar.cc/32?u=002",
  },
  {
    id: "003",
    name: "Mike Chen",
    position: "UI/UX Designer",
    department: "Design",
    email: "mike.chen@email.com",
    phone: "(555) 345-6789",
    avatar: "https://i.pravatar.cc/32?u=003",
  },
  {
    id: "004",
    name: "Emily Rodriguez",
    position: "Backend Developer",
    department: "Engineering",
    email: "emily.rodriguez@email.com",
    phone: "(555) 456-7890",
    avatar: "https://i.pravatar.cc/32?u=004",
  },
  {
    id: "005",
    name: "David Kim",
    position: "Product Manager",
    department: "Product",
    email: "david.kim@email.com",
    phone: "(555) 567-8901",
    avatar: "https://i.pravatar.cc/32?u=005",
  },
  {
    id: "006",
    name: "Lisa Wang",
    position: "Data Analyst",
    department: "Analytics",
    email: "lisa.wang@email.com",
    phone: "(555) 678-9012",
    avatar: "https://i.pravatar.cc/32?u=006",
  },
]

const positions = [
  "Senior Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Product Manager",
  "Data Analyst",
]
const departments = ["Engineering", "Design", "Product", "Analytics", "Marketing", "Sales"]

// Send Requirements Modal

export default function JobOfferManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")

  // Modal states

  const navigate = useNavigate()

  const handleStageChange = (value: string) => {
    const routeMap: Record<string, string> = {
      "resume-screening": "/applicants/jobdetails/leaddeveloper/LeadDeveloperRS/",
      "phone-call": "/applicants/jobdetails/leaddeveloper/LeadDeveloperPI",
      shortlisted: "/applicants/jobdetails/leaddeveloper/LeadDeveloperSL",
      "initial-interview": "/applicants/jobdetails/leaddeveloper/LeadDeveloperII",
      assessments: "/applicants/jobdetails/leaddeveloper/LeadDeveloperAS",
      "final-interview": "/applicants/jobdetails/leaddeveloper/LeadDeveloperFI",
      "job-offer": "/applicants/jobdetails/leaddeveloper/LeadDeveloperFJO",
      "offer-finalization": "/applicants/jobdetails/leaddeveloper/OfferAndFinalization",
      onboarding: "/applicants/jobdetails/leaddeveloper/LeadDeveloperONB",
    }

    const target = routeMap[value]
    if (target) {
      navigate(target)
    }
  }

  const filterApplicants = (applicants: any[]) => {
    return applicants.filter((applicant) => {
      const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPosition = positionFilter === "all" || positionFilter === "" || applicant.position === positionFilter
      const matchesDepartment =
        departmentFilter === "all" || departmentFilter === "" || applicant.department === departmentFilter
      return matchesSearch && matchesPosition && matchesDepartment
    })
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setPositionFilter("")
    setDepartmentFilter("")
  }

  const filteredApplicants = useMemo(() => filterApplicants(applicants), [searchTerm, positionFilter, departmentFilter])


  const handlePassFail = (applicant: any, status: "pass" | "fail") => {
    console.log(`${applicant.name} marked as ${status}`)
  }

  const renderSearchAndFilters = () => (
    <div className="flex flex-col gap-4 mb-4">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search applicants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Select value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger className="w-64 sm:w-48">
            <SelectValue placeholder="Filter by Positions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {positions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-64 sm:w-48">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-64 sm:w-auto bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 mt-20">
        <div className="mx-auto max-w-7xl space-y-4">
          {/* Header Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Select defaultValue="warm" onValueChange={handleStageChange}>
  <SelectTrigger className="w-64 font-bold">
    <SelectValue placeholder="For Offer And Finalization" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem className="font-bold" value="resume-screening">Resume Screening</SelectItem>
    <SelectItem  className="font-bold" value="phone-call">Phone Call Interview</SelectItem>
    <SelectItem  className="font-bold" value="shortlisted">Shortlisted</SelectItem>
    <SelectItem  className="font-bold" value="initial-interview">Initial Interview</SelectItem>
    <SelectItem  className="font-bold" value="assessments">Assessments</SelectItem>
    <SelectItem  className="font-bold" value="final-interview">Final Interview</SelectItem>
    <SelectItem  className="font-bold" value="job-offer">For Job Offer</SelectItem>
    <SelectItem  className="font-bold" value="offer-finalization">For Offer And Finalization</SelectItem>
    <SelectItem  className="font-bold" value="onboarding">Onboarding</SelectItem>
    <SelectItem value="warm" className="font-bold">Warm</SelectItem>
  </SelectContent>
</Select>

          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {renderSearchAndFilters()}
            <div className="rounded-md border bg-white overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-white to-transparent w-8 h-full pointer-events-none z-10 opacity-50"></div>
              <Table className="w-full table-fixed min-w-[1000px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-200 py-4 px-2 text-xs font-medium text-center break-words whitespace-normal leading-tight min-h-[80px] align-middle w-[80px]">
                      ID
                    </TableHead>
                    <TableHead className="border border-gray-200 py-4 px-2 text-xs font-medium text-center break-words whitespace-normal leading-tight min-h-[80px] align-middle w-[150px]">
                      Full Name
                    </TableHead>
                    <TableHead className="border border-gray-200 py-4 px-2 text-xs font-medium text-center break-words whitespace-normal leading-tight min-h-[80px] align-middle w-[100px]">
                      Pass
                    </TableHead>
                    <TableHead className="border border-gray-200 py-4 px-2 text-xs font-medium text-center break-words whitespace-normal leading-tight min-h-[80px] align-middle w-[100px]">
                      Fail
                    </TableHead>
                    <TableHead className="border border-gray-200 py-4 px-2 text-xs font-medium text-center break-words whitespace-normal leading-tight min-h-[80px] align-middle w-[180px]">
                      Applied Position
                    </TableHead>
                    <TableHead className="border border-gray-200 py-4 px-2 text-xs font-medium text-center break-words whitespace-normal leading-tight min-h-[80px] align-middle w-[200px]">
                      Email Address
                    </TableHead>
                    <TableHead className="border border-gray-200 py-4 px-2 text-xs font-medium text-center break-words whitespace-normal leading-tight min-h-[80px] align-middle w-[140px]">
                      Phone Number
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="border border-gray-200 py-3 px-2 text-xs break-words min-h-[80px] align-middle text-center">
                        {applicant.id}
                      </TableCell>
                      <TableCell className="border border-gray-200 py-3 px-2 text-xs break-words min-h-[80px] align-middle text-center">
  <div className="flex items-center gap-2 justify-center">
    <Avatar className="h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0">
      <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
      <AvatarFallback className="text-xs lg:text-sm">
        {applicant.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
    <span
      className="font-medium text-xs lg:text-sm break-words leading-tight lg:whitespace-nowrap"
      title={applicant.name}
    >
      {applicant.name}
    </span>
  </div>
</TableCell>

                      <TableCell className="border border-gray-200 py-3 px-2 min-h-[80px] align-middle">
                        <div className="flex justify-center">
                          <Button
                            onClick={() => handlePassFail(applicant, "pass")}
                            className="bg-green-50 text-green-600 border border-green-600 hover:bg-green-100 rounded text-xs px-3 py-1"
                          >
                            Pass
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="border border-gray-200 py-3 px-2 min-h-[80px] align-middle">
                        <div className="flex justify-center">
                          <Button
                            onClick={() => handlePassFail(applicant, "fail")}
                            className="bg-red-50 text-red-600 border border-red-600 hover:bg-red-100 rounded text-xs px-3 py-1"
                          >
                            Fail
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="border border-gray-200 py-3 px-2 text-xs break-words min-h-[80px] align-middle text-center">
                        {applicant.position}
                      </TableCell>
                      <TableCell className="border border-gray-200 py-3 px-2 text-xs break-words min-h-[80px] align-middle text-center">
                        {applicant.email}
                      </TableCell>
                      <TableCell className="border border-gray-200 py-3 px-2 text-xs break-words min-h-[80px] align-middle text-center">
                        {applicant.phone}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Modals */}
        


      
        </div>
      </div>
    </>
  )
}
