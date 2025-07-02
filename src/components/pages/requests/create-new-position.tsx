"use client"

import { Navbar } from "@/components/reusables/Navbar"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Trash2,
  Plus,
  Edit,
  Eye,
  Calendar,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  Link,
  AlignLeft,
  Phone,
  FileText,
  Users,
  Briefcase,
  X,
  Pencil,
  Search,
  Clock,
} from "lucide-react"

interface LocationEntry {
  id: number
  location: string
  headcount: number
  deploymentDate: string
  withBatch: boolean
}

interface BatchEntry {
  id: number
  batch: number
  deploymentDate: string
  headcount: number
}

interface PipelineStep {
  id: number
  name: string
  type: string
  icon: any
}

interface PipelineStage {
  id: number
  name: string
  steps: PipelineStep[]
}

interface TeamMember {
  id: number
  name: string
  position: string
  department: string
  process: string
}

export default function CreateNewPosition() {
  useEffect(() => {
    document.title = "Create New Position"
  }, [])

  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    employmentType: "Full-Time",
    educationNeeded: "Bachelor's Degree",
    workSetup: "Hybrid",
    experience: "Entry Level",
    headcountsNeeded: "",
    dateNeeded: "",
    reasonForHire: "Others, Please Specify",
    reasonSpecify: "",
    budgetFrom: "",
    budgetTo: "",
  })

  const [locations, setLocations] = useState<LocationEntry[]>([
    {
      id: 1,
      location: "Makati City",
      headcount: 100,
      deploymentDate: "Oct 01, 2024",
      withBatch: true,
    },
  ])

  const [batches, setBatches] = useState<BatchEntry[]>([
    {
      id: 1,
      batch: 1,
      headcount: 5,
      deploymentDate: "Oct 01, 2024",
    },
    {
      id: 2,
      batch: 2,
      headcount: 5,
      deploymentDate: "Jul 08, 2022",
    },
  ])

  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    {
      id: 1,
      name: "STAGE 01",
      steps: [
        { id: 1, name: "Resume Screening", type: "Initial Application", icon: FileText },
        { id: 2, name: "Phone/Call Interview", type: "Initial Application", icon: Phone },
        { id: 3, name: "Shortlisted", type: "Initial Application", icon: Users },
      ],
    },
    {
      id: 2,
      name: "STAGE 02",
      steps: [{ id: 4, name: "Set Schedule for Interview", type: "Interview", icon: Calendar }],
    },
    {
      id: 3,
      name: "STAGE 03",
      steps: [
        { id: 5, name: "For Job Offer", type: "Final Application", icon: Briefcase },
        { id: 6, name: "Job Offer", type: "Final Application", icon: Phone },
        { id: 7, name: "Onboarding", type: "Final Application", icon: Users },
      ],
    },
  ])

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Sif Daae",
      position: "Hiring Managers",
      department: "CI Department",
      process: "Hiring Manager Interview",
    },
    {
      id: 2,
      name: "Kanye West",
      position: "Human Resource",
      department: "HR Department",
      process: "Phone Call Interview",
    },
    {
      id: 3,
      name: "Mark Josephs",
      position: "Lead Developer",
      department: "CI Department",
      process: "Panel Interview",
    },
    {
      id: 4,
      name: "Virla Eliza",
      position: "Supervisor",
      department: "CI Department",
      process: "Panel Interview",
    },
  ])

  const [showTeamMembers, setShowTeamMembers] = useState(false)

  const [jobDescription, setJobDescription] = useState(`About the UI Designer position

We are looking for an experienced UI Designer to create amazing user experiences, helping our products to be highly attractive and competitive.

You should be keen in clean and artful design and be able to translate high-level requirements into interaction flows and artifacts, creating beautiful, intuitive, and functional user interfaces.

UI Designer responsibilities are:
• Work together with product management and engineering to build innovative solutions for the product direction, visuals and experience
• Participate in all visual design stages from concept to final hand-off to engineering
• Develop original ideas that bring simplicity and user friendliness to complex design roadblocks
• Prepare wireframes, storyboards, user flows, process flows and site maps to effectively communicate interaction and design ideas
• Discuss designs and key milestone deliverables with peers and executive level stakeholders
• Perform user research and evaluate user feedback
• Set design guidelines, best practices and standards
• Stay up-to-date with the latest UI trends, techniques, and technologies

UI Designer requirements are:
• 2+ years' experience of working on a UI Designer position
• Profound UI design skills with a solid portfolio of design projects
• Significant experience in creating wireframes, storyboards, user flows, process flows and site maps
• Significant experience with Photoshop, Illustrator, OmniGraffle, or other visual design and wire-framing tools
• Good practical experience with HTML, CSS, and JavaScript for rapid prototyping
• Strong visual design skills with good understanding of user-system interaction
• Strong presentational and team player abilities
• Strong problem-solving skills with creative approach
• Experience of working in an Agile/Scrum development process
• BS or MS degree in Human-Computer Interaction, Interaction Design, or other related area`)

  const [formFieldConfig, setFormFieldConfig] = useState({
    personal: [
      { field: "Name", defaultValue: "required", nonNegotiable: false },
      { field: "Birth Date", defaultValue: "required", nonNegotiable: false },
      { field: "Gender", defaultValue: "required", nonNegotiable: false },
      { field: "Primary Contact Number", defaultValue: "required", nonNegotiable: false },
      { field: "Secondary Contact Number", defaultValue: "required", nonNegotiable: false },
      { field: "Email Address", defaultValue: "required", nonNegotiable: false },
      { field: "LinkedIn Profile", defaultValue: "optional", nonNegotiable: false },
      { field: "Address", defaultValue: "required", nonNegotiable: false },
    ],
    job: [
      { field: "Job Title", defaultValue: "required", nonNegotiable: false },
      { field: "Company Name", defaultValue: "required", nonNegotiable: false },
      { field: "Years of Experience", defaultValue: "required", nonNegotiable: true },
      { field: "Position Applying for", defaultValue: "required", nonNegotiable: false },
      { field: "Expected Salary", defaultValue: "required", nonNegotiable: true },
      { field: "Are you willing to work onsite?", defaultValue: "required", nonNegotiable: true },
      { field: "Upload 2×2 photo", defaultValue: "required", nonNegotiable: false },
      {
        field: "Upload medical certificate for at least 6 months",
        defaultValue: "required",
        nonNegotiable: false,
      },
      {
        field: "Preferred interview schedule (3 dates eg February 20)",
        defaultValue: "required",
        nonNegotiable: false,
      },
    ],
    education: [
      { field: "Highest Educational Attained", defaultValue: "required", nonNegotiable: true },
      { field: "Year Graduated", defaultValue: "required", nonNegotiable: false },
      { field: "University / Institution Name", defaultValue: "required", nonNegotiable: false },
      { field: "Program / Course", defaultValue: "required", nonNegotiable: false },
      { field: "Work Experience", defaultValue: "required", nonNegotiable: true },
      { field: "Job Title", defaultValue: "required", nonNegotiable: false },
    ],
    acknowledgement: [
      { field: "How did you learn about this job opportunity?", defaultValue: "required", nonNegotiable: false },
      { field: "Agreement", defaultValue: "required", nonNegotiable: false },
      { field: "Signature", defaultValue: "required", nonNegotiable: false },
    ],
  })

  const steps = [
    { number: 1, title: "Details", active: currentStep === 1 },
    { number: 2, title: "Description", active: currentStep === 2 },
    { number: 3, title: "Application Form", active: currentStep === 3 },
    { number: 4, title: "Pipeline", active: currentStep === 4 },
    { number: 5, title: "Assessment", active: currentStep === 5 },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addLocation = () => {
    const newLocation: LocationEntry = {
      id: locations.length + 1,
      location: "",
      headcount: 0,
      deploymentDate: "",
      withBatch: false,
    }
    setLocations([...locations, newLocation])
  }

  const addBatch = () => {
    const newBatch: BatchEntry = {
      id: batches.length + 1,
      batch: batches.length + 1,
      headcount: 0,
      deploymentDate: "",
    }
    setBatches([...batches, newBatch])
  }

  const deleteLocation = (id: number) => {
    setLocations(locations.filter((loc) => loc.id !== id))
  }

  const [showPreview, setShowPreview] = useState(false)

  const deleteBatch = (id: number) => {
    setBatches(batches.filter((batch) => batch.id !== id))
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addStepToStage = (stageId: number) => {
    // This would open a modal or form to add a new step
    console.log("Add step to stage", stageId)
  }

  const editStep = (stepId: number) => {
    // This would open a modal or form to edit the step
    console.log("Edit step", stepId)
  }

  const deleteStep = (stageId: number, stepId: number) => {
    setPipelineStages(
      pipelineStages.map((stage) =>
        stage.id === stageId ? { ...stage, steps: stage.steps.filter((step) => step.id !== stepId) } : stage,
      ),
    )
  }

  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false)
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false)
  const [questionnaireName, setQuestionnaireName] = useState("")
  const [sections, setSections] = useState<
    Array<{
      id: number
      name: string
      questions: Array<{
        id: number
        question: string
        description: string
        type: string
        mode: string
        options: string[]
        parameters: number[]
      }>
    }>
  >([])
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null)
  const [newSectionName, setNewSectionName] = useState("")
  const [showSectionInput, setShowSectionInput] = useState(false)

  // Question form state
  const [questionForm, setQuestionForm] = useState({
    question: "",
    description: "",
    type: "Multiple Choice",
    mode: "Non-negotiable",
    options: ["", "", "", ""],
    parameters: [0, 0, 0, 0],
    nonNegotiableText: "",
  })

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-6">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <Input
                  placeholder="Input text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                >
                  <option value="">Input Text</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.employmentType}
                  onChange={(e) => handleInputChange("employmentType", e.target.value)}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              {/* Education Needed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Needed</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.educationNeeded}
                  onChange={(e) => handleInputChange("educationNeeded", e.target.value)}
                >
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="High School">High School</option>
                </select>
              </div>

              {/* Work Setup */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work setup</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.workSetup}
                  onChange={(e) => handleInputChange("workSetup", e.target.value)}
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>

              {/* No. of headcounts needed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No. of headcounts needed</label>
                <Input
                  placeholder="Input text"
                  value={formData.headcountsNeeded}
                  onChange={(e) => handleInputChange("headcountsNeeded", e.target.value)}
                />
              </div>

              {/* Date Needed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Needed</label>
                <div className="relative">
                  <Input
                    placeholder="Input text"
                    value={formData.dateNeeded}
                    onChange={(e) => handleInputChange("dateNeeded", e.target.value)}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Reason for Hire */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Reason for Hire</h3>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="reasonForHire"
                    value="Replacement"
                    checked={formData.reasonForHire === "Replacement"}
                    onChange={(e) => handleInputChange("reasonForHire", e.target.value)}
                    className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                  />
                  <span className="text-sm text-gray-700">Replacement</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="reasonForHire"
                    value="New Position"
                    checked={formData.reasonForHire === "New Position"}
                    onChange={(e) => handleInputChange("reasonForHire", e.target.value)}
                    className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                  />
                  <span className="text-sm text-gray-700">New Position</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="reasonForHire"
                    value="Others, Please Specify"
                    checked={formData.reasonForHire === "Others, Please Specify"}
                    onChange={(e) => handleInputChange("reasonForHire", e.target.value)}
                    className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                  />
                  <span className="text-sm text-gray-700">Others, Please Specify</span>
                </label>
                {formData.reasonForHire === "Others, Please Specify" && (
                  <Input
                    placeholder="Input text"
                    className="ml-6 max-w-xs"
                    value={formData.reasonSpecify}
                    onChange={(e) => handleInputChange("reasonSpecify", e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Budget Allocation */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Budget Allocation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <Input
                    placeholder="Input text"
                    value={formData.budgetFrom}
                    onChange={(e) => handleInputChange("budgetFrom", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <Input
                    placeholder="Input text"
                    value={formData.budgetTo}
                    onChange={(e) => handleInputChange("budgetTo", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Location</h3>

              {/* Location Table */}
              <div className="overflow-x-auto border rounded-lg mb-4">
                <table className="min-w-full bg-white text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Location</th>
                      <th className="px-4 py-3 text-left">Headcount</th>
                      <th className="px-4 py-3 text-left">Deployment Date</th>
                      <th className="px-4 py-3 text-left">With Batch?</th>
                      <th className="px-4 py-3 text-left">Edit</th>
                      <th className="px-4 py-3 text-left">View</th>
                      <th className="px-4 py-3 text-left">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((location) => (
                      <tr key={location.id} className="border-t">
                        <td className="px-4 py-3">
                          <select className="w-full p-1 border rounded text-sm">
                            <option value="Makati City">Makati City</option>
                            <option value="Manila">Manila</option>
                            <option value="Quezon City">Quezon City</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">{location.headcount}</td>
                        <td className="px-4 py-3">{location.deploymentDate}</td>
                        <td className="px-4 py-3">
                          <span className="text-green-600 font-medium">{location.withBatch ? "Yes" : "No"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" onClick={() => deleteLocation(location.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                onClick={addLocation}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 p-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Batch Details */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Batch Details</h3>

              <div className="overflow-x-auto border rounded-lg mb-4">
                <table className="min-w-full bg-white text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Batch</th>
                      <th className="px-4 py-3 text-left">Headcount</th>
                      <th className="px-4 py-3 text-left">Deployment Date</th>
                      <th className="px-4 py-3 text-left">Delete</th>
                      <th className="px-4 py-3 text-left">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch) => (
                      <tr key={batch.id} className="border-t">
                        <td className="px-4 py-3 font-medium">{batch.batch}</td>
                        <td className="px-4 py-3">{batch.headcount}</td>
                        <td className="px-4 py-3">{batch.deploymentDate}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" onClick={() => deleteBatch(batch.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button onClick={addBatch} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )

      case 2:
        return (
          <Card className="p-6">
            {/* Description Text */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">
                A great job description is essential to attracting the right candidates.
              </p>
              <p className="text-gray-600 text-sm">
                Don't have one yet? No problem — choose one from our searchable library on the right.
              </p>
            </div>

            {/* Text Editor Toolbar */}
            <div className="border rounded-lg">
              <div className="flex items-center gap-2 p-3 border-b bg-gray-50">
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <Bold className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <Italic className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <Underline className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <Strikethrough className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <Link className="w-4 h-4" />
                </Button>

                <div className="ml-auto">
                  <select className="text-sm border rounded px-3 py-1 bg-white">
                    <option>Find a job description...</option>
                    <option>UI Designer</option>
                    <option>Frontend Developer</option>
                    <option>Product Manager</option>
                  </select>
                </div>
              </div>

              {/* Text Editor Content */}
              <div className="p-4">
                <textarea
                  className="w-full h-96 border-none outline-none resize-none text-sm leading-relaxed"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Enter job description..."
                />
              </div>
            </div>
          </Card>
        )

      case 3:
        return (
          <Card className="p-6">
            {/* Candidate Applications */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Candidate Applications</h3>
              <p className="text-sm text-gray-600 mb-4">Choose how candidates can apply to this position.</p>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="candidateApplication"
                    value="external"
                    defaultChecked
                    className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                  />
                  <span className="text-sm text-blue-600">
                    External Job Posting Platforms (LinkedIn, Jobstreet, etc.)
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="candidateApplication"
                    value="internal"
                    className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                  />
                  <span className="text-sm text-gray-700">Internal Only</span>
                </label>
              </div>
            </div>

            {/* Application Form */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Application Form</h3>
              <p className="text-sm text-gray-600 mb-6">
                Choose what information to collect from candidates who apply through your Careers Site.
              </p>

              {/* Personal Information */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-800 mb-4">Personal Information</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700 w-2/5">Field</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Non-Negotiable</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Required</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Optional</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Disabled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { field: "Name", defaultValue: "required" },
                        { field: "Birth Date", defaultValue: "required" },
                        { field: "Gender", defaultValue: "required" },
                        { field: "Primary Contact Number", defaultValue: "required" },
                        { field: "Secondary Contact Number", defaultValue: "required" },
                        { field: "Email Address", defaultValue: "required" },
                        { field: "LinkedIn Profile", defaultValue: "optional" },
                        { field: "Address", defaultValue: "required" },
                      ].map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium text-gray-800 w-2/5">{item.field}</td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="checkbox"
                              name={`personal_${index}_non_negotiable`}
                              value="non-negotiable"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-blue-600 checked:after:text-xs checked:after:font-bold"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`personal_${index}_status`}
                              value="required"
                              defaultChecked={item.defaultValue === "required"}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`personal_${index}_status`}
                              value="optional"
                              defaultChecked={item.defaultValue === "optional"}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`personal_${index}_status`}
                              value="disabled"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Job Details */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-800 mb-4">Job Details</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700 w-2/5">Field</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Non-Negotiable</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Required</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Optional</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Disabled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { field: "Job Title", defaultValue: "required", nonNegotiable: false },
                        { field: "Company Name", defaultValue: "required", nonNegotiable: false },
                        { field: "Years of Experience", defaultValue: "required", nonNegotiable: true },
                        { field: "Position Applying for", defaultValue: "required", nonNegotiable: false },
                        { field: "Expected Salary", defaultValue: "required", nonNegotiable: true },
                        { field: "Are you willing to work onsite?", defaultValue: "required", nonNegotiable: true },
                        { field: "Upload 2×2 photo", defaultValue: "required", nonNegotiable: false },
                        {
                          field: "Upload medical certificate for at least 6 months",
                          defaultValue: "required",
                          nonNegotiable: false,
                        },
                        {
                          field: "Preferred interview schedule (3 dates eg February 20)",
                          defaultValue: "required",
                          nonNegotiable: false,
                        },
                      ].map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium text-gray-800 w-2/5">{item.field}</td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="checkbox"
                              name={`job_${index}_non_negotiable`}
                              value="non-negotiable"
                              defaultChecked={item.nonNegotiable}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-blue-600 checked:after:text-xs checked:after:font-bold"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`job_${index}_status`}
                              value="required"
                              defaultChecked={!item.nonNegotiable && item.defaultValue === "required"}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`job_${index}_status`}
                              value="optional"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`job_${index}_status`}
                              value="disabled"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Work and Education */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-800 mb-4">Work and Education</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700 w-2/5">Field</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Non-Negotiable</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Required</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Optional</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Disabled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { field: "Highest Educational Attained", defaultValue: "required", nonNegotiable: true },
                        { field: "Year Graduated", defaultValue: "required", nonNegotiable: false },
                        { field: "University / Institution Name", defaultValue: "required", nonNegotiable: false },
                        { field: "Program / Course", defaultValue: "required", nonNegotiable: false },
                        { field: "Work Experience", defaultValue: "required", nonNegotiable: true },
                        { field: "Job Title", defaultValue: "required", nonNegotiable: false },
                      ].map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium text-gray-800 w-2/5">{item.field}</td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="checkbox"
                              name={`education_${index}_non_negotiable`}
                              value="non-negotiable"
                              defaultChecked={item.nonNegotiable}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-blue-600 checked:after:text-xs checked:after:font-bold"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`education_${index}_status`}
                              value="required"
                              defaultChecked={!item.nonNegotiable && item.defaultValue === "required"}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`education_${index}_status`}
                              value="optional"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`education_${index}_status`}
                              value="disabled"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Acknowledgement */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-800 mb-4">Acknowledgement</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700 w-2/5">Field</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Non-Negotiable</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Required</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Optional</th>
                        <th className="text-center p-4 font-medium text-gray-700 w-1/6">Disabled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { field: "How did you learn about this job opportunity?", defaultValue: "required" },
                        { field: "Agreement", defaultValue: "required" },
                        { field: "Signature", defaultValue: "required" },
                      ].map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium text-gray-800 w-2/5">{item.field}</td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="checkbox"
                              name={`acknowledgement_${index}_non_negotiable`}
                              value="non-negotiable"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-blue-600 checked:after:text-xs checked:after:font-bold"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`acknowledgement_${index}_status`}
                              value="required"
                              defaultChecked={item.defaultValue === "required"}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`acknowledgement_${index}_status`}
                              value="optional"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`acknowledgement_${index}_status`}
                              value="disabled"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Non-negotiable Templates */}
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-800 mb-4">Non-negotiable Templates</h4>
                <div className="flex items-center gap-3">
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white min-w-[200px]">
                    <option>Select Templates</option>
                    <option>Template 1</option>
                    <option>Template 2</option>
                    <option>Template 3</option>
                  </select>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                    onClick={() => setShowQuestionnaireModal(true)}
                  >
                    Add Non-negotiable
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )

      case 4:
        return (
          <Card className="p-6">
            {/* Pipeline Stages */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Pipeline Stages</h3>
                  <p className="text-sm text-gray-600">
                    You can customize automated stage actions for this pipeline here.
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Pipeline Stages */}
              <div className="space-y-6">
                {pipelineStages.map((stage) => (
                  <div key={stage.id} className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-blue-600 font-medium text-sm mb-4">{stage.name}</h4>
                    <div className="space-y-3">
                      {stage.steps.map((step) => {
                        const IconComponent = step.icon
                        return (
                          <div
                            key={step.id}
                            className="flex items-center justify-between p-3 border rounded-lg bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                                  <IconComponent className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm text-gray-800">{step.name}</div>
                                  <div className="text-xs text-gray-500">{step.type}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => editStep(step.id)}>
                                <Pencil className="w-4 h-4 text-gray-500" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteStep(stage.id, step.id)}>
                                <Trash2 className="w-4 h-4 text-gray-500" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}

                      {/* Add Step Button */}
                      <button
                        onClick={() => addStepToStage(stage.id)}
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Step Here
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Team Member Toggle */}
              <div className="mt-8 flex items-center gap-2">
                <span className="text-sm text-gray-700">View Team Member</span>
                <button
                  onClick={() => setShowTeamMembers(!showTeamMembers)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showTeamMembers ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showTeamMembers ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Team Members Table */}
              {showTeamMembers && (
                <div className="mt-6">
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-blue-600 text-white">
                        <tr>
                          <th className="text-left p-4 font-medium">Names</th>
                          <th className="text-left p-4 font-medium">Position</th>
                          <th className="text-left p-4 font-medium">Department</th>
                          <th className="text-left p-4 font-medium">Process</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembers.map((member) => (
                          <tr key={member.id} className="border-b">
                            <td className="p-4 text-gray-800">{member.name}</td>
                            <td className="p-4 text-gray-600">{member.position}</td>
                            <td className="p-4 text-gray-600">{member.department}</td>
                            <td className="p-4 text-gray-600">{member.process}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )

      case 5:
        return (
          <Card className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Assessment Configuration */}
              <div className="lg:col-span-2 space-y-6">
                {/* Select Assessment Section */}
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-4">
                    Select an assessment to configure questions:
                  </h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="border border-blue-300 rounded-lg p-4 bg-blue-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <div>
                              <h5 className="font-medium text-gray-800">Technical Assessment</h5>
                              <p className="text-sm text-gray-600">Stage 02 • Required</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-medium text-gray-800">Question for Technical Assessment</h4>
                  </div>

                  <div className="space-y-4">
                    {/* Question 1 */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <span className="text-sm font-medium text-gray-700">1.</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 mb-2">What is project development?</p>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                <label className="flex items-center gap-1">
                                  <input type="checkbox" className="w-3 h-3" />
                                  Check Boxes
                                </label>
                                <label className="flex items-center gap-1">
                                  <input type="checkbox" className="w-3 h-3" />
                                  Required
                                </label>
                                <label className="flex items-center gap-1">
                                  <input type="checkbox" className="w-3 h-3" />
                                  Parameters
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <span className="text-sm font-medium text-gray-700">2.</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 mb-2">
                                What is the process flow diagram?
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                <label className="flex items-center gap-1">
                                  <input type="checkbox" className="w-3 h-3" />
                                  Check Boxes
                                </label>
                                <label className="flex items-center gap-1">
                                  <input type="checkbox" className="w-3 h-3" />
                                  Required
                                </label>
                                <label className="flex items-center gap-1">
                                  <input type="checkbox" className="w-3 h-3" />
                                  Parameters
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Add Question Button */}
                    <button className="w-full p-4 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Template Search and Settings */}
              <div className="space-y-6">
                {/* Search Template */}
                <div>
                  <div className="relative">
                    <Input placeholder="Search Template Question" className="pl-8" />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Recommended Items */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 p-2 hover:bg-white rounded cursor-pointer">
                      Recommended Item 01
                    </div>
                    <div className="text-sm text-gray-600 p-2 hover:bg-white rounded cursor-pointer">
                      Recommended Item 02
                    </div>
                    <div className="text-sm text-gray-600 p-2 hover:bg-white rounded cursor-pointer">
                      Recommended Item 03
                    </div>
                  </div>
                </div>

                {/* Set Due and Time Limit */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Set Due</label>
                    <div className="relative">
                      <Input type="date" defaultValue="2021-02-09" className="pr-8" />
                      <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit</label>
                    <div className="relative">
                      <Input type="time" defaultValue="01:00" className="pr-8" />
                      <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )

      default:
        return (
          <Card className="p-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Step {currentStep} - Coming Soon</h3>
              <p className="text-gray-600">This step is under development.</p>
            </div>
          </Card>
        )
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Position Details"
      case 2:
        return "Position Description"
      case 3:
        return "Application Form"
      case 4:
        return "Position Pipeline"
      case 5:
        return "Assessment"
      default:
        return "Create New Position"
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-blue-600 cursor-pointer">Position</span>
            <span>{">"}</span>
            <span>Create New Position</span>
          </div>

          {/* Steps Navigation */}
          <div className="flex items-center gap-8 border-b pb-4">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    step.active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.number}
                </div>
                <span className={`text-sm font-medium ${step.active ? "text-blue-600" : "text-gray-500"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-gray-800">{getStepTitle()}</h2>
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 bg-transparent"
              onClick={() => setShowPreview(true)}
              disabled={currentStep !== 1 && currentStep !== 2 && currentStep !== 3}
            >
              Preview
            </Button>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="text-gray-600 bg-transparent"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              ← Back
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={
                currentStep === 5
                  ? () => {
                      // Handle save logic here
                      console.log("Saving position data...", formData)
                      // You can add actual save functionality here
                    }
                  : handleNext
              }
            >
              {currentStep === 5 ? "Save" : "Next step →"}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPreview(false)} />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-center p-4 border-b shadow-sm bg-white sticky top-0 z-10">
              <img src="/OODC logo3.png" alt="OODC Logo" className="h-12" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="hover:bg-gray-100 absolute right-4"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {currentStep === 1 ? (
                <>
                  {/* Job Title with Blue Line */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-blue-600"></div>
                    <h1 className="text-2xl font-bold text-blue-600">{formData.jobTitle || "Job Title"}</h1>
                  </div>

                  {/* Department */}
                  <div className="mb-8">
                    <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm font-medium">
                      {formData.department || "Department"}
                    </div>
                  </div>

                  {/* Job Details Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-6 bg-blue-600"></div>
                      <h2 className="text-xl font-semibold text-blue-600">Job Details</h2>
                    </div>

                    {/* First Row */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Education Needed</label>
                        <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">
                          {formData.educationNeeded}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Work Setup</label>
                        <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">{formData.workSetup}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                        <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">{formData.experience}</div>
                      </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. of Headcounts needed</label>
                        <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">
                          {formData.headcountsNeeded || "Not specified"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Needed</label>
                        <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">
                          {formData.dateNeeded || "Not specified"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for hiring</label>
                        <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">
                          {formData.reasonForHire === "Others, Please Specify" && formData.reasonSpecify
                            ? formData.reasonSpecify
                            : formData.reasonForHire}
                        </div>
                      </div>
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget Allocation</label>
                        <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">
                          {formData.budgetFrom && formData.budgetTo
                            ? `${formData.budgetFrom} - ${formData.budgetTo}`
                            : "Not specified"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Endorsement Type</label>
                        <div className="text-sm text-gray-900 p-2 bg-gray-50 rounded border">
                          {formData.employmentType}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>

                  {/* Location Table */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Location</h3>
                    <div className="overflow-x-auto border rounded-lg">
                      <table className="min-w-full bg-white text-sm">
                        <thead className="bg-blue-600 text-white">
                          <tr>
                            <th className="px-4 py-3 text-left">Location</th>
                            <th className="px-4 py-3 text-left">Headcount</th>
                            <th className="px-4 py-3 text-left">Deployment Date</th>
                            <th className="px-4 py-3 text-left">With Batch?</th>
                          </tr>
                        </thead>
                        <tbody>
                          {locations.map((location) => (
                            <tr key={location.id} className="border-t">
                              <td className="px-4 py-3">{location.location}</td>
                              <td className="px-4 py-3">{location.headcount}</td>
                              <td className="px-4 py-3">{location.deploymentDate}</td>
                              <td className="px-4 py-3">
                                <span className="text-green-600 font-medium">{location.withBatch ? "Yes" : "No"}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Batch Details Table */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Batch Details</h3>
                    <div className="overflow-x-auto border rounded-lg">
                      <table className="min-w-full bg-white text-sm">
                        <thead className="bg-blue-600 text-white">
                          <tr>
                            <th className="px-4 py-3 text-left">Batch</th>
                            <th className="px-4 py-3 text-left">Headcount</th>
                            <th className="px-4 py-3 text-left">Deployment Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batches.map((batch) => (
                            <tr key={batch.id} className="border-t">
                              <td className="px-4 py-3 font-medium">{batch.batch}</td>
                              <td className="px-4 py-3">{batch.headcount}</td>
                              <td className="px-4 py-3">{batch.deploymentDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : currentStep === 2 ? (
                <>
                  {/* Job Description Title with Blue Line */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-blue-600"></div>
                    <h1 className="text-2xl font-bold text-blue-600">JOB DESCRIPTION</h1>
                  </div>

                  {/* Job Description Content */}
                  <div className="bg-gray-50 border rounded-lg p-6">
                    <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {jobDescription || "No job description provided."}
                    </div>
                  </div>
                </>
              ) : currentStep === 3 ? (
                <>
                  {/* Application Form Title */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-blue-600"></div>
                    <h1 className="text-2xl font-bold text-blue-600">APPLICATION FORM</h1>
                  </div>

                  {/* Job Position Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">
                      {formData.jobTitle || "Position Title"}
                    </h2>
                    <p className="text-sm text-blue-600">Department: {formData.department || "Not specified"}</p>
                  </div>

                  {/* Stage 1: Personal Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                      Stage 1: Applicant Information
                    </h3>

                    {/* Data Privacy Section */}
                    <div className="bg-white border rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                        <h4 className="text-base font-semibold text-gray-900">Data Privacy</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        I agree to provide my personal information regarding my application. I understand that it will
                        only be used for this purpose. For more information, you may visit{" "}
                        <a href="https://oodc.com.ph/privacy-policy/" className="text-blue-600 hover:underline">
                          https://oodc.com.ph/privacy-policy/
                        </a>
                        .
                      </p>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4" disabled />
                        <label className="text-sm text-gray-700">I accept the terms and conditions</label>
                      </div>
                    </div>

                    {/* Personal Information Fields */}
                    <div className="bg-white border rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-3 mb-6">
                        <h4 className="text-base font-semibold text-blue-600">Personal Information</h4>
                        <div className="flex-1 h-px bg-blue-600"></div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {formFieldConfig.personal.slice(0, 2).map((item) => {
                          if (item.defaultValue === "disabled") return null
                          const isRequired = item.defaultValue === "required" || item.nonNegotiable
                          return (
                            <div key={item.field}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {item.field}
                                {isRequired && <span className="text-red-500 ml-1">*</span>}
                                {item.nonNegotiable && (
                                  <span className="text-blue-600 ml-1 text-xs">(Non-negotiable)</span>
                                )}
                                {item.defaultValue === "optional" && !item.nonNegotiable && (
                                  <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                                )}
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder={`Enter ${item.field.toLowerCase()}`}
                                disabled
                              />
                            </div>
                          )
                        })}
                      </div>

                      {/* Birthday and Gender */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {formFieldConfig.personal.slice(2, 4).map((item) => {
                          if (item.defaultValue === "disabled") return null
                          const isRequired = item.defaultValue === "required" || item.nonNegotiable
                          return (
                            <div key={item.field}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {item.field}
                                {isRequired && <span className="text-red-500 ml-1">*</span>}
                                {item.nonNegotiable && (
                                  <span className="text-blue-600 ml-1 text-xs">(Non-negotiable)</span>
                                )}
                                {item.defaultValue === "optional" && !item.nonNegotiable && (
                                  <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                                )}
                              </label>
                              {item.field === "Gender" ? (
                                <div className="flex gap-4 mt-2">
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" disabled />
                                    <span className="text-sm">Male</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" disabled />
                                    <span className="text-sm">Female</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" disabled />
                                    <span className="text-sm">Other</span>
                                  </label>
                                </div>
                              ) : (
                                <input
                                  type={item.field.includes("Date") ? "date" : "text"}
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                  disabled
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-4">
                        {formFieldConfig.personal.slice(4).map((item) => {
                          if (item.defaultValue === "disabled") return null
                          const isRequired = item.defaultValue === "required" || item.nonNegotiable
                          return (
                            <div key={item.field}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {item.field}
                                {isRequired && <span className="text-red-500 ml-1">*</span>}
                                {item.nonNegotiable && (
                                  <span className="text-blue-600 ml-1 text-xs">(Non-negotiable)</span>
                                )}
                                {item.defaultValue === "optional" && !item.nonNegotiable && (
                                  <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                                )}
                              </label>
                              <input
                                type={item.field.includes("Email") ? "email" : "text"}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder={`Enter ${item.field.toLowerCase()}`}
                                disabled
                              />
                            </div>
                          )
                        })}
                      </div>

                      {/* Address Section */}
                      <div className="mt-6">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Address</label>
                        <div className="space-y-4">
                          <div>
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md text-sm"
                              placeholder="Address Line 1"
                              disabled
                            />
                            <label className="text-xs text-gray-500 mt-1 block">Address Line 1</label>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="City"
                                disabled
                              />
                              <label className="text-xs text-gray-500 mt-1 block">City</label>
                            </div>
                            <div>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="District"
                                disabled
                              />
                              <label className="text-xs text-gray-500 mt-1 block">District</label>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Postal Code"
                                disabled
                              />
                              <label className="text-xs text-gray-500 mt-1 block">Postal Code</label>
                            </div>
                            <div>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Country"
                                disabled
                              />
                              <label className="text-xs text-gray-500 mt-1 block">Country</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stage 2: Job Details */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Stage 2: Job Details</h3>
                    <div className="bg-white border rounded-lg p-4">
                      <div className="space-y-4">
                        {formFieldConfig.job.map((item) => {
                          if (item.defaultValue === "disabled") return null
                          const isRequired = item.defaultValue === "required" || item.nonNegotiable
                          const isUpload = item.field.toLowerCase().includes("upload")
                          const isOnsite = item.field.includes("willing to work onsite")

                          return (
                            <div key={item.field}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {item.field}
                                {isRequired && <span className="text-red-500 ml-1">*</span>}
                                {item.nonNegotiable && (
                                  <span className="text-blue-600 ml-1 text-xs">(Non-negotiable)</span>
                                )}
                                {item.defaultValue === "optional" && !item.nonNegotiable && (
                                  <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                                )}
                              </label>

                              {isUpload ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                  <div className="text-gray-500 text-sm">Click to upload or drag and drop</div>
                                </div>
                              ) : isOnsite ? (
                                <div className="flex gap-4 mt-2">
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="onsite" disabled />
                                    <span className="text-sm">Yes</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="onsite" disabled />
                                    <span className="text-sm">No</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="onsite" disabled />
                                    <span className="text-sm">Flexible</span>
                                  </label>
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                  placeholder={`Enter ${item.field.toLowerCase()}`}
                                  disabled
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Stage 3: Work and Education */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                      Stage 3: Work and Education
                    </h3>
                    <div className="bg-white border rounded-lg p-4">
                      <div className="space-y-6">
                        {/* Educational Background */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-base font-semibold text-blue-600">Educational Background</h4>
                            <div className="flex-1 h-px bg-blue-600"></div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formFieldConfig.education.slice(0, 4).map((item) => {
                              if (item.defaultValue === "disabled") return null
                              const isRequired = item.defaultValue === "required" || item.nonNegotiable
                              const isSelect = item.field.includes("Educational")

                              return (
                                <div key={item.field}>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {item.field}
                                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                                    {item.nonNegotiable && (
                                      <span className="text-blue-600 ml-1 text-xs">(Non-negotiable)</span>
                                    )}
                                    {item.defaultValue === "optional" && !item.nonNegotiable && (
                                      <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                                    )}
                                  </label>
                                  {isSelect ? (
                                    <select
                                      className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white"
                                      disabled
                                    >
                                      <option>Select education level</option>
                                      <option>High School</option>
                                      <option>Bachelor's Degree</option>
                                      <option>Master's Degree</option>
                                      <option>Doctorate</option>
                                    </select>
                                  ) : (
                                    <input
                                      type="text"
                                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                      placeholder={`Enter ${item.field.toLowerCase()}`}
                                      disabled
                                    />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Work Experience */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-base font-semibold text-blue-600">Work Experience</h4>
                            <div className="flex-1 h-px bg-blue-600"></div>
                          </div>

                          {/* Work Experience Question */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Do you have any previous work experience?
                              {formFieldConfig.education[4]?.defaultValue === "required" && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2">
                                <input type="radio" name="workExp" disabled />
                                <span className="text-sm">Yes</span>
                              </label>
                              <label className="flex items-center gap-2">
                                <input type="radio" name="workExp" disabled />
                                <span className="text-sm">No</span>
                              </label>
                            </div>
                          </div>

                          {/* Work Experience Form */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title
                                {formFieldConfig.education[5]?.defaultValue === "required" && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Enter job title"
                                disabled
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Enter company name"
                                disabled
                              />
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Years of Experience
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                  placeholder="Enter years"
                                  disabled
                                />
                              </div>
                              <div className="flex items-end">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm" disabled>
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Work Experience Table */}
                          <div className="overflow-x-auto">
                            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                              <thead>
                                <tr className="bg-blue-600 text-white">
                                  <th className="px-4 py-3 text-left text-sm">Job Title</th>
                                  <th className="px-4 py-3 text-left text-sm">Company Name</th>
                                  <th className="px-4 py-3 text-left text-sm">Years of Experience</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-t border-gray-300">
                                  <td className="px-4 py-3 text-gray-500 text-sm">No work experience added</td>
                                  <td className="px-4 py-3"></td>
                                  <td className="px-4 py-3"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stage 4: Acknowledgement */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Stage 4: Acknowledgement</h3>
                    <div className="bg-white border rounded-lg p-4">
                      <div className="space-y-6">
                        {/* Confidentiality Statement */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            All information provided is for application purposes only and will be treated with strict
                            confidentiality in accordance with applicable laws.
                          </p>
                        </div>

                        {formFieldConfig.acknowledgement.map((item) => {
                          if (item.defaultValue === "disabled") return null
                          const isRequired = item.defaultValue === "required" || item.nonNegotiable
                          const isHowLearn = item.field.includes("How did you learn")
                          const isAgreement = item.field.includes("Agreement")
                          const isSignature = item.field.includes("Signature")

                          return (
                            <div key={item.field}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {item.field}
                                {isRequired && <span className="text-red-500 ml-1">*</span>}
                                {item.nonNegotiable && (
                                  <span className="text-blue-600 ml-1 text-xs">(Non-negotiable)</span>
                                )}
                                {item.defaultValue === "optional" && !item.nonNegotiable && (
                                  <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                                )}
                              </label>

                              {isHowLearn ? (
                                <div className="space-y-2">
                                  {["JobStreet", "Indeed", "Facebook", "Referral", "Other"].map((option) => (
                                    <label key={option} className="flex items-center gap-2">
                                      <input type="radio" name="howLearn" disabled />
                                      <span className="text-sm">{option}</span>
                                    </label>
                                  ))}
                                </div>
                              ) : isAgreement ? (
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" className="w-4 h-4" disabled />
                                  <span className="text-sm text-gray-700">
                                    This is to certify that all information provided is accurate to the best of my
                                    abilities and knowledge
                                  </span>
                                </div>
                              ) : isSignature ? (
                                <div className="flex flex-col md:flex-row gap-4">
                                  <div className="flex-1 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">Signature Pad</span>
                                  </div>
                                  <div className="flex-1 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">Upload Signature</span>
                                  </div>
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                  placeholder={`Enter ${item.field.toLowerCase()}`}
                                  disabled
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6 border-t">
                    <button
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      disabled
                    >
                      Submit Application
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Add Questionnaire Modal */}
      {showQuestionnaireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowQuestionnaireModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shadow-sm bg-white sticky top-0 z-10">
              <h2 className="text-lg font-semibold text-gray-800">Add Questionnaire</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQuestionnaireModal(false)}
                className="hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Questionnaire Name Input */}
              <div className="mb-6">
                <Input
                  placeholder="Questionnaire Name (Required)"
                  value={questionnaireName}
                  onChange={(e) => setQuestionnaireName(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Add Question Button */}
              <div className="mb-4">
                <Button
                  onClick={() => setShowAddQuestionModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                >
                  + Add Question
                </Button>
              </div>

              {/* Sections */}
              <div className="space-y-6 mb-6">
                {sections.map((section) => (
                  <div key={section.id} className="border rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-4">
                      {section.name} <span className="text-gray-500">(Section {section.id})</span>
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px]">
                      {section.questions.length === 0 ? (
                        <p className="text-gray-500 text-center">No Questions Added</p>
                      ) : (
                        <div className="space-y-3">
                          {section.questions.map((question) => (
                            <div
                              key={question.id}
                              className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{question.question}</h4>
                                {question.description && (
                                  <p className="text-sm text-gray-600 mt-1">{question.description}</p>
                                )}
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded mt-2 inline-block">
                                  {question.type} - {question.mode}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Button variant="ghost" size="sm">
                                  <FileText className="w-4 h-4 text-gray-500" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4 text-gray-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSections(
                                      sections.map((s) =>
                                        s.id === section.id
                                          ? { ...s, questions: s.questions.filter((q) => q.id !== question.id) }
                                          : s,
                                      ),
                                    )
                                  }}
                                >
                                  <X className="w-4 h-4 text-gray-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <Button
                        onClick={() => {
                          setCurrentSectionId(section.id)
                          setShowAddQuestionModal(true)
                        }}
                        className="mt-3 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2"
                      >
                        + Add Question to Section
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Section */}
              <div className="mb-6">
                {showSectionInput ? (
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Section Name"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => {
                        if (newSectionName.trim()) {
                          setSections([
                            ...sections,
                            {
                              id: sections.length + 1,
                              name: newSectionName,
                              questions: [],
                            },
                          ])
                          setNewSectionName("")
                          setShowSectionInput(false)
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() => {
                        setShowSectionInput(false)
                        setNewSectionName("")
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowSectionInput(true)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2"
                  >
                    + Add Section
                  </Button>
                )}
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    // Save questionnaire logic here
                    console.log("Saving questionnaire:", { questionnaireName, sections })
                    setShowQuestionnaireModal(false)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAddQuestionModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shadow-sm bg-white sticky top-0 z-10">
              <h2 className="text-lg font-semibold text-gray-800">Add Question</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddQuestionModal(false)}
                className="hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Question Input */}
              <div className="mb-4">
                <Input
                  placeholder="Enter your question"
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                  className="w-full"
                />
              </div>

              {/* Question Description */}
              <div className="mb-4">
                <Input
                  placeholder="Question Description (Optional)"
                  value={questionForm.description}
                  onChange={(e) => setQuestionForm({ ...questionForm, description: e.target.value })}
                  className="w-full"
                />
              </div>

              {/* Dropdown Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                  <select
                    value={questionForm.type}
                    onChange={(e) => setQuestionForm({ ...questionForm, type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white"
                  >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="Checkboxes">Checkboxes</option>
                    <option value="Text Entry">Text Entry</option>
                    <option value="Paragraph">Paragraph</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                    <select
                      value={questionForm.mode}
                      onChange={(e) => setQuestionForm({ ...questionForm, mode: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white"
                    >
                      <option value="Non-negotiable">Non-negotiable</option>
                      <option value="Parameter">Parameter</option>
                    </select>
                  </div>
                  {(questionForm.type === "Text Entry" || questionForm.type === "Paragraph") && (
                    <div className="flex items-end">
                      <Button className="bg-blue-100 text-blue-600 hover:bg-blue-200 text-sm px-3 py-2">
                        AI Evaluation
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Content Based on Type and Mode */}
              {(questionForm.type === "Multiple Choice" || questionForm.type === "Checkboxes") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Options</label>
                  <div className="space-y-3">
                    {questionForm.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {questionForm.mode === "Parameter" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant={questionForm.parameters[index] === 1 ? "default" : "outline"}
                              onClick={() => {
                                const newParams = [...questionForm.parameters]
                                newParams[index] = newParams[index] === 1 ? 0 : 1
                                setQuestionForm({ ...questionForm, parameters: newParams })
                              }}
                              className="w-8 h-8 p-0 text-xs"
                            >
                              +1
                            </Button>
                            <Button
                              size="sm"
                              variant={questionForm.parameters[index] === -1 ? "default" : "outline"}
                              onClick={() => {
                                const newParams = [...questionForm.parameters]
                                newParams[index] = newParams[index] === -1 ? 0 : -1
                                setQuestionForm({ ...questionForm, parameters: newParams })
                              }}
                              className="w-8 h-8 p-0 text-xs"
                            >
                              -1
                            </Button>
                          </div>
                        )}
                        <div className="w-6 h-6 flex items-center justify-center">
                          {questionForm.type === "Multiple Choice" ? (
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                          )}
                        </div>
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...questionForm.options]
                            newOptions[index] = e.target.value
                            setQuestionForm({ ...questionForm, options: newOptions })
                          }}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(questionForm.type === "Text Entry" || questionForm.type === "Paragraph") &&
                questionForm.mode === "Non-negotiable" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Non-negotiable requirement</label>
                    <Input
                      placeholder="Enter requirement"
                      value={questionForm.nonNegotiableText}
                      onChange={(e) => setQuestionForm({ ...questionForm, nonNegotiableText: e.target.value })}
                      className="w-full"
                    />
                  </div>
                )}

              {/* Save Changes Button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (questionForm.question.trim()) {
                      const newQuestion = {
                        id: Date.now(),
                        question: questionForm.question,
                        description: questionForm.description,
                        type: questionForm.type,
                        mode: questionForm.mode,
                        options: questionForm.options,
                        parameters: questionForm.parameters,
                      }

                      if (currentSectionId) {
                        // Add to specific section
                        setSections(
                          sections.map((section) =>
                            section.id === currentSectionId
                              ? { ...section, questions: [...section.questions, newQuestion] }
                              : section,
                          ),
                        )
                      } else {
                        // Add to general questions (create default section if none exists)
                        if (sections.length === 0) {
                          setSections([
                            {
                              id: 1,
                              name: "General Questions",
                              questions: [newQuestion],
                            },
                          ])
                        } else {
                          setSections(
                            sections.map((section, index) =>
                              index === 0 ? { ...section, questions: [...section.questions, newQuestion] } : section,
                            ),
                          )
                        }
                      }

                      // Reset form
                      setQuestionForm({
                        question: "",
                        description: "",
                        type: "Multiple Choice",
                        mode: "Non-negotiable",
                        options: ["", "", "", ""],
                        parameters: [0, 0, 0, 0],
                        nonNegotiableText: "",
                      })
                      setCurrentSectionId(null)
                      setShowAddQuestionModal(false)
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
