"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentUploadModalProps {
  onClose: () => void
  onDocumentsUploaded: (resumeData: any) => void
}

export function DocumentUploadModal({ onClose, onDocumentsUploaded }: DocumentUploadModalProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragTarget, setDragTarget] = useState<"resume" | "cover" | null>(null)

  const resumeInputRef = useRef<HTMLInputElement>(null)
  const coverLetterInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent, target: "resume" | "cover") => {
    e.preventDefault()
    setIsDragging(true)
    setDragTarget(target)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setDragTarget(null)
  }

  const handleDrop = (e: React.DragEvent, target: "resume" | "cover") => {
    e.preventDefault()
    setIsDragging(false)
    setDragTarget(null)

    const files = Array.from(e.dataTransfer.files)
    const validFile = files.find(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    )

    if (validFile) {
      if (target === "resume") {
        setResumeFile(validFile)
      } else {
        setCoverLetterFile(validFile)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, target: "resume" | "cover") => {
    const file = e.target.files?.[0]
    if (file) {
      if (target === "resume") {
        setResumeFile(file)
      } else {
        setCoverLetterFile(file)
      }
    }
  }

  const handleContinue = () => {
    // Simulate extracting data from resume
    const mockResumeData = {
      firstName: "John",
      lastName: "Doe",
      birthday: "15-Jan-1990",
      gender: "male",
      primaryContact: "+63 912 345 6789",
      secondaryContact: "+63 987 654 3210",
      email: "john.doe@email.com",
      linkedinProfile: "https://linkedin.com/in/johndoe",
      addressLine1: "123 Main Street, Barangay San Antonio",
      city: "Makati City",
      district: "Metro Manila",
      postalCode: "1203",
      country: "Philippines",
    }

    onDocumentsUploaded(resumeFile ? mockResumeData : null)
  }

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto max-h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Attach Documents</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Please upload your resume to continue your application. Your resume will automatically fill in some details
            on the next page to save you time. You can also upload a cover letter if you'd like, but it's optional.
          </p>
        </div>

        {/* Resume Upload */}
        <div className="mb-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging && dragTarget === "resume"
                ? "border-blue-500 bg-blue-50"
                : resumeFile
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDragOver={(e) => handleDragOver(e, "resume")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "resume")}
            onClick={() => resumeInputRef.current?.click()}
          >
            {resumeFile ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-700 font-medium truncate">{resumeFile.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-600">Upload Resume</span>
                <span className="text-xs text-gray-500">PDF, DOC, DOCX</span>
              </div>
            )}
          </div>
          <input
            ref={resumeInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileSelect(e, "resume")}
            className="hidden"
          />
        </div>

        {/* Cover Letter Upload */}
        <div className="mb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging && dragTarget === "cover"
                ? "border-blue-500 bg-blue-50"
                : coverLetterFile
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDragOver={(e) => handleDragOver(e, "cover")}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, "cover")}
            onClick={() => coverLetterInputRef.current?.click()}
          >
            {coverLetterFile ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-700 font-medium truncate">{coverLetterFile.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-600">Upload Cover Letter</span>
                <span className="text-xs text-gray-500">Optional - PDF, DOC, DOCX</span>
              </div>
            )}
          </div>
          <input
            ref={coverLetterInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileSelect(e, "cover")}
            className="hidden"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!resumeFile}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
