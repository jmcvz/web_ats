"use client"
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search, Plus } from "lucide-react"
import { Navbar } from "@/reusables/Navbar"

// Sample data for different tabs
const acceptedApplicants = [
  {
    id: "001",
    name: "John Doe",
    position: "Senior Software Engineer",
    department: "Engineering",
  },
  {
    id: "002",
    name: "Sarah Johnson",
    position: "Frontend Developer",
    department: "Engineering",
  },
  {
    id: "003",
    name: "Mike Chen",
    position: "UI/UX Designer",
    department: "Design",
  },
]

const rejectedApplicants = [
  {
    id: "004",
    name: "Emily Rodriguez",
    position: "Backend Developer",
    department: "Engineering",
  },
  {
    id: "005",
    name: "David Kim",
    position: "Product Manager",
    department: "Product",
  },
]

const rescindedApplicants = [
  {
    id: "006",
    name: "Lisa Wang",
    position: "Data Analyst",
    department: "Analytics",
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
function SendRequirementsModal({
  isOpen,
  onClose,
  applicantName,
}: { isOpen: boolean; onClose: () => void; applicantName: string }) {
  const [submissionDate, setSubmissionDate] = useState("")
  const [reportDate, setReportDate] = useState("")
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([])
  const [customRequirements, setCustomRequirements] = useState<string[]>([])
  const [newRequirement, setNewRequirement] = useState("")

  const defaultRequirements = [
    "Valid NBI Clearance or Police Clearance",
    "Medical Certificate",
    "Certificate of Employment",
    "Income Tax Return (ITR 2316)",
    "Barangay Clearance",
    "Photocopy of Dependents Birth Certificate (if applicable)",
    "Photocopy of Marriage Contract (if applicable)",
    "Photocopy of Birth Certificate",
    "Photocopy of BIR ID / TIN Card",
    "Photocopy of SSS ID/ E1 Form",
    "Photocopy of PhilHealth Card",
    "Photocopy of Pag-ibig ID/Certificate/Record of Contribution",
    "2 pieces of 2x2 size photo",
    "2 pieces of 1x1 size photo",
    "Photocopy of SSS and Pag-ibig loan voucher (if with current loan)",
    "Photocopy of other Government-Issued IDs",
  ]

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    if (checked) {
      setSelectedRequirements([...selectedRequirements, requirement])
    } else {
      setSelectedRequirements(selectedRequirements.filter((r) => r !== requirement))
    }
  }

  const addCustomRequirement = () => {
    if (newRequirement.trim()) {
      setCustomRequirements([...customRequirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl mx-4">
        <div className="bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Send Requirements</h2>
            <hr className="border-blue-600 border-t-2" />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="submission-date" className="text-sm font-medium text-gray-700 mb-1 block">
                  Submission Date (DD/MM/YYYY)
                </Label>
                <Input
                  id="submission-date"
                  type="date"
                  value={submissionDate}
                  onChange={(e) => setSubmissionDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="report-date" className="text-sm font-medium text-gray-700 mb-1 block">
                  Report Date (DD/MM/YYYY HH:MM)
                </Label>
                <Input
                  id="report-date"
                  type="datetime-local"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Requirement List:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {defaultRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`req-${index}`}
                      checked={selectedRequirements.includes(requirement)}
                      onChange={(e) => handleRequirementChange(requirement, e.target.checked)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor={`req-${index}`} className="text-sm text-gray-700">
                      {index + 1}. {requirement}
                    </label>
                  </div>
                ))}
                {customRequirements.map((requirement, index) => (
                  <div key={`custom-${index}`} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`custom-req-${index}`}
                      checked={selectedRequirements.includes(requirement)}
                      onChange={(e) => handleRequirementChange(requirement, e.target.checked)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor={`custom-req-${index}`} className="text-sm text-gray-700">
                      {defaultRequirements.length + index + 1}. {requirement}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Add custom requirement..."
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addCustomRequirement} className="bg-blue-600 text-white hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log(`Requirements sent to ${applicantName}!`)
                onClose()
              }}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reconsider Modal
function ReconsiderModal({ isOpen, onClose, applicant }: { isOpen: boolean; onClose: () => void; applicant: any }) {
  const [reconsiderPosition, setReconsiderPosition] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Reconsider</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to reconsider this applicant?</p>
            <hr className="border-blue-600 border-t-2" />
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="position-applied" className="text-sm font-medium text-gray-700 mb-1 block">
                Position Applied
              </Label>
              <Input id="position-applied" value={applicant?.position || ""} disabled className="bg-gray-100" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="reconsider-position" className="text-sm font-medium text-gray-700 mb-1 block">
                  Reconsider to Position
                </Label>
                <Select value={reconsiderPosition} onValueChange={setReconsiderPosition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions
                      .filter((pos) => pos !== applicant?.position)
                      .map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => {
                    console.log(`Reconsidering ${applicant?.name} for the same position`)
                    onClose()
                  }}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Reconsider for the same position
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log(`Reconsidering ${applicant?.name} for ${reconsiderPosition || applicant?.position}`)
                onClose()
              }}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Rescind Modal
function RescindModal({
  isOpen,
  onClose,
  applicantName,
}: { isOpen: boolean; onClose: () => void; applicantName: string }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Rescind</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to rescind this applicant?</p>
            <hr className="border-blue-600 border-t-2" />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log(`Rescinded ${applicantName}`)
                onClose()
              }}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JobOfferManagement() {
  const [activeTab, setActiveTab] = useState("accepted")
  const [searchTerms, setSearchTerms] = useState({
    accepted: "",
    rejected: "",
    rescinded: "",
  })
  const [positionFilters, setPositionFilters] = useState({
    accepted: "",
    rejected: "",
    rescinded: "",
  })
  const [departmentFilters, setDepartmentFilters] = useState({
    accepted: "",
    rejected: "",
    rescinded: "",
  })

  // Modal states
    const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false)
  const [isReconsiderModalOpen, setIsReconsiderModalOpen] = useState(false)
  const [isRescindModalOpen, setIsRescindModalOpen] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null)

  const navigate = useNavigate()

  const handleStageChange = (value: string) => {
    const routeMap: Record<string, string> = {
      "resume-screening": "/applicants/jobdetails/leaddeveloper/LeadDeveloperRS/",
      "phone-call": "/applicants/jobdetails/leaddeveloper/LeadDeveloperPI",
      "shortlisted": "/applicants/jobdetails/leaddeveloper/LeadDeveloperSL",
      "initial-interview": "/applicants/jobdetails/leaddeveloper/LeadDeveloperII",
      "assessments": "/applicants/jobdetails/leaddeveloper/LeadDeveloperAS",
      "final-interview": "/applicants/jobdetails/leaddeveloper/LeadDeveloperFI",
      "job-offer": "/applicants/jobdetails/leaddeveloper/LeadDeveloperFJO",
      "offer-finalization": "/applicants/jobdetails/leaddeveloper/OfferAndFinalization",
      "onboarding": "/applicants/jobdetails/leaddeveloper/LeadDeveloperONB",
    }

    const target = routeMap[value]
    if (target) {
      navigate(target)
    }
  }

  // Filter functions
   const filterApplicants = (applicants: any[], tab: string) => {
    return applicants.filter((applicant) => {
      const matchesSearch = applicant.name
        .toLowerCase()
        .includes(searchTerms[tab as keyof typeof searchTerms].toLowerCase())
      const matchesPosition =
        positionFilters[tab as keyof typeof positionFilters] === "all" ||
        positionFilters[tab as keyof typeof positionFilters] === "" ||
        applicant.position === positionFilters[tab as keyof typeof positionFilters]
      const matchesDepartment =
        departmentFilters[tab as keyof typeof departmentFilters] === "all" ||
        departmentFilters[tab as keyof typeof departmentFilters] === "" ||
        applicant.department === departmentFilters[tab as keyof typeof departmentFilters]
      return matchesSearch && matchesPosition && matchesDepartment
    })
  }

  const filteredAccepted = useMemo(
    () => filterApplicants(acceptedApplicants, "accepted"),
    [searchTerms.accepted, positionFilters.accepted, departmentFilters.accepted]
  )
  const filteredRejected = useMemo(
    () => filterApplicants(rejectedApplicants, "rejected"),
    [searchTerms.rejected, positionFilters.rejected, departmentFilters.rejected]
  )
  const filteredRescinded = useMemo(
    () => filterApplicants(rescindedApplicants, "rescinded"),
    [searchTerms.rescinded, positionFilters.rescinded, departmentFilters.rescinded]
  )

  const handleSendRequirements = (applicant: any) => {
    setSelectedApplicant(applicant)
    setIsRequirementsModalOpen(true)
  }

  const handleReconsider = (applicant: any) => {
    setSelectedApplicant(applicant)
    setIsReconsiderModalOpen(true)
  }

  const handleRescind = (applicant: any) => {
    setSelectedApplicant(applicant)
    setIsRescindModalOpen(true)
  }

  const renderSearchAndFilters = (tab: string) => (
    <div className="flex flex-col gap-4 mb-4">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search applicants..."
          value={searchTerms[tab as keyof typeof searchTerms]}
          onChange={(e) => setSearchTerms((prev) => ({ ...prev, [tab]: e.target.value }))}
          className="pl-8"
        />
      </div>
      <div className="flex gap-4">
        <Select
          value={positionFilters[tab as keyof typeof positionFilters]}
          onValueChange={(value) => setPositionFilters((prev) => ({ ...prev, [tab]: value }))}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Position" />
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
        <Select
          value={departmentFilters[tab as keyof typeof departmentFilters]}
          onValueChange={(value) => setDepartmentFilters((prev) => ({ ...prev, [tab]: value }))}
        >
          <SelectTrigger className="w-48">
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
      </div>
    </div>
  )

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-4 mt-20">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <Select defaultValue="offer-finalization" onValueChange={handleStageChange}>
              <SelectTrigger className="w-64">
                <SelectValue className="font-bold" placeholder="For Offer And Finalization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="font-bold" value="resume-screening">Resume Screening</SelectItem>
  <SelectItem className="font-bold" value="phone-call">Phone Call Interview</SelectItem>
  <SelectItem className="font-bold" value="shortlisted">Shortlisted</SelectItem>
  <SelectItem className="font-bold" value="initial-interview">Initial Interview</SelectItem>
  <SelectItem className="font-bold" value="assessments">Assessments</SelectItem>
  <SelectItem className="font-bold" value="final-interview">Final Interview</SelectItem>
  <SelectItem className="font-bold" value="job-offer">For Job Offer</SelectItem>
  <SelectItem className="font-bold" value="offer-finalization">For Offer And Finalization</SelectItem>
  <SelectItem className="font-bold" value="onboarding">Onboarding</SelectItem>
              </SelectContent>
            </Select>
          </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="rescinded">Rescinded</TabsTrigger>
          </TabsList>

          {/* Accepted Tab */}
          <TabsContent value="accepted" className="space-y-4">
            {renderSearchAndFilters("accepted")}
            <div className="rounded-md border bg-white overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-200">ID Number</TableHead>
                    <TableHead className="border border-gray-200">Full Name</TableHead>
                    <TableHead className="border border-gray-200">Position Applying For</TableHead>
                    <TableHead className="border border-gray-200">Requirements</TableHead>
                    <TableHead className="border border-gray-200">Rescind</TableHead>
                    <TableHead className="border border-gray-200">Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccepted.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="border border-gray-200">{applicant.id}</TableCell>
                      <TableCell className="border border-gray-200">{applicant.name}</TableCell>
                      <TableCell className="border border-gray-200">{applicant.position}</TableCell>
                      <TableCell className="border border-gray-200">
                        <Button
                          onClick={() => handleSendRequirements(applicant)}
                          className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 rounded"
                        >
                          Send Requirement
                        </Button>
                      </TableCell>
                      <TableCell className="border border-gray-200">
                        <Button
                          onClick={() => handleRescind(applicant)}
                          className="bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-50 rounded"
                        >
                          Rescind
                        </Button>
                      </TableCell>
                      <TableCell className="border border-gray-200">{applicant.department}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Rejected Tab */}
          <TabsContent value="rejected" className="space-y-4">
            {renderSearchAndFilters("rejected")}
            <div className="rounded-md border bg-white overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-200">ID Number</TableHead>
                    <TableHead className="border border-gray-200">Full Name</TableHead>
                    <TableHead className="border border-gray-200">Position Applying For</TableHead>
                    <TableHead className="border border-gray-200">Department</TableHead>
                    <TableHead className="border border-gray-200">Reconsider</TableHead>
                    <TableHead className="border border-gray-200">Job Offer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRejected.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="border border-gray-200">{applicant.id}</TableCell>
                      <TableCell className="border border-gray-200">{applicant.name}</TableCell>
                      <TableCell className="border border-gray-200">{applicant.position}</TableCell>
                      <TableCell className="border border-gray-200">{applicant.department}</TableCell>
                      <TableCell className="border border-gray-200">
                        <Button
                          onClick={() => handleReconsider(applicant)}
                          className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 rounded"
                        >
                          Reconsider
                        </Button>
                      </TableCell>
                      <TableCell className="border border-gray-200">
                        <a
                          href={`/job-offers/Job_Offer_${applicant.name.split(" ").pop()}.pdf`}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Job_Offer_{applicant.name.split(" ").pop()}.pdf
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Rescinded Tab */}
          <TabsContent value="rescinded" className="space-y-4">
            {renderSearchAndFilters("rescinded")}
            <div className="rounded-md border bg-white overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-gray-200">ID Number</TableHead>
                    <TableHead className="border border-gray-200">Full Name</TableHead>
                    <TableHead className="border border-gray-200">Position Applying For</TableHead>
                    <TableHead className="border border-gray-200">Department</TableHead>
                    <TableHead className="border border-gray-200">Reconsider</TableHead>
                    <TableHead className="border border-gray-200">Job Offer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRescinded.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="border border-gray-200">{applicant.id}</TableCell>
                      <TableCell className="border border-gray-200">{applicant.name}</TableCell>
                      <TableCell className="border border-gray-200">{applicant.position}</TableCell>
                      <TableCell className="border border-gray-200">{applicant.department}</TableCell>
                      <TableCell className="border border-gray-200">
                        <Button
                          onClick={() => handleReconsider(applicant)}
                          className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 rounded"
                        >
                          Reconsider
                        </Button>
                      </TableCell>
                      <TableCell className="border border-gray-200">
                        <a
                          href={`/job-offers/Job_Offer_${applicant.name.split(" ").pop()}.pdf`}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Job_Offer_{applicant.name.split(" ").pop()}.pdf
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
         {/* Modals */}
          <SendRequirementsModal
            isOpen={isRequirementsModalOpen}
            onClose={() => setIsRequirementsModalOpen(false)}
            applicantName={selectedApplicant?.name || ""}
          />

          <ReconsiderModal
            isOpen={isReconsiderModalOpen}
            onClose={() => setIsReconsiderModalOpen(false)}
            applicant={selectedApplicant}
          />

          <RescindModal
            isOpen={isRescindModalOpen}
            onClose={() => setIsRescindModalOpen(false)}
            applicantName={selectedApplicant?.name || ""}
          />
        </div>
      </div>
    </>
  )
}
