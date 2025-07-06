"use client"

import { Navbar } from "@/components/reusables/Navbar"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Added import
import { Label } from "@/components/ui/label" // Added import
import { Checkbox } from "@/components/ui/checkbox" // Added import
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
  Move,
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
  headcount: number
  deploymentDate: string
}

interface PipelineStep {
  id: number
  name: string
  type: string
  icon: any
  description?: string
  redactedInfo?: boolean
  assessments?: Assessment[]
  teamMembers?: TeamMember[]
  templateType?: string
  reminderTime?: string
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

interface Assessment {
  id: number
  type: string
  title: string
  description: string
  required: boolean
  stage: string
  dueDate?: string
  timeLimit?: string
}

// Updated Question Interface to include nonNegotiableOptions
interface Question {
  id: number
  question: string
  description: string
  type: string // "Multiple Choice", "Checkboxes", "Text Entry", "Paragraph", "Number", "Date"
  mode: string // "Non-negotiable", "Preferred", "Optional"
  options: string[] // For Multiple Choice and Checkboxes
  parameters: number[] // For scores, if applicable (e.g., Multiple Choice)
  nonNegotiableText?: string // For Text Entry/Paragraph (exact required text)
  // New: For Multiple Choice/Checkboxes non-negotiable requirements
  nonNegotiableOptions?: Array<{ option: string; required: boolean; requiredValue?: string }>
  required: boolean // General question required status
}

interface QuestionnaireSection {
  id: number
  name: string
  questions: Question[]
}

interface SavedQuestionnaire {
  name: string
  sections: QuestionnaireSection[]
}

interface StagePopupData {
  processType: string
  processTitle: string
  description: string
  redactedInfo: boolean
  assessments: Assessment[]
  teamMembers: TeamMember[]
  templateType: string
  reminderTime: string
}

// Define an interface for the form field configuration items
interface FormFieldConfigItem {
  field: string
  defaultValue: string
  nonNegotiable: boolean
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
      steps: [],
    },
    {
      id: 2,
      name: "STAGE 02",
      steps: [],
    },
    {
      id: 3,
      name: "STAGE 03",
      steps: [],
    },
    {
      id: 4,
      name: "STAGE 04",
      steps: [],
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

  // Stage popup states
  const [showStagePopup, setShowStagePopup] = useState(false)
  const [currentStageId, setCurrentStageId] = useState<number | null>(null)
  const [editingStepId, setEditingStepId] = useState<number | null>(null)
  const [stagePopupData, setStagePopupData] = useState<StagePopupData>({
    processType: "",
    processTitle: "",
    description: "",
    redactedInfo: false,
    assessments: [],
    teamMembers: [],
    templateType: "",
    reminderTime: "00:00:00",
  })

  // Assessment popup states
  const [showAssessmentPopup, setShowAssessmentPopup] = useState(false)
  const [assessmentForm, setAssessmentForm] = useState({
    type: "",
    title: "",
    description: "",
    required: false,
  })
  const [editingAssessmentId, setEditingAssessmentId] = useState<number | null>(null)

  // Team member search
  const [teamSearchQuery, setTeamSearchQuery] = useState("")
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<TeamMember[]>([])

  // Time picker states
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [timePickerValues, setTimePickerValues] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  // Global assessments from all stages
  const [globalAssessments, setGlobalAssessments] = useState<Assessment[]>([])

  // Step 5 states
  const [selectedAssessmentForEdit, setSelectedAssessmentForEdit] = useState<Assessment | null>(null)
  const [assessmentQuestions, setAssessmentQuestions] = useState<{ [key: number]: Question[] }>({})
  const [isEditingAssessment, setIsEditingAssessment] = useState(false)
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null)
  const [templateSearchQuery, setTemplateSearchQuery] = useState("")

  // Assessment settings per assessment (Added state for due dates and time limits)
  const [assessmentSettings, setAssessmentSettings] = useState<{
    [key: number]: {
      dueDate: string
      timeLimit: string
    }
  }>({})

  // Question form state for Step 5
  const [questionForm, setQuestionForm] = useState<Question>({
    id: 0, // Will be set on save
    question: "",
    description: "",
    type: "Multiple Choice",
    mode: "Non-negotiable",
    options: ["", "", "", ""],
    parameters: [0, 0, 0, 0],
    nonNegotiableText: "",
    nonNegotiableOptions: [], // Initialize new field
    required: false,
  })

  // Step move mode (for pipeline steps)
  const [stepMoveMode, setStepMoveMode] = useState(false)
  const [selectedStepForMove, setSelectedStepForMove] = useState<{
    stageId: number
    stepId: number
  } | null>(null)

  // Template confirmation modal
  const [showTemplateConfirmModal, setShowTemplateConfirmModal] = useState(false)
  const [pendingTemplate, setPendingTemplate] = useState<string>("")

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

  const [formFieldConfig] = useState<{
    personal: FormFieldConfigItem[]
    job: FormFieldConfigItem[]
    education: FormFieldConfigItem[]
    acknowledgement: FormFieldConfigItem[]
  }>({
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

  const [showNonNegotiableModal, setShowNonNegotiableModal] = useState(false)
  const [nonNegotiableValues, setNonNegotiableValues] = useState<{ [key: string]: any }>({})

  const handleNext = () => {
    if (currentStep === 3) {
      // Show non-negotiable modal before going to step 4
      setShowNonNegotiableModal(true)
    } else if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addStepToStage = (stageId: number) => {
    setCurrentStageId(stageId)
    setEditingStepId(null)
    setStagePopupData({
      processType: "",
      processTitle: "",
      description: "",
      redactedInfo: false,
      assessments: [],
      teamMembers: [],
      templateType: "",
      reminderTime: "00:00:00",
    })
    setSelectedTeamMembers([])
    setShowStagePopup(true)
  }

  const editStep = (stepId: number) => {
    // Find the step and stage
    let foundStep: PipelineStep | null = null
    let foundStageId: number | null = null

    for (const stage of pipelineStages) {
      const step = stage.steps.find((s) => s.id === stepId)
      if (step) {
        foundStep = step
        foundStageId = stage.id
        break
      }
    }

    if (foundStep && foundStageId) {
      setCurrentStageId(foundStageId)
      setEditingStepId(stepId)
      setStagePopupData({
        processType: foundStep.type,
        processTitle: foundStep.name,
        description: foundStep.description || "",
        redactedInfo: foundStep.redactedInfo || false,
        assessments: foundStep.assessments || [],
        teamMembers: foundStep.teamMembers || [],
        templateType: foundStep.templateType || "",
        reminderTime: foundStep.reminderTime || "00:00:00",
      })
      setSelectedTeamMembers(foundStep.teamMembers || [])
      setShowStagePopup(true)
    }
  }

  const deleteStep = (stageId: number, stepId: number) => {
    setPipelineStages(
      pipelineStages.map((stage) =>
        stage.id === stageId ? { ...stage, steps: stage.steps.filter((step) => step.id !== stepId) } : stage,
      ),
    )
  }

  // Updated step move functions to properly swap positions instead of copying
  const handleMoveStep = (stageId: number, stepId: number) => {
    if (selectedStepForMove) {
      const sourceStageId = selectedStepForMove.stageId
      const sourceStepId = selectedStepForMove.stepId

      // Don't move if it's the same step
      if (sourceStageId === stageId && sourceStepId === stepId) {
        setStepMoveMode(false)
        setSelectedStepForMove(null)
        return
      }

      // Find source and target steps with their complete data
      let sourceStep: PipelineStep | null = null
      let targetStep: PipelineStep | null = null
      let sourceStageIndex = -1
      let targetStageIndex = -1
      let sourceStepIndex = -1
      let targetStepIndex = -1

      const updatedStages = [...pipelineStages]

      // Find source step and its indices
      for (let i = 0; i < updatedStages.length; i++) {
        if (updatedStages[i].id === sourceStageId) {
          sourceStageIndex = i
          sourceStepIndex = updatedStages[i].steps.findIndex((step) => step.id === sourceStepId)
          if (sourceStepIndex !== -1) {
            sourceStep = { ...updatedStages[i].steps[sourceStepIndex] }
          }
          break
        }
      }

      // Find target step and its indices
      for (let i = 0; i < updatedStages.length; i++) {
        if (updatedStages[i].id === stageId) {
          targetStageIndex = i
          targetStepIndex = updatedStages[i].steps.findIndex((step) => step.id === stepId)
          if (targetStepIndex !== -1) {
            targetStep = { ...updatedStages[i].steps[targetStepIndex] }
          }
          break
        }
      }

      if (sourceStep && targetStep && sourceStepIndex !== -1 && targetStepIndex !== -1) {
        if (sourceStageId === stageId) {
          // Same stage - swap positions
          const newSteps = [...updatedStages[sourceStageIndex].steps]
          newSteps[sourceStepIndex] = targetStep
          newSteps[targetStepIndex] = sourceStep
          updatedStages[sourceStageIndex] = { ...updatedStages[sourceStageIndex], steps: newSteps }
        } else {
          // Different stages - remove from source, add to target
          updatedStages[sourceStageIndex].steps.splice(sourceStepIndex, 1)
          updatedStages[targetStageIndex].steps.splice(targetStepIndex, 0, sourceStep)
        }
        setPipelineStages(updatedStages)
      }

      setStepMoveMode(false)
      setSelectedStepForMove(null)
    }
  }

  // Assessment management functions
  const openAssessmentPopup = () => {
    setAssessmentForm({
      type: "",
      title: "",
      description: "",
      required: false,
    })
    setEditingAssessmentId(null)
    setShowAssessmentPopup(true)
  }

  const editAssessment = (assessment: Assessment) => {
    setAssessmentForm({
      type: assessment.type,
      title: assessment.title,
      description: assessment.description,
      required: assessment.required,
    })
    setEditingAssessmentId(assessment.id)
    setShowAssessmentPopup(true)
  }

  const deleteAssessment = (assessmentId: number) => {
    setStagePopupData((prev) => ({
      ...prev,
      assessments: prev.assessments.filter((a) => a.id !== assessmentId),
    }))
  }

  // Global assessment deletion (affects both step 4 and step 5)
  const deleteGlobalAssessment = (assessmentId: number) => {
    setGlobalAssessments((prev) => prev.filter((a) => a.id !== assessmentId))
    // Also remove from current stage popup if it exists there
    setPipelineStages((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        steps: stage.steps.map((step) => ({
          ...step,
          assessments: (step.assessments || []).filter((a) => a.id !== assessmentId),
        })),
      })),
    )

    // If currently editing this assessment, clear the editing state
    if (selectedAssessmentForEdit?.id === assessmentId) {
      setSelectedAssessmentForEdit(null)
      setIsEditingAssessment(false)
    }
    // Remove questions for this assessment
    setAssessmentQuestions((prev) => {
      const updated = { ...prev }
      delete updated[assessmentId]
      return updated
    })
    // Remove assessment settings when deleting assessment
    setAssessmentSettings((prev) => {
      const updated = { ...prev }
      delete updated[assessmentId]
      return updated
    })
  }

  // Assessment move mode
  const [assessmentMoveMode, setAssessmentMoveMode] = useState(false)
  const [selectedAssessmentForMove, setSelectedAssessmentForMove] = useState<number | null>(null)

  const moveAssessment = (targetIndex: number) => {
    if (selectedAssessmentForMove !== null) {
      const assessments = [...stagePopupData.assessments]
      const sourceIndex = assessments.findIndex((a) => a.id === selectedAssessmentForMove)

      if (sourceIndex !== -1 && sourceIndex !== targetIndex) {
        // Swap assessments
        const temp = assessments[sourceIndex]
        assessments[sourceIndex] = assessments[targetIndex]
        assessments[targetIndex] = temp

        setStagePopupData((prev) => ({
          ...prev,
          assessments: assessments,
        }))
      }

      setAssessmentMoveMode(false)
      setSelectedAssessmentForMove(null)
    }
  }

  // Team member management
  const addTeamMember = (member: TeamMember) => {
    if (!selectedTeamMembers.find((m) => m.id === member.id)) {
      setSelectedTeamMembers([...selectedTeamMembers, member])
    }
  }

  const removeTeamMember = (memberId: number) => {
    setSelectedTeamMembers(selectedTeamMembers.filter((m) => m.id !== memberId))
  }

  const filteredTeamMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(teamSearchQuery.toLowerCase()),
  )

  // Time picker functions
  const setCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")

    setTimePickerValues({ hours, minutes, seconds })
    setStagePopupData((prev) => ({
      ...prev,
      reminderTime: `${hours}:${minutes}:${seconds}`,
    }))
  }

  const updateTime = () => {
    const timeString = `${timePickerValues.hours}:${timePickerValues.minutes}:${timePickerValues.seconds}`
    setStagePopupData((prev) => ({
      ...prev,
      reminderTime: timeString,
    }))
    setShowTimePicker(false)
  }

  const getProcessTypeIcon = (processType: string) => {
    switch (processType) {
      case "Resume Screening":
        return FileText
      case "Phone Call Interview":
      case "Phone/Call Interview":
        return Phone
      case "Shortlisted":
        return Users
      case "Initial Interview":
      case "Set Schedule for Interview":
        return Calendar
      case "Assessments":
        return FileText
      case "Final Interview":
        return Users
      case "For Job Offer":
      case "Job Offer":
        return Briefcase
      case "For Offer and Finalization":
        return Briefcase
      case "Onboarding":
        return Users
      default:
        return FileText
    }
  }

  const saveStageData = () => {
    if (currentStageId && stagePopupData.processTitle.trim()) {
      const IconComponent = getProcessTypeIcon(stagePopupData.processType)

      if (editingStepId) {
        // Update existing step
        setPipelineStages((prev) =>
          prev.map((stage) =>
            stage.id === currentStageId
              ? {
                  ...stage,
                  steps: stage.steps.map((step) =>
                    step.id === editingStepId
                      ? {
                          ...step,
                          name: stagePopupData.processTitle,
                          type: stagePopupData.processType,
                          icon: IconComponent,
                          description: stagePopupData.description,
                          redactedInfo: stagePopupData.redactedInfo,
                          assessments: stagePopupData.assessments,
                          teamMembers: selectedTeamMembers,
                          templateType: stagePopupData.templateType,
                          reminderTime: stagePopupData.reminderTime,
                        }
                      : step,
                  ),
                }
              : stage,
          ),
        )
      } else {
        // Create new step
        const newStep: PipelineStep = {
          id: Date.now(),
          name: stagePopupData.processTitle,
          type: stagePopupData.processType,
          icon: IconComponent,
          description: stagePopupData.description,
          redactedInfo: stagePopupData.redactedInfo,
          assessments: stagePopupData.assessments,
          teamMembers: selectedTeamMembers,
          templateType: stagePopupData.templateType,
          reminderTime: stagePopupData.reminderTime,
        }

        setPipelineStages((prev) =>
          prev.map((stage) => (stage.id === currentStageId ? { ...stage, steps: [...stage.steps, newStep] } : stage)),
        )
      }

      // Add assessments to global assessments with stage information
      const assessmentsWithStage = stagePopupData.assessments.map((assessment) => ({
        ...assessment,
        stage: `Stage ${currentStageId && currentStageId < 10 ? `0${currentStageId}` : currentStageId}`,
      }))

      setGlobalAssessments((prev) => {
        // Remove existing assessments from this step if editing
        const filteredAssessments = editingStepId
          ? prev.filter((a) => !stagePopupData.assessments.find((sa) => sa.id === a.id))
          : prev
        return [...filteredAssessments, ...assessmentsWithStage]
      })
    }

    setShowStagePopup(false)
    setCurrentStageId(null)
    setEditingStepId(null)
  }

  // Step 5 functions
  const selectAssessmentForEdit = (assessment: Assessment) => {
    setSelectedAssessmentForEdit(assessment)
    setIsEditingAssessment(true)
    // Initialize assessment settings if they don't exist
    if (!assessmentSettings[assessment.id]) {
      setAssessmentSettings((prev) => ({
        ...prev,
        [assessment.id]: {
          dueDate: assessment.dueDate || "2021-02-09",
          timeLimit: assessment.timeLimit || "01:00:00",
        },
      }))
    }
  }

  const saveAssessmentChanges = () => {
    if (selectedAssessmentForEdit) {
      // Save the current questions to the assessment
      const currentQuestions = assessmentQuestions[selectedAssessmentForEdit.id] || []
      setAssessmentQuestions((prev) => ({
        ...prev,
        [selectedAssessmentForEdit.id]: currentQuestions,
      }))

      // Update the global assessment with saved settings
      const settings = assessmentSettings[selectedAssessmentForEdit.id]
      if (settings) {
        setGlobalAssessments((prev) =>
          prev.map((assessment) =>
            assessment.id === selectedAssessmentForEdit.id
              ? {
                  ...assessment,
                  dueDate: settings.dueDate,
                  timeLimit: settings.timeLimit,
                }
              : assessment,
          ),
        )
      }
    }
    setIsEditingAssessment(false)
  }

  const openQuestionModal = () => {
    setQuestionForm({
      id: 0,
      question: "",
      description: "",
      type: "Multiple Choice",
      mode: "Non-negotiable",
      options: ["", "", "", ""],
      parameters: [0, 0, 0, 0],
      nonNegotiableText: "",
      nonNegotiableOptions: [], // Reset new field
      required: false,
    })
    setEditingQuestionId(null)
    setShowAddQuestionModal(true)
  }

  const editQuestion = (question: Question) => {
    setQuestionForm({
      id: question.id,
      question: question.question,
      description: question.description,
      type: question.type,
      mode: question.mode,
      options: question.options,
      parameters: question.parameters,
      nonNegotiableText: question.nonNegotiableText || "",
      nonNegotiableOptions: question.nonNegotiableOptions || [], // Load new field
      required: question.required,
    })
    setEditingQuestionId(question.id)
    setShowAddQuestionModal(true)
  }

  const deleteQuestion = (questionId: number) => {
    if (selectedAssessmentForEdit) {
      setAssessmentQuestions((prev) => ({
        ...prev,
        [selectedAssessmentForEdit.id]: (prev[selectedAssessmentForEdit.id] || []).filter((q) => q.id !== questionId),
      }))
    }
  }

  const saveQuestion = () => {
    if (questionForm.question.trim() && selectedAssessmentForEdit) {
      const newQuestion: Question = {
        id: editingQuestionId || Date.now(),
        question: questionForm.question,
        description: questionForm.description,
        type: questionForm.type,
        mode: questionForm.mode,
        options: questionForm.options,
        parameters: questionForm.parameters,
        nonNegotiableText: questionForm.nonNegotiableText,
        nonNegotiableOptions: questionForm.nonNegotiableOptions, // Save new field
        required: questionForm.required,
      }

      setAssessmentQuestions((prev) => {
        const currentQuestions = prev[selectedAssessmentForEdit.id] || []
        if (editingQuestionId) {
          return {
            ...prev,
            [selectedAssessmentForEdit.id]: currentQuestions.map((q) => (q.id === editingQuestionId ? newQuestion : q)),
          }
        } else {
          return {
            ...prev,
            [selectedAssessmentForEdit.id]: [...currentQuestions, newQuestion],
          }
        }
      })

      setShowAddQuestionModal(false)
      setEditingQuestionId(null)
    }
  }

  // Functions to handle assessment settings changes
  const handleAssessmentDueDateChange = (assessmentId: number, dueDate: string) => {
    setAssessmentSettings((prev) => ({
      ...prev,
      [assessmentId]: {
        ...prev[assessmentId],
        dueDate,
      },
    }))
  }

  const handleAssessmentTimeLimitChange = (assessmentId: number, timeLimit: string) => {
    setAssessmentSettings((prev) => ({
      ...prev,
      [assessmentId]: {
        ...prev[assessmentId],
        timeLimit,
      },
    }))
  }

  // Step 3 Questionnaire states and functions
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false)
  const [questionnaireName, setQuestionnaireName] = useState("")
  const [sections, setSections] = useState<QuestionnaireSection[]>([])
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null)
  const [newSectionName, setNewSectionName] = useState("")
  const [showSectionInput, setShowSectionInput] = useState(false)
  const [editingQuestionIdStep3, setEditingQuestionIdStep3] = useState<number | null>(null)
  // Fix: Declare showAddQuestionModalStep3
  const [showAddQuestionModalStep3, setShowAddQuestionModalStep3] = useState(false)


  // Question form state for Step 3
  const [questionFormStep3, setQuestionFormStep3] = useState<Question>({
    id: 0,
    question: "",
    description: "",
    type: "Multiple Choice",
    mode: "Non-negotiable",
    options: ["", "", "", ""],
    parameters: [0, 0, 0, 0],
    nonNegotiableText: "",
    nonNegotiableOptions: [], // Initialize new field
    required: false, // Default to false for questionnaire questions
  })

  // State for renaming sections
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null)
  const [editingSectionName, setEditingSectionName] = useState("")

  const [moveMode, setMoveMode] = useState(false) // For Step 3 question reordering
  const [selectedQuestionForMove, setSelectedQuestionForMove] = useState<{
    sectionId: number
    questionId: number
  } | null>(null)

  const [savedQuestionnaires, setSavedQuestionnaires] = useState<SavedQuestionnaire[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [isTemplateSelected, setIsTemplateSelected] = useState(false) // New state to track if a template is loaded

  // Step 5 question move mode
  const [moveQuestionModeStep5, setMoveQuestionModeStep5] = useState(false)
  const [selectedQuestionForMoveStep5, setSelectedQuestionForMoveStep5] = useState<number | null>(null)

  // Function to handle moving questions within an assessment in Step 5
  const handleMoveQuestionStep5 = (targetQuestionId: number) => {
    if (selectedAssessmentForEdit && selectedQuestionForMoveStep5 !== null) {
      const currentQuestions = [...(assessmentQuestions[selectedAssessmentForEdit.id] || [])]
      const sourceIndex = currentQuestions.findIndex((q) => q.id === selectedQuestionForMoveStep5)
      const targetIndex = currentQuestions.findIndex((q) => q.id === targetQuestionId)

      if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
        const [movedQuestion] = currentQuestions.splice(sourceIndex, 1)
        currentQuestions.splice(targetIndex, 0, movedQuestion)

        setAssessmentQuestions((prev) => ({
          ...prev,
          [selectedAssessmentForEdit.id]: currentQuestions,
        }))
      }
      setMoveQuestionModeStep5(false)
      setSelectedQuestionForMoveStep5(null)
    }
  }

  const handleMoveQuestion = (sectionId: number, questionId: number) => {
    if (selectedQuestionForMove) {
      // Find the question in the source section
      const sourceSection = sections.find((s) => s.id === selectedQuestionForMove.sectionId)
      const questionToMove = sourceSection?.questions.find((q) => q.id === selectedQuestionForMove.questionId)

      if (questionToMove) {
        // Remove the question from the source section
        const updatedSections = sections.map((section) => {
          if (section.id === selectedQuestionForMove.sectionId) {
            return {
              ...section,
              questions: section.questions.filter((q) => q.id !== selectedQuestionForMove.questionId),
            }
          }
          return section
        })

        // Add the question to the destination section
        const finalSections = updatedSections.map((section) => {
          if (section.id === sectionId) {
            // Find the index of the target question to insert before it
            const targetQuestionIndex = section.questions.findIndex((q) => q.id === questionId);
            const newQuestions = [...section.questions];
            if (targetQuestionIndex !== -1) {
              newQuestions.splice(targetQuestionIndex, 0, questionToMove);
            } else {
              // If target question not found (e.g., section is empty or target is last), just add to end
              newQuestions.push(questionToMove);
            }
            return {
              ...section,
              questions: newQuestions,
            }
          }
          return section
        })

        setSections(finalSections)
        setSelectedQuestionForMove(null)
        setMoveMode(false)
      }
    }
  }

  // Template search functionality for Step 5
  const filteredTemplates = savedQuestionnaires.filter((template) =>
    template.name.toLowerCase().includes(templateSearchQuery.toLowerCase()),
  )

  const selectTemplate = (templateName: string) => {
    if (selectedAssessmentForEdit) {
      const currentQuestions = assessmentQuestions[selectedAssessmentForEdit.id] || []
      if (currentQuestions.length > 0) {
        // Show confirmation modal if there are existing questions
        setPendingTemplate(templateName)
        setShowTemplateConfirmModal(true)
      } else {
        // Apply template directly if no existing questions
        applyTemplate(templateName)
      }
    }
    setTemplateSearchQuery("")
  }

  const applyTemplate = (templateName: string) => {
    const template = savedQuestionnaires.find((t) => t.name === templateName)
    if (template && selectedAssessmentForEdit) {
      // Convert template questions to assessment questions
      const templateQuestions: Question[] = []
      template.sections.forEach((section) => {
        section.questions.forEach((q: any) => {
          templateQuestions.push({
            id: Date.now() + Math.random(), // Ensure unique IDs for new questions
            question: q.question,
            description: q.description,
            type: q.type,
            mode: q.mode,
            options: q.options,
            parameters: q.parameters,
            nonNegotiableText: q.nonNegotiableText,
            nonNegotiableOptions: q.nonNegotiableOptions || [], // Apply new field
            required: false, // Default to not required for assessment questions
          })
        })
      })
      setAssessmentQuestions((prev) => ({
        ...prev,
        [selectedAssessmentForEdit.id]: templateQuestions,
      }))
    }
  }

  const handleTemplateConfirm = () => {
    applyTemplate(pendingTemplate)
    setShowTemplateConfirmModal(false)
    setPendingTemplate("")
  }

  const handleTemplateCancel = () => {
    setShowTemplateConfirmModal(false)
    setPendingTemplate("")
  }

  const getNonNegotiableFields = () => {
    const nonNegotiableFields: Array<{
      category: string
      field: string
      type: "text" | "select" | "radio" | "checkbox" | "file" | "date" | "number"
      options?: string[]
    }> = []

    // Check Personal Information
    formFieldConfig.personal.forEach((item) => {
      if (item.nonNegotiable) {
        nonNegotiableFields.push({
          category: "Personal Information",
          field: item.field,
          type: "text", // Assuming all personal non-negotiable are text for simplicity
        })
      }
    })

    // Check Job Details
    formFieldConfig.job.forEach((item) => {
      if (item.nonNegotiable) {
        let fieldType: "text" | "select" | "radio" | "checkbox" | "file" | "date" | "number" = "text"

        if (item.field === "Are you willing to work onsite?") {
          fieldType = "radio"
        } else if (item.field.toLowerCase().includes("upload")) {
          fieldType = "file"
        } else if (item.field === "Expected Salary") {
          fieldType = "number" // Changed to number
        } else if (item.field.toLowerCase().includes("date")) {
          fieldType = "date"
        }

        nonNegotiableFields.push({
          category: "Job Details",
          field: item.field,
          type: fieldType,
          options: item.field === "Are you willing to work onsite?" ? ["Yes", "No", "Flexible"] : undefined,
        })
      }
    })

    // Check Work and Education
    formFieldConfig.education.forEach((item) => {
      if (item.nonNegotiable) {
        let fieldType: "text" | "select" | "radio" | "checkbox" | "file" | "date" | "number" = "text"

        if (item.field === "Highest Educational Attained") {
          fieldType = "select"
        } else if (item.field === "Work Experience") {
          fieldType = "radio"
        }

        nonNegotiableFields.push({
          category: "Work and Education",
          field: item.field,
          type: fieldType,
          options:
            item.field === "Highest Educational Attained"
              ? ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate"]
              : item.field === "Work Experience"
                ? ["Yes", "No"]
                : undefined,
        })
      }
    })

    // Add questionnaire non-negotiables
    sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (question.mode === "Non-negotiable") {
          nonNegotiableFields.push({
            category: `Questionnaire - ${section.name}`,
            field: question.question,
            type:
              question.type === "Multiple Choice"
                ? "radio"
                : question.type === "Checkboxes"
                  ? "checkbox"
                  : question.type === "Text Entry" || question.type === "Paragraph"
                    ? "text"
                    : question.type === "Number"
                      ? "number"
                      : "date", // Assuming Date for other types
            options:
              question.type === "Multiple Choice" || question.type === "Checkboxes"
                ? question.options.filter((opt) => opt.trim() !== "")
                : undefined,
          })
        }
      })
    })

    return nonNegotiableFields
  }

  const handleNonNegotiableValueChange = (fieldKey: string, value: any) => {
    setNonNegotiableValues((prev) => ({
      ...prev,
      [fieldKey]: value,
    }))
  }

  const handleSaveNonNegotiables = () => {
    setShowNonNegotiableModal(false)
    setCurrentStep(4) // Proceed to step 4
  }

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
                      {formFieldConfig.personal.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium text-gray-800 w-2/5">{item.field}</td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="checkbox"
                              name={`personal_${index}_non_negotiable`}
                              value="non-negotiable"
                              defaultChecked={item.nonNegotiable}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-blue-600 checked:after:text-xs checked:after:font-bold"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`personal_${index}_status`}
                              value="required"
                              defaultChecked={!item.nonNegotiable && item.defaultValue === "required"}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`personal_${index}_status`}
                              value="optional"
                              defaultChecked={!item.nonNegotiable && item.defaultValue === "optional"}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`personal_${index}_status`}
                              value="disabled"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checke:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
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
                      {formFieldConfig.job.map((item, index) => (
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
                      {formFieldConfig.education.map((item, index) => (
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
                      {formFieldConfig.acknowledgement.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium text-gray-800 w-2/5">{item.field}</td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="checkbox"
                              name={`acknowledgement_${index}_non_negotiable`}
                              value="non-negotiable"
                              defaultChecked={item.nonNegotiable}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-blue-600 checked:after:text-xs checked:after:font-bold"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`acknowledgement_${index}_status`}
                              value="required"
                              defaultChecked={!item.nonNegotiable && item.defaultValue === "required"}
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
                            />
                          </td>
                          <td className="p-4 text-center w-1/6">
                            <input
                              type="radio"
                              name={`acknowledgement_${index}_status`}
                              value="optional"
                              className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full appearance-none focus:ring-2 focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 checked:after:content-[''] checked:after:w-2 checked:after:h-2 checked:after:bg-blue-600 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 relative"
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
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white min-w-[200px]"
                    onChange={(e) => {
                      const selected = e.target.value
                      setSelectedTemplate(selected)
                      if (selected !== "") {
                        const template = savedQuestionnaires.find((q) => q.name === selected)
                        if (template) {
                          setSections(template.sections)
                          setQuestionnaireName(template.name)
                          setIsTemplateSelected(true) // A template is selected
                        } else {
                          setSections([])
                          setQuestionnaireName("")
                          setIsTemplateSelected(false)
                        }
                      } else {
                        setSections([])
                        setQuestionnaireName("")
                        setIsTemplateSelected(false)
                      }
                    }}
                    value={selectedTemplate}
                  >
                    <option value="">Select Templates</option>
                    {savedQuestionnaires.map((template) => (
                      <option key={template.name} value={template.name}>
                        {template.name}
                      </option>
                    ))}
                    {questionnaireName && !savedQuestionnaires.find((q) => q.name === questionnaireName) && (
                      <option>{questionnaireName}</option>
                    )}
                  </select>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                    onClick={() => {
                      setShowQuestionnaireModal(true)
                      // If a template is selected, do NOT clear the questionnaireName and sections.
                      // Otherwise, clear them for a new questionnaire.
                      if (!isTemplateSelected) {
                        setQuestionnaireName("") // Clear questionnaire name for new
                        setSections([]) // Clear sections for new
                      }
                    }}
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
                            className={`flex items-center justify-between p-3 border rounded-lg bg-white ${
                              stepMoveMode && selectedStepForMove?.stepId !== step.id
                                ? "cursor-pointer hover:bg-blue-50 border-blue-200"
                                : ""
                            } ${selectedStepForMove?.stepId === step.id ? "border-blue-500 bg-blue-50" : ""}`}
                            onClick={() => {
                              if (stepMoveMode && selectedStepForMove?.stepId !== step.id) {
                                handleMoveStep(stage.id, step.id)
                              }
                            }}
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
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Move Step"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (!stepMoveMode) {
                                    setStepMoveMode(true)
                                    setSelectedStepForMove({ stageId: stage.id, stepId: step.id })
                                  } else if (selectedStepForMove?.stepId === step.id) {
                                    // Cancel move mode if clicking the same step
                                    setStepMoveMode(false)
                                    setSelectedStepForMove(null)
                                  }
                                }}
                                className={selectedStepForMove?.stepId === step.id ? "bg-blue-100" : ""}
                              >
                                <Move className="w-4 h-4 text-gray-500" />
                              </Button>
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
                    {globalAssessments.map((assessment) => (
                      <div
                        key={assessment.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedAssessmentForEdit?.id === assessment.id
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => selectAssessmentForEdit(assessment)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <div>
                              <h5 className="font-medium text-gray-800">{assessment.title}</h5>
                              <p className="text-sm text-gray-600">
                                {assessment.type} • {assessment.stage} • {assessment.required ? "Required" : "Optional"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                selectAssessmentForEdit(assessment)
                              }}
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteGlobalAssessment(assessment.id)
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions Section */}
                {selectedAssessmentForEdit && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-medium text-gray-800">
                        Questions for {selectedAssessmentForEdit.title}
                      </h4>
                      <Button
                        onClick={() => {
                          setMoveQuestionModeStep5(!moveQuestionModeStep5)
                          setSelectedQuestionForMoveStep5(null) // Reset selected question when toggling mode
                        }}
                        variant={moveQuestionModeStep5 ? "default" : "outline"}
                        size="sm"
                        className={moveQuestionModeStep5 ? "bg-blue-600 text-white" : ""}
                      >
                        <Move className="w-4 h-4 mr-1" />
                        {moveQuestionModeStep5 ? "Exit Move Mode" : "Move Questions"}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {(assessmentQuestions[selectedAssessmentForEdit.id] || []).map((question, index) => (
                        <div
                          key={question.id}
                          className={`border rounded-lg p-4 bg-gray-50 ${
                            moveQuestionModeStep5
                              ? selectedQuestionForMoveStep5 === question.id
                                ? "border-blue-500 bg-blue-100 cursor-grabbing"
                                : "cursor-pointer hover:bg-blue-50 border-blue-200"
                              : ""
                          }`}
                          onClick={() => {
                            if (moveQuestionModeStep5) {
                              if (selectedQuestionForMoveStep5 === null) {
                                setSelectedQuestionForMoveStep5(question.id)
                              } else if (selectedQuestionForMoveStep5 === question.id) {
                                setSelectedQuestionForMoveStep5(null) // Deselect if clicked again
                              } else {
                                handleMoveQuestionStep5(question.id)
                              }
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <span className="text-sm font-medium text-gray-700">{index + 1}.</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-800 mb-2">{question.question}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-600">
                                    <span>{question.type}</span>
                                    <span>{question.mode}</span>
                                    {question.required && <span className="text-red-600">Required</span>}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {!moveQuestionModeStep5 && (
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="Edit Question"
                                  onClick={() => editQuestion(question)}
                                >
                                  <Edit className="w-4 h-4 text-gray-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="Delete Question"
                                  onClick={() => deleteQuestion(question.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-gray-500" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add Question Button */}
                      <button
                        onClick={openQuestionModal}
                        className="w-full p-4 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Question
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Template Search and Settings */}
              <div className="space-y-6">
                {/* Search Template */}
                <div>
                  <div className="relative">
                    <Input
                      placeholder="Search Template Question"
                      className="pl-8"
                      value={templateSearchQuery}
                      onChange={(e) => setTemplateSearchQuery(e.target.value)}
                    />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Template Results */}
                  {templateSearchQuery && (
                    <div className="mt-2 bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                      {filteredTemplates.length > 0 ? (
                        <div className="space-y-2">
                          {filteredTemplates.map((template) => (
                            <div
                              key={template.name}
                              className="text-sm text-gray-600 p-2 hover:bg-white rounded cursor-pointer"
                              onClick={() => selectTemplate(template.name)}
                            >
                              {template.name}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">No templates found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Assessment Settings - Set Due and Time Limit per assessment */}
                {selectedAssessmentForEdit && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Set Due</label>
                      <div className="relative">
                        <Input
                          type="date"
                          value={assessmentSettings[selectedAssessmentForEdit.id]?.dueDate || "2021-02-09"}
                          onChange={(e) => handleAssessmentDueDateChange(selectedAssessmentForEdit.id, e.target.value)}
                          className="pr-8"
                        />
                        <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (HH:MM:SS)</label>
                      <div className="relative">
                        <Input
                          type="time"
                          step="1"
                          value={assessmentSettings[selectedAssessmentForEdit.id]?.timeLimit || "01:00:00"}
                          onChange={(e) =>
                            handleAssessmentTimeLimitChange(selectedAssessmentForEdit.id, e.target.value)
                          }
                          className="pr-8"
                        />
                        <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
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

  // Helper function to save assessment
  function handleSaveAssessment() {
    if (assessmentForm.title.trim() && assessmentForm.type.trim()) {
      const newAssessment: Assessment = {
        id: editingAssessmentId || Date.now(),
        type: assessmentForm.type,
        title: assessmentForm.title,
        description: assessmentForm.description,
        required: assessmentForm.required,
        stage: `Stage ${currentStageId && currentStageId < 10 ? `0${currentStageId}` : currentStageId}`,
      }

      if (editingAssessmentId) {
        setStagePopupData((prev) => ({
          ...prev,
          assessments: prev.assessments.map((a) => (a.id === editingAssessmentId ? newAssessment : a)),
        }))
      } else {
        setStagePopupData((prev) => ({
          ...prev,
          assessments: [...prev.assessments, newAssessment],
        }))
      }

      setShowAssessmentPopup(false)
      setEditingAssessmentId(null)
    }
  }

  // Step 3 Question functions
  const saveQuestionStep3 = () => {
    if (questionFormStep3.question.trim() && currentSectionId) {
      const newQuestion: Question = {
        id: editingQuestionIdStep3 || Date.now(),
        question: questionFormStep3.question,
        description: questionFormStep3.description,
        type: questionFormStep3.type,
        mode: questionFormStep3.mode,
        options: questionFormStep3.options,
        parameters: questionFormStep3.parameters,
        nonNegotiableText: questionFormStep3.nonNegotiableText,
        nonNegotiableOptions: questionFormStep3.nonNegotiableOptions, // Save new field
        required: questionFormStep3.required,
      }

      setSections((prev) =>
        prev.map((section) => {
          if (section.id === currentSectionId) {
            if (editingQuestionIdStep3) {
              return {
                ...section,
                questions: section.questions.map((q) => (q.id === editingQuestionIdStep3 ? newQuestion : q)),
              }
            } else {
              return {
                ...section,
                questions: [...section.questions, newQuestion],
              }
            }
          }
          return section
        }),
      )

      setShowAddQuestionModalStep3(false)
      setEditingQuestionIdStep3(null)
      setCurrentSectionId(null)
    }
  }

  const handleSaveAsNewTemplate = () => {
    if (questionnaireName.trim() && sections.length > 0) {
      const newQuestionnaire: SavedQuestionnaire = {
        name: questionnaireName,
        sections: sections,
      }
      setSavedQuestionnaires((prev) => [...prev, newQuestionnaire])
      setSelectedTemplate(questionnaireName) // Automatically select the new template
      setIsTemplateSelected(true)
      setShowQuestionnaireModal(false)
    }
  }

  const handleUpdateTemplate = () => {
    if (selectedTemplate && questionnaireName.trim() && sections.length > 0) {
      setSavedQuestionnaires((prev) =>
        prev.map((template) =>
          template.name === selectedTemplate
            ? { ...template, name: questionnaireName, sections: sections }
            : template,
        ),
      )
      setShowQuestionnaireModal(false)
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
                  ? isEditingAssessment
                    ? saveAssessmentChanges
                    : () => {
                        // Handle save logic here
                        console.log("Saving position data...", formData)
                        // You can add actual save functionality here
                      }
                  : handleNext
              }
            >
              {currentStep === 5 ? (isEditingAssessment ? "Save" : "Next step →") : "Next step →"}
            </Button>
          </div>
        </div>
      </div>

      {/* Stage Popup Modal */}
      {showStagePopup && currentStageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowStagePopup(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shadow-sm bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-blue-600">
                  Stage {currentStageId < 10 ? `0${currentStageId}` : currentStageId}
                </h2>
                <div className="flex-1 h-px bg-blue-600"></div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowStagePopup(false)} className="hover:bg-gray-100">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Process Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Process Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white"
                  value={stagePopupData.processType}
                  onChange={(e) => setStagePopupData((prev) => ({ ...prev, processType: e.target.value }))}
                >
                  <option value="">Select Process Type</option>
                  <option value="Resume Screening">Resume Screening</option>
                  <option value="Phone Call Interview">Phone Call Interview</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Initial Interview">Initial Interview</option>
                  <option value="Assessments">Assessments</option>
                  <option value="Final Interview">Final Interview</option>
                  <option value="For Job Offer">For Job Offer</option>
                  <option value="For Offer and Finalization">For Offer and Finalization</option>
                  <option value="Onboarding">Onboarding</option>
                </select>
              </div>

              {/* Process Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Process Title</label>
                <Input
                  placeholder="Enter process title"
                  value={stagePopupData.processTitle}
                  onChange={(e) => setStagePopupData((prev) => ({ ...prev, processTitle: e.target.value }))}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md text-sm h-24 resize-none"
                  placeholder="Enter description"
                  value={stagePopupData.description}
                  onChange={(e) => setStagePopupData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Redacted Information Switch */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStagePopupData((prev) => ({ ...prev, redactedInfo: !prev.redactedInfo }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    stagePopupData.redactedInfo ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      stagePopupData.redactedInfo ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">Redacted Information</span>
              </div>

              {/* Assessment Section */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">Assessment</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[120px]">
                  {stagePopupData.assessments.length === 0 ? (
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-4">
                        No assessments have been added for this interview stage.
                      </p>
                      <Button
                        onClick={openAssessmentPopup}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                      >
                        + Add Assessment
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stagePopupData.assessments.map((assessment, index) => (
                        <div
                          key={assessment.id}
                          className={`flex items-center justify-between p-3 border rounded-lg bg-white ${
                            assessmentMoveMode && selectedAssessmentForMove !== assessment.id
                              ? "cursor-pointer hover:bg-blue-50 border-blue-200"
                              : ""
                          } ${selectedAssessmentForMove === assessment.id ? "border-blue-500 bg-blue-50" : ""}`}
                          onClick={() => {
                            if (assessmentMoveMode && selectedAssessmentForMove !== assessment.id) {
                              moveAssessment(index)
                            }
                          }}
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{assessment.title}</h4>
                            <p className="text-sm text-gray-600">{assessment.type}</p>
                            {assessment.description && (
                              <p className="text-xs text-gray-500 mt-1">{assessment.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Move Assessment"
                              onClick={() => {
                                if (!assessmentMoveMode) {
                                  setAssessmentMoveMode(true)
                                  setSelectedAssessmentForMove(assessment.id)
                                } else if (selectedAssessmentForMove === assessment.id) {
                                  // Cancel move mode if clicking the same assessment
                                  setAssessmentMoveMode(false)
                                  setSelectedAssessmentForMove(null)
                                } else {
                                  // Move to this position
                                  moveAssessment(index)
                                }
                              }}
                              className={selectedAssessmentForMove === assessment.id ? "bg-blue-100" : ""}
                            >
                              <Move className="w-4 h-4 text-gray-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Edit Assessment"
                              onClick={() => editAssessment(assessment)}
                            >
                              <Pencil className="w-4 h-4 text-gray-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Delete Assessment"
                              onClick={() => deleteAssessment(assessment.id)}
                            >
                              <Trash2 className="w-4 h-4 text-gray-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <Button
                          onClick={openAssessmentPopup}
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Team Member Section */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">Team Member</h3>

                {/* Search Bar */}
                <div className="relative mb-4">
                  <Input
                    placeholder="Search team members..."
                    value={teamSearchQuery}
                    onChange={(e) => setTeamSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Search Results */}
                {teamSearchQuery && (
                  <div className="mb-4 max-h-32 overflow-y-auto border rounded-lg">
                    {filteredTeamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          addTeamMember(member)
                          setTeamSearchQuery("")
                        }}
                      >
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.position}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Team Members Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-3 font-medium text-gray-700">Name</th>
                        <th className="text-left p-3 font-medium text-gray-700">Position</th>
                        <th className="text-center p-3 font-medium text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTeamMembers.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-4 text-center text-gray-500">
                            No team members selected
                          </td>
                        </tr>
                      ) : (
                        selectedTeamMembers.map((member) => (
                          <tr key={member.id} className="border-b">
                            <td className="p-3 text-gray-800">{member.name}</td>
                            <td className="p-3 text-gray-600">{member.position}</td>
                            <td className="p-3 text-center">
                              <Button variant="ghost" size="sm" onClick={() => removeTeamMember(member.id)}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Horizontal Separator */}
              <div className="border-t border-gray-200"></div>

              {/* Configure Stage Action Template */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-2">Configure Stage Action Template</h3>
                <p className="text-sm text-gray-600 mb-4">Send Email / SMS</p>
                <p className="text-xs text-gray-500 mb-6">
                  Select the template type. Generation may take up to 2 weeks due to backend processing.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Set Template Column */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Set Template</h4>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white"
                      value={stagePopupData.templateType}
                      onChange={(e) => setStagePopupData((prev) => ({ ...prev, templateType: e.target.value }))}
                    >
                      <option value="">Select Template</option>
                      <option value="Setup Panel Interview">Setup Panel Interview</option>
                      <option value="Setup One on One Interview">Setup One on One Interview</option>
                      <option value="Setup Online Interview">Setup Online Interview</option>
                      <option value="Setup Final Interview">Setup Final Interview</option>
                      <option value="None">None</option>
                    </select>
                  </div>

                  {/* Set Reminder Column */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Set Reminder</h4>
                    <div className="relative">
                      <Input
                        type="text"
                        value={stagePopupData.reminderTime}
                        readOnly
                        onClick={() => setShowTimePicker(true)}
                        className="cursor-pointer"
                        placeholder="HH:MM:SS"
                      />
                      <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={saveStageData}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowTimePicker(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Set Time</h3>

              <div className="flex items-center justify-center gap-4 mb-6">
                {/* Hours */}
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">HH</div>
                  <select
                    className="w-16 p-2 border border-gray-300 rounded text-center"
                    value={timePickerValues.hours}
                    onChange={(e) => setTimePickerValues((prev) => ({ ...prev, hours: e.target.value }))}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2">
                    <Button variant="ghost" size="sm" onClick={setCurrentTime} className="text-xs text-blue-600">
                      Now
                    </Button>
                  </div>
                </div>

                <span className="text-2xl font-bold text-gray-400">:</span>

                {/* Minutes */}
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">MM</div>
                  <select
                    className="w-16 p-2 border border-gray-300 rounded text-center"
                    value={timePickerValues.minutes}
                    onChange={(e) => setTimePickerValues((prev) => ({ ...prev, minutes: e.target.value }))}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="text-2xl font-bold text-gray-400">:</span>

                {/* Seconds */}
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">SS</div>
                  <select
                    className="w-16 p-2 border border-gray-300 rounded text-center"
                    value={timePickerValues.seconds}
                    onChange={(e) => setTimePickerValues((prev) => ({ ...prev, seconds: e.target.value }))}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, "0")}>
                        {i.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2">
                    <Button onClick={updateTime} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1">
                      OK
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Popup Modal with higher z-index */}
      {showAssessmentPopup && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAssessmentPopup(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingAssessmentId ? "Edit Assessment" : "Add Assessment"}
                </h3>
                <Button
                  onClick={() => setShowAssessmentPopup(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Assessment Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Type</label>
                <select
                  value={assessmentForm.type}
                  onChange={(e) => setAssessmentForm((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select Assessment Type</option>
                  <option value="Technical Test">Technical Test</option>
                  <option value="Personality Test">Personality Test</option>
                  <option value="Skills Assessment">Skills Assessment</option>
                  <option value="Cognitive Test">Cognitive Test</option>
                  <option value="Portfolio Review">Portfolio Review</option>
                </select>
              </div>

              {/* Assessment Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Title</label>
                <Input
                  placeholder="Enter assessment title"
                  value={assessmentForm.title}
                  onChange={(e) => setAssessmentForm((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Assessment Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter assessment description"
                  value={assessmentForm.description}
                  onChange={(e) => setAssessmentForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm h-24 resize-none"
                />
              </div>

              {/* Required Checkbox */}
              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={assessmentForm.required}
                    onChange={(e) => setAssessmentForm((prev) => ({ ...prev, required: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Required Assessment</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setShowAssessmentPopup(false)}
                  variant="outline"
                  className="px-4 py-2 border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveAssessment}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!assessmentForm.title.trim() || !assessmentForm.type}
                >
                  {editingAssessmentId ? "Update Assessment" : "Add Assessment"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question Modal for Step 5 */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAddQuestionModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingQuestionId ? "Edit Question" : "Add Question"}
                </h3>
                <Button
                  onClick={() => setShowAddQuestionModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Question */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <Input
                  placeholder="Enter your question"
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm((prev) => ({ ...prev, question: e.target.value }))}
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  placeholder="Enter question description"
                  value={questionForm.description}
                  onChange={(e) => setQuestionForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm h-20 resize-none"
                />
              </div>

              {/* Question Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                <select
                  value={questionForm.type}
                  onChange={(e) => {
                    setQuestionForm((prev) => ({
                      ...prev,
                      type: e.target.value,
                      // Reset options/nonNegotiableOptions when type changes
                      options: ["", "", "", ""],
                      nonNegotiableOptions: [],
                      nonNegotiableText: "",
                    }))
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="Checkboxes">Checkboxes</option>
                  <option value="Text Entry">Text Entry</option>
                  <option value="Paragraph">Paragraph</option> {/* Added Paragraph type */}
                  <option value="Number">Number</option>
                  <option value="Date">Date</option>
                </select>
              </div>

              {/* Mode */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                <select
                  value={questionForm.mode}
                  onChange={(e) => {
                    setQuestionForm((prev) => ({
                      ...prev,
                      mode: e.target.value,
                      // Reset non-negotiable specific fields if mode changes
                      nonNegotiableText: "",
                      nonNegotiableOptions: [],
                    }))
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Non-negotiable">Non-negotiable</option>
                  <option value="Preferred">Preferred</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>

              {/* Options for Multiple Choice and Checkboxes */}
              {(questionForm.type === "Multiple Choice" || questionForm.type === "Checkboxes") && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1">Option Value</div>
                    {questionForm.mode === "Non-negotiable" && (
                      <div className="col-span-1">Non-negotiable Requirement</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {questionForm.options.map((option, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...questionForm.options]
                            newOptions[index] = e.target.value
                            // Also update nonNegotiableOptions if this option exists
                            const newNonNegotiableOptions = [...(questionForm.nonNegotiableOptions || [])]
                            let nnOption = newNonNegotiableOptions.find((o) => o.option === option)
                            if (nnOption) {
                              nnOption.option = e.target.value // Update the option text
                            } else {
                              // If option is new, add a placeholder entry
                              newNonNegotiableOptions.push({ option: e.target.value, required: false, requiredValue: "" })
                            }
                            setQuestionForm((prev) => ({
                              ...prev,
                              options: newOptions,
                              nonNegotiableOptions: newNonNegotiableOptions,
                            }))
                          }}
                          className="flex-1"
                        />
                        {questionForm.mode === "Non-negotiable" && (
                          <div className="flex items-center gap-2 flex-1">
                            {questionForm.type === "Multiple Choice" ? (
                              <input
                                type="radio"
                                name={`non_negotiable_option_${questionForm.id}`}
                                checked={
                                  (questionForm.nonNegotiableOptions || []).find((o) => o.option === option)
                                    ?.required || false
                                }
                                onChange={(e) => {
                                  const newNonNegotiableOptions = (questionForm.nonNegotiableOptions || []).map(
                                    (o) => ({
                                      ...o,
                                      required: o.option === option ? e.target.checked : false, // Only one can be required
                                    }),
                                  )
                                  setQuestionForm((prev) => ({
                                    ...prev,
                                    nonNegotiableOptions: newNonNegotiableOptions,
                                  }))
                                }}
                                className="w-4 h-4 text-blue-600"
                              />
                            ) : (
                              <input
                                type="checkbox"
                                checked={
                                  (questionForm.nonNegotiableOptions || []).find((o) => o.option === option)
                                    ?.required || false
                                }
                                onChange={(e) => {
                                  const newNonNegotiableOptions = (questionForm.nonNegotiableOptions || []).map(
                                    (o) =>
                                      o.option === option
                                        ? { ...o, required: e.target.checked }
                                        : o,
                                  )
                                  setQuestionForm((prev) => ({
                                    ...prev,
                                    nonNegotiableOptions: newNonNegotiableOptions,
                                  }))
                                }}
                                className="w-4 h-4 text-blue-600"
                              />
                            )}
                            <Input
                              placeholder="Required Value"
                              value={
                                (questionForm.nonNegotiableOptions || []).find((o) => o.option === option)
                                  ?.requiredValue || ""
                              }
                              onChange={(e) => {
                                const newNonNegotiableOptions = (questionForm.nonNegotiableOptions || []).map(
                                  (o) =>
                                    o.option === option
                                      ? { ...o, requiredValue: e.target.value }
                                      : o,
                                )
                                setQuestionForm((prev) => ({
                                  ...prev,
                                  nonNegotiableOptions: newNonNegotiableOptions,
                                }))
                              }}
                              className="flex-1"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <Button
                      onClick={() =>
                        setQuestionForm((prev) => ({ ...prev, options: [...prev.options, ""] }))
                      }
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {/* Non-negotiable Text Input for Text Entry and Paragraph */}
              {(questionForm.type === "Text Entry" || questionForm.type === "Paragraph") &&
                questionForm.mode === "Non-negotiable" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Non-negotiable Requirement Text
                    </label>
                    <Input
                      placeholder="Enter the exact text required"
                      value={questionForm.nonNegotiableText || ""}
                      onChange={(e) => setQuestionForm((prev) => ({ ...prev, nonNegotiableText: e.target.value }))}
                    />
                  </div>
                )}

              {/* Required */}
              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={questionForm.required}
                    onChange={(e) => setQuestionForm((prev) => ({ ...prev, required: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Required Question</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setShowAddQuestionModal(false)}
                  variant="outline"
                  className="px-4 py-2 border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveQuestion}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!questionForm.question.trim()}
                >
                  {editingQuestionId ? "Update Question" : "Add Question"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Non-negotiable Modal */}
      {showNonNegotiableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowNonNegotiableModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Set Non-negotiable Values</h3>
                <Button
                  onClick={() => setShowNonNegotiableModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Set the required values for non-negotiable fields. Candidates who don't meet these criteria will be
                automatically filtered out.
              </p>

              <div className="space-y-6">
                {getNonNegotiableFields().map((field, index) => {
                  const fieldKey = `${field.category}-${field.field}`
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="mb-2">
                        <span className="text-xs text-blue-600 font-medium">{field.category}</span>
                        <h4 className="text-sm font-medium text-gray-800">{field.field}</h4>
                      </div>

                      {field.type === "text" && (
                        <Input
                          placeholder="Enter required value"
                          value={nonNegotiableValues[fieldKey] || ""}
                          onChange={(e) => handleNonNegotiableValueChange(fieldKey, e.target.value)}
                        />
                      )}

                      {field.type === "number" && (
                        <Input
                          type="number"
                          placeholder="Enter required value"
                          value={nonNegotiableValues[fieldKey] || ""}
                          onChange={(e) => handleNonNegotiableValueChange(fieldKey, e.target.value)}
                        />
                      )}

                      {field.type === "date" && (
                        <Input
                          type="date"
                          value={nonNegotiableValues[fieldKey] || ""}
                          onChange={(e) => handleNonNegotiableValueChange(fieldKey, e.target.value)}
                        />
                      )}

                      {field.type === "select" && field.options && (
                        <select
                          value={nonNegotiableValues[fieldKey] || ""}
                          onChange={(e) => handleNonNegotiableValueChange(fieldKey, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="">Select required value</option>
                          {field.options.map((option, optIndex) => (
                            <option key={optIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {field.type === "radio" && field.options && (
                        <div className="space-y-2">
                          {field.options.map((option, optIndex) => (
                            <label key={optIndex} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={fieldKey}
                                value={option}
                                checked={nonNegotiableValues[fieldKey] === option}
                                onChange={(e) => handleNonNegotiableValueChange(fieldKey, e.target.value)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {field.type === "checkbox" && field.options && (
                        <div className="space-y-2">
                          {field.options.map((option, optIndex) => (
                            <label key={optIndex} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                value={option}
                                checked={(nonNegotiableValues[fieldKey] || []).includes(option)}
                                onChange={(e) => {
                                  const currentValues = nonNegotiableValues[fieldKey] || []
                                  if (e.target.checked) {
                                    handleNonNegotiableValueChange(fieldKey, [...currentValues, option])
                                  } else {
                                    handleNonNegotiableValueChange(
                                      fieldKey,
                                      currentValues.filter((v: string) => v !== option),
                                    )
                                  }
                                }}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  onClick={() => setShowNonNegotiableModal(false)}
                  variant="outline"
                  className="px-4 py-2 border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveNonNegotiables}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save and Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Confirmation Modal */}
      {showTemplateConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleTemplateCancel} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Replace Questions?</h3>
                <Button
                  onClick={handleTemplateCancel}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                This assessment already has questions. Applying the template will replace all existing questions. Do you
                want to continue?
              </p>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={handleTemplateCancel}
                  variant="outline"
                  className="px-4 py-2 border-gray-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button onClick={handleTemplateConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white">
                  Replace Questions
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 Questionnaire Modal */}
      {showQuestionnaireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowQuestionnaireModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Add Questionnaire</h3> {/* Changed title */}
                <Button
                  onClick={() => setShowQuestionnaireModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Questionnaire Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Questionnaire Name</label>
                <Input
                  placeholder="Enter questionnaire name"
                  value={questionnaireName}
                  onChange={(e) => setQuestionnaireName(e.target.value)}
                />
              </div>

              {/* Sections */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-800">Sections</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setMoveMode(!moveMode)
                        setSelectedQuestionForMove(null)
                      }}
                      variant={moveMode ? "default" : "outline"}
                      size="sm"
                      className={moveMode ? "bg-blue-600 text-white" : ""}
                    >
                      <Move className="w-4 h-4 mr-1" />
                      {moveMode ? "Exit Move" : "Move Questions"}
                    </Button>
                    <Button
                      onClick={() => setShowSectionInput(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
                    >
                      + Add Section
                    </Button>
                  </div>
                </div>

                {/* Add Section Input */}
                {showSectionInput && (
                  <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Section name"
                        value={newSectionName}
                        onChange={(e) => setNewSectionName(e.target.value)}
                      />
                      <Button
                        onClick={() => {
                          if (newSectionName.trim()) {
                            const newSection = {
                              id: Date.now(),
                              name: newSectionName,
                              questions: [],
                            }
                            setSections([...sections, newSection])
                            setNewSectionName("")
                            setShowSectionInput(false)
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Add
                      </Button>
                      <Button onClick={() => setShowSectionInput(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Sections List */}
                <div className="space-y-4">
                  {sections.map((section) => (
                    <div key={section.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        {editingSectionId === section.id ? (
                          <Input
                            value={editingSectionName}
                            onChange={(e) => setEditingSectionName(e.target.value)}
                            className="text-lg font-medium text-gray-800 max-w-xs"
                          />
                        ) : (
                          <h5 className="font-medium text-gray-800">{section.name}</h5>
                        )}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              if (editingSectionId === section.id) {
                                // Confirm rename
                                if (editingSectionName.trim()) {
                                  setSections((prev) =>
                                    prev.map((s) =>
                                      s.id === section.id ? { ...s, name: editingSectionName } : s,
                                    ),
                                  )
                                  setEditingSectionId(null)
                                  setEditingSectionName("")
                                }
                              } else {
                                // Start rename
                                setEditingSectionId(section.id)
                                setEditingSectionName(section.name)
                              }
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
                          >
                            {editingSectionId === section.id ? "Confirm" : "Option"}
                          </Button>
                          <Button
                            onClick={() => {
                              setCurrentSectionId(section.id)
                              setShowAddQuestionModalStep3(true)
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
                          >
                            + Add Question
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSections(sections.filter((s) => s.id !== section.id))
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Questions in this section */}
                      <div className="space-y-2">
                        {section.questions.map((question, qIndex) => (
                          <div
                            key={question.id}
                            className={`border rounded-lg p-3 transition-all ${
                              moveMode
                                ? selectedQuestionForMove?.questionId === question.id
                                  ? "border-blue-500 bg-blue-50 cursor-grabbing"
                                  : "hover:border-gray-400 cursor-pointer"
                                : "hover:shadow-sm"
                            }`}
                            onClick={() => {
                              if (moveMode) {
                                if (selectedQuestionForMove?.questionId === question.id) {
                                  setSelectedQuestionForMove(null) // Deselect
                                } else if (selectedQuestionForMove) {
                                  handleMoveQuestion(section.id, question.id)
                                } else {
                                  setSelectedQuestionForMove({
                                    sectionId: section.id,
                                    questionId: question.id,
                                  })
                                }
                              }
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-800">
                                    Q{qIndex + 1}: {question.question}
                                  </span>
                                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                    {question.type}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-1 rounded ${
                                      question.mode === "Non-negotiable"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {question.mode}
                                  </span>
                                </div>
                                {question.description && (
                                  <p className="text-sm text-gray-600 mb-1">{question.description}</p>
                                )}
                                {question.type === "Multiple Choice" && (
                                  <div className="text-sm text-gray-600">
                                    Options: {question.options.filter((opt) => opt.trim() !== "").join(", ")}
                                  </div>
                                )}
                              </div>
                              {!moveMode && (
                                <div className="flex gap-1 ml-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setCurrentSectionId(section.id)
                                      setQuestionFormStep3({
                                        id: question.id, // Pass existing ID for edit
                                        question: question.question,
                                        description: question.description,
                                        type: question.type,
                                        mode: question.mode,
                                        options: question.options,
                                        parameters: question.parameters,
                                        nonNegotiableText: question.nonNegotiableText || "",
                                        nonNegotiableOptions: question.nonNegotiableOptions || [],
                                        required: question.required,
                                      })
                                      setEditingQuestionIdStep3(question.id)
                                      setShowAddQuestionModalStep3(true)
                                    }}
                                    className="p-1 h-6 w-6"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSections(
                                        sections.map((s) =>
                                          s.id === section.id
                                            ? {
                                                ...s,
                                                questions: s.questions.filter((q) => q.id !== question.id),
                                              }
                                            : s,
                                        ),
                                      )
                                    }}
                                    className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveAsNewTemplate}
                    variant="outline"
                    className="px-4 py-2 border-gray-300"
                    disabled={!questionnaireName.trim() || sections.length === 0}
                  >
                    Save as New Template
                  </Button>
                  <Button
                    onClick={handleUpdateTemplate}
                    variant="outline"
                    className="px-4 py-2 border-gray-300"
                    disabled={!isTemplateSelected || !questionnaireName.trim()}
                  >
                    Update Template
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowQuestionnaireModal(false)}
                    variant="outline"
                    className="px-4 py-2 border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowQuestionnaireModal(false)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!questionnaireName.trim()}
                  >
                    Save Questionnaire
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 Add Question Modal */}
      {showAddQuestionModalStep3 && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowAddQuestionModalStep3(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingQuestionIdStep3 ? "Edit Question" : "Add Question"}
                </h3>
                <Button
                  onClick={() => {
                    setShowAddQuestionModalStep3(false)
                    setEditingQuestionIdStep3(null)
                    setQuestionFormStep3({
                      id: 0,
                      question: "",
                      description: "",
                      type: "Multiple Choice",
                      mode: "Non-negotiable",
                      options: ["", "", "", ""],
                      parameters: [0, 0, 0, 0],
                      nonNegotiableText: "",
                      nonNegotiableOptions: [],
                      required: false,
                    })
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Question */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <Input
                  placeholder="Enter your question"
                  value={questionFormStep3.question}
                  onChange={(e) => setQuestionFormStep3((prev) => ({ ...prev, question: e.target.value }))}
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  placeholder="Enter question description"
                  value={questionFormStep3.description}
                  onChange={(e) => setQuestionFormStep3((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm h-20 resize-none"
                />
              </div>

              {/* Question Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                <select
                  value={questionFormStep3.type}
                  onChange={(e) => {
                    setQuestionFormStep3((prev) => ({
                      ...prev,
                      type: e.target.value,
                      options: ["", "", "", ""], // Reset options when type changes
                      nonNegotiableOptions: [],
                      nonNegotiableText: "",
                    }))
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="Checkboxes">Checkboxes</option>
                  <option value="Text Entry">Text Entry</option>
                  <option value="Paragraph">Paragraph</option> {/* Added Paragraph type */}
                  <option value="Number">Number</option>
                  <option value="Date">Date</option>
                </select>
              </div>

              {/* Mode */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                <select
                  value={questionFormStep3.mode}
                  onChange={(e) => {
                    setQuestionFormStep3((prev) => ({
                      ...prev,
                      mode: e.target.value,
                      nonNegotiableText: "",
                      nonNegotiableOptions: [],
                    }))
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Non-negotiable">Non-negotiable</option>
                  <option value="Preferred">Preferred</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>

              {/* Options for Multiple Choice and Checkboxes */}
              {(questionFormStep3.type === "Multiple Choice" || questionFormStep3.type === "Checkboxes") && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1">Option Value</div>
                    {questionFormStep3.mode === "Non-negotiable" && (
                      <div className="col-span-1">Non-negotiable Requirement</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {questionFormStep3.options.map((option, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...questionFormStep3.options]
                            newOptions[index] = e.target.value
                            const newNonNegotiableOptions = [...(questionFormStep3.nonNegotiableOptions || [])]
                            let nnOption = newNonNegotiableOptions.find((o) => o.option === option)
                            if (nnOption) {
                              nnOption.option = e.target.value
                            } else {
                              newNonNegotiableOptions.push({ option: e.target.value, required: false, requiredValue: "" })
                            }
                            setQuestionFormStep3((prev) => ({
                              ...prev,
                              options: newOptions,
                              nonNegotiableOptions: newNonNegotiableOptions,
                            }))
                          }}
                          className="flex-1"
                        />
                        {questionFormStep3.mode === "Non-negotiable" && (
                          <div className="flex items-center gap-2 flex-1">
                            {questionFormStep3.type === "Multiple Choice" ? (
                              <input
                                type="radio"
                                name={`non_negotiable_option_step3_${questionFormStep3.id}`}
                                checked={
                                  (questionFormStep3.nonNegotiableOptions || []).find((o) => o.option === option)
                                    ?.required || false
                                }
                                onChange={(e) => {
                                  const newNonNegotiableOptions = (
                                    questionFormStep3.nonNegotiableOptions || []
                                  ).map((o) => ({
                                    ...o,
                                    required: o.option === option ? e.target.checked : false,
                                  }))
                                  setQuestionFormStep3((prev) => ({
                                    ...prev,
                                    nonNegotiableOptions: newNonNegotiableOptions,
                                  }))
                                }}
                                className="w-4 h-4 text-blue-600"
                              />
                            ) : (
                              <input
                                type="checkbox"
                                checked={
                                  (questionFormStep3.nonNegotiableOptions || []).find((o) => o.option === option)
                                    ?.required || false
                                }
                                onChange={(e) => {
                                  const newNonNegotiableOptions = (
                                    questionFormStep3.nonNegotiableOptions || []
                                  ).map((o) =>
                                    o.option === option
                                      ? { ...o, required: e.target.checked }
                                      : o,
                                  )
                                  setQuestionFormStep3((prev) => ({
                                    ...prev,
                                    nonNegotiableOptions: newNonNegotiableOptions,
                                  }))
                                }}
                                className="w-4 h-4 text-blue-600"
                              />
                            )}
                            <Input
                              placeholder="Required Value"
                              value={
                                (questionFormStep3.nonNegotiableOptions || []).find((o) => o.option === option)
                                  ?.requiredValue || ""
                              }
                              onChange={(e) => {
                                const newNonNegotiableOptions = (
                                  questionFormStep3.nonNegotiableOptions || []
                                ).map((o) =>
                                  o.option === option
                                    ? { ...o, requiredValue: e.target.value }
                                    : o,
                                )
                                setQuestionFormStep3((prev) => ({
                                  ...prev,
                                  nonNegotiableOptions: newNonNegotiableOptions,
                                }))
                              }}
                              className="flex-1"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <Button
                      onClick={() =>
                        setQuestionFormStep3((prev) => ({ ...prev, options: [...prev.options, ""] }))
                      }
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {/* Non-negotiable Text Input for Text Entry and Paragraph */}
              {(questionFormStep3.type === "Text Entry" || questionFormStep3.type === "Paragraph") &&
                questionFormStep3.mode === "Non-negotiable" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Non-negotiable Requirement Text
                    </label>
                    <Input
                      placeholder="Enter the exact text required"
                      value={questionFormStep3.nonNegotiableText || ""}
                      onChange={(e) =>
                        setQuestionFormStep3((prev) => ({ ...prev, nonNegotiableText: e.target.value }))
                      }
                    />
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => {
                    setShowAddQuestionModalStep3(false)
                    setEditingQuestionIdStep3(null)
                    setQuestionFormStep3({
                      id: 0,
                      question: "",
                      description: "",
                      type: "Multiple Choice",
                      mode: "Non-negotiable",
                      options: ["", "", "", ""],
                      parameters: [0, 0, 0, 0],
                      nonNegotiableText: "",
                      nonNegotiableOptions: [],
                      required: false,
                    })
                  }}
                  variant="outline"
                  className="px-4 py-2 border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveQuestionStep3}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!questionFormStep3.question.trim()}
                >
                  {editingQuestionIdStep3 ? "Update Question" : "Add Question"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPreview(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Preview</h3>
                <Button
                  onClick={() => setShowPreview(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Position Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Job Title:</span>
                      <span className="text-gray-900">{formData.jobTitle || "Not specified"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Department:</span>
                      <span className="text-gray-900">{formData.department || "Not specified"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Employment Type:</span>
                      <span className="text-gray-900">{formData.employmentType}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Education Needed:</span>
                      <span className="text-gray-900">{formData.educationNeeded}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Work Setup:</span>
                      <span className="text-gray-900">{formData.workSetup}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Experience:</span>
                      <span className="text-gray-900">{formData.experience}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">No. of headcounts needed:</span>
                      <span className="text-gray-900">{formData.headcountsNeeded || "Not specified"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Date Needed:</span>
                      <span className="text-gray-900">{formData.dateNeeded || "Not specified"}</span>
                    </div>
                    <div className="flex flex-col col-span-full">
                      <span className="font-medium text-gray-700">Reason for Hire:</span>
                      <span className="text-gray-900">
                        {formData.reasonForHire === "Others, Please Specify"
                          ? `Others: ${formData.reasonSpecify}`
                          : formData.reasonForHire}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Budget From:</span>
                      <span className="text-gray-900">{formData.budgetFrom || "Not specified"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">Budget To:</span>
                      <span className="text-gray-900">{formData.budgetTo || "Not specified"}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-medium text-gray-800 mt-8 mb-4">Locations</h4>
                  {locations.length > 0 ? (
                    <div className="overflow-x-auto border rounded-lg">
                      <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-100 border-b">
                          <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Location</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Headcount</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Deployment Date</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">With Batch?</th>
                          </tr>
                        </thead>
                        <tbody>
                          {locations.map((loc) => (
                            <tr key={loc.id} className="border-t">
                              <td className="px-4 py-3 text-gray-900">{loc.location}</td>
                              <td className="px-4 py-3 text-gray-900">{loc.headcount}</td>
                              <td className="px-4 py-3 text-gray-900">{loc.deploymentDate}</td>
                              <td className="px-4 py-3 text-gray-900">{loc.withBatch ? "Yes" : "No"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No locations added.</p>
                  )}

                  <h4 className="text-lg font-medium text-gray-800 mt-8 mb-4">Batch Details</h4>
                  {batches.length > 0 ? (
                    <div className="overflow-x-auto border rounded-lg">
                      <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-100 border-b">
                          <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Batch</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Headcount</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Deployment Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batches.map((batch) => (
                            <tr key={batch.id} className="border-t">
                              <td className="px-4 py-3 text-gray-900">{batch.batch}</td>
                              <td className="px-4 py-3 text-gray-900">{batch.headcount}</td>
                              <td className="px-4 py-3 text-gray-900">{batch.deploymentDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No batches added.</p>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-800">Job Description</h4>
                  <div className="text-sm whitespace-pre-wrap border rounded-lg p-4 bg-gray-50">
                    {jobDescription || "No description provided"}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-800">Application Form Preview</h4>
                  {sections.length > 0 ? (
                    <div className="space-y-6">
                      <h5 className="font-bold text-gray-800 text-xl mb-4">
                        {questionnaireName || "Untitled Questionnaire"}
                      </h5>
                      {sections.map((section, sectionIndex) => (
                        <div key={section.id} className="space-y-6 mb-8">
                          <h6 className="font-semibold text-gray-900 text-lg">{section.name}</h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.questions.map((question, questionIndex) => {
                              // Determine if the field should be displayed
                              const formFieldStatus = formFieldConfig.personal
                                .concat(formFieldConfig.job)
                                .concat(formFieldConfig.education)
                                .concat(formFieldConfig.acknowledgement)
                                .find(
                                  (item) =>
                                    item.field === question.question &&
                                    (item.defaultValue === "disabled" || item.nonNegotiable),
                                )

                              // If it's explicitly disabled or non-negotiable from the main form config, hide it.
                              // Note: This logic might need refinement if 'mode' in question itself overrides
                              // the global formFieldConfig 'defaultValue' status. For now, prioritizing 'disabled'.
                              if (formFieldStatus && formFieldStatus.defaultValue === "disabled") {
                                return null // Do not render if disabled
                              }
                              // If question.mode is "Non-negotiable" and nonNegotiableText is empty, don't show.
                              if (question.mode === "Non-negotiable" && !question.nonNegotiableText &&
                                (question.type === "Text Entry" || question.type === "Paragraph")) {
                                return null;
                              }
                              // If question.mode is "Non-negotiable" and no nonNegotiableOptions are set for MC/Checkbox, don't show.
                              if (question.mode === "Non-negotiable" &&
                                (question.type === "Multiple Choice" || question.type === "Checkboxes") &&
                                (!question.nonNegotiableOptions || question.nonNegotiableOptions.every(opt => !opt.required))) {
                                return null;
                              }


                              const isRequired = question.required || question.mode === "Non-negotiable"
                              const isOptional = question.mode === "Optional"

                              return (
                                <div key={question.id} className="flex flex-col">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {question.question}
                                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                                    {isOptional && <span className="text-gray-500 ml-1">(Optional)</span>}
                                  </label>
                                  {question.description && (
                                    <p className="text-xs text-gray-500 mb-2">{question.description}</p>
                                  )}

                                  {/* Render input based on type, always disabled for preview */}
                                  {question.type === "Multiple Choice" && (
                                    <RadioGroup className="space-y-2">
                                      {question.options
                                        .filter((opt) => opt.trim() !== "")
                                        .map((option, optIndex) => (
                                          <div key={optIndex} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`q${question.id}-opt${optIndex}`} disabled />
                                            <Label htmlFor={`q${question.id}-opt${optIndex}`} className="text-sm font-normal">
                                              {option}
                                            </Label>
                                          </div>
                                        ))}
                                    </RadioGroup>
                                  )}

                                  {question.type === "Checkboxes" && (
                                    <div className="space-y-2">
                                      {question.options
                                        .filter((opt) => opt.trim() !== "")
                                        .map((option, optIndex) => (
                                          <div key={optIndex} className="flex items-center space-x-2">
                                            <Checkbox id={`q${question.id}-cb${optIndex}`} disabled />
                                            <Label htmlFor={`q${question.id}-cb${optIndex}`} className="text-sm font-normal">
                                              {option}
                                            </Label>
                                          </div>
                                        ))}
                                    </div>
                                  )}

                                  {question.type === "Text Entry" || question.type === "Paragraph" ? (
                                    <Input
                                      type="text"
                                      placeholder={
                                        question.type === "Text Entry" ? "Short answer" : "Long answer"
                                      }
                                      disabled
                                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    />
                                  ) : question.type === "Number" ? (
                                    <Input
                                      type="number"
                                      placeholder="Number input"
                                      disabled
                                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    />
                                  ) : question.type === "Date" ? (
                                    <Input
                                      type="date"
                                      disabled
                                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    />
                                  ) : null}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No questionnaire created yet.</p>
                  )}
                </div>
              )}

              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
