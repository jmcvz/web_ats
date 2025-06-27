"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  FileCode2,
  SquareActivity,
  ShieldCheck,
  FileLineChartIcon as FileChartLine,
  MapPinned,
  FolderIcon as FolderCode,
  Phone,
  Mail,
  Linkedin,
  Cake,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DocumentUploadModal } from "@/assets/components/document-upload-modal"

interface JobData {
  id: number
  title: string
  icon: any
  department: string
  role: string
  description: string
  filters: string[]
  daysAgo: number
  applicants: string
  category: string
  workType: string
  workSetup: string
}

interface FormData {
  firstName: string
  lastName: string
  birthday: string
  gender: string
  primaryContact: string
  secondaryContact: string
  email: string
  linkedinProfile: string
  addressLine1: string
  city: string
  district: string
  postalCode: string
  country: string
}

export default function JobApplicationPage() {
  const navigate = useNavigate()
  const [jobData, setJobData] = useState<JobData | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(true)
  const [currentStage, setCurrentStage] = useState(1)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    primaryContact: "",
    secondaryContact: "",
    email: "",
    linkedinProfile: "",
    addressLine1: "",
    city: "",
    district: "",
    postalCode: "",
    country: "",
  })

  // Icon mapping function
  const getIconComponent = (jobTitle: string) => {
    const iconMap: { [key: string]: any } = {
      "Lead Developer": FileCode2,
      "Sales Support": SquareActivity,
      "IT Quality Assurance": ShieldCheck,
      "Business Analyst": FileChartLine,
      "Field Inspector": MapPinned,
      "Software Engineer II": FolderCode,
    }
    return iconMap[jobTitle] || FileCode2
  }

  useEffect(() => {
    // Get job data from localStorage
    const storedJob = localStorage.getItem("selectedJob")
    if (storedJob) {
      const parsedJob = JSON.parse(storedJob)
      parsedJob.icon = getIconComponent(parsedJob.title)
      setJobData(parsedJob)
    }
  }, [])

  const handleDocumentsUploaded = (resumeData: any) => {
    // Auto-fill form with resume data
    if (resumeData) {
      setFormData({
        firstName: resumeData.firstName || "John",
        lastName: resumeData.lastName || "Doe",
        birthday: resumeData.birthday || "15-Jan-1990",
        gender: resumeData.gender || "male",
        primaryContact: resumeData.primaryContact || "+63 912 345 6789",
        secondaryContact: resumeData.secondaryContact || "+63 987 654 3210",
        email: resumeData.email || "john.doe@email.com",
        linkedinProfile: resumeData.linkedinProfile || "https://linkedin.com/in/johndoe",
        addressLine1: resumeData.addressLine1 || "123 Main Street, Barangay San Antonio",
        city: resumeData.city || "Makati City",
        district: resumeData.district || "Metro Manila",
        postalCode: resumeData.postalCode || "1203",
        country: resumeData.country || "Philippines",
      })
    }
    setShowUploadModal(false)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStage < 4) {
      setCurrentStage(currentStage + 1)
    }
  }

  const handleBackToJobDescription = () => {
    navigate("/test2")
  }

  if (!jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Loading job details...</p>
        </div>
      </div>
    )
  }

  const IconComponent = jobData.icon

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Document Upload Modal */}
      {showUploadModal && (
        <DocumentUploadModal onClose={() => setShowUploadModal(false)} onDocumentsUploaded={handleDocumentsUploaded} />
      )}

      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg p-6 flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <img src="/OODC logo2.png" alt="OODC Logo" className="h-16 mx-auto" />
        </div>

        {/* Progress Steps */}
        <div className="flex-1">
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage >= 1 ? "bg-blue-600 text-white" : "border-2 border-gray-300 text-gray-400"
                }`}
              >
                {currentStage >= 1 ? "1" : ""}
              </div>
              <span className={`text-sm ${currentStage >= 1 ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                Applicant Information
              </span>
            </div>
            <div className="ml-4 w-0.5 h-8 bg-gray-200"></div>

            {/* Step 2 */}
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage >= 2 ? "bg-blue-600 text-white" : "border-2 border-blue-600"
                }`}
              >
                {currentStage >= 2 ? "2" : <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
              </div>
              <span className={`text-sm ${currentStage >= 2 ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                Job Details
              </span>
            </div>
            <div className="ml-4 w-0.5 h-8 bg-gray-200"></div>

            {/* Step 3 */}
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage >= 3 ? "bg-blue-600 text-white" : "border-2 border-gray-300"
                }`}
              >
                {currentStage >= 3 ? "3" : <div className="w-2 h-2 bg-gray-300 rounded-full"></div>}
              </div>
              <span className={`text-sm ${currentStage >= 3 ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                Work and Education
              </span>
            </div>
            <div className="ml-4 w-0.5 h-8 bg-gray-200"></div>

            {/* Step 4 */}
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage >= 4 ? "bg-blue-600 text-white" : "border-2 border-gray-300"
                }`}
              >
                {currentStage >= 4 ? "4" : <div className="w-2 h-2 bg-gray-300 rounded-full"></div>}
              </div>
              <span className={`text-sm ${currentStage >= 4 ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                Acknowledgement
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconComponent className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <h1 className="text-xl font-bold text-gray-900">{jobData.title}</h1>
            </div>
            <Button
              variant="outline"
              onClick={handleBackToJobDescription}
              className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
            >
              View Job Description
            </Button>
          </div>
        </header>

        {/* Form Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {currentStage === 1 && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Data Privacy Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  <h2 className="text-lg font-semibold text-gray-900">Data Privacy</h2>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  I agree to provide my personal information regarding my application. I understand that it will only be
                  used for this purpose. For more information, you may visit{" "}
                  <a href="https://oodc.com.ph/privacy-policy/" className="text-blue-600 hover:underline">
                    https://oodc.com.ph/privacy-policy/
                  </a>
                  .
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-700">
                    I accept the terms and conditions
                  </Label>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-lg font-semibold text-blue-600">Personal Information</h2>
                  <div className="flex-1 h-px bg-blue-600"></div>
                </div>

                <div className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Birthday */}
                  <div className="max-w-md">
                    <Label htmlFor="birthday" className="text-sm font-medium text-gray-700">
                      Birthday
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="birthday"
                        placeholder="DD-MMM-YYYY"
                        value={formData.birthday}
                        onChange={(e) => handleInputChange("birthday", e.target.value)}
                        className="pl-10"
                      />
                      <Cake className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      className="flex flex-wrap gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                        <Label htmlFor="prefer-not-to-say">I prefer not to say</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-lg font-semibold text-blue-600">Contact Information</h2>
                  <div className="flex-1 h-px bg-blue-600"></div>
                </div>

                <div className="space-y-6">
                  {/* Contact Numbers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryContact" className="text-sm font-medium text-gray-700">
                        Primary Contact Number
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="primaryContact"
                          value={formData.primaryContact}
                          onChange={(e) => handleInputChange("primaryContact", e.target.value)}
                          className="pl-10"
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryContact" className="text-sm font-medium text-gray-700">
                        Secondary Contact Number
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="secondaryContact"
                          value={formData.secondaryContact}
                          onChange={(e) => handleInputChange("secondaryContact", e.target.value)}
                          className="pl-10"
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="max-w-md">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* LinkedIn Profile */}
                  <div>
                    <Label htmlFor="linkedinProfile" className="text-sm font-medium text-gray-700">
                      LinkedIn Profile Link
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={(e) => handleInputChange("linkedinProfile", e.target.value)}
                        className="pl-10"
                      />
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-lg font-semibold text-blue-600">Address Information</h2>
                  <div className="flex-1 h-px bg-blue-600"></div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-bold text-gray-900 mb-3 block">Address</Label>

                    {/* Address Line 1 */}
                    <div className="mb-4">
                      <Input
                        value={formData.addressLine1}
                        onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                        className="w-full"
                      />
                      <Label className="text-xs text-gray-500 mt-1 block">Address Line 1</Label>
                    </div>

                    {/* City and District */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Input value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                        <Label className="text-xs text-gray-500 mt-1 block">City</Label>
                      </div>
                      <div>
                        <Input
                          value={formData.district}
                          onChange={(e) => handleInputChange("district", e.target.value)}
                        />
                        <Label className="text-xs text-gray-500 mt-1 block">District</Label>
                      </div>
                    </div>

                    {/* Postal Code and Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        />
                        <Label className="text-xs text-gray-500 mt-1 block">Postal Code</Label>
                      </div>
                      <div>
                        <Input
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                        />
                        <Label className="text-xs text-gray-500 mt-1 block">Country</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!acceptTerms}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Placeholder for other stages */}
          {currentStage > 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Stage {currentStage} - Coming Soon</h2>
                <p className="text-gray-600">This stage of the application form is under development.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
