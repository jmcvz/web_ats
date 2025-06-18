"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  MapPin,
  Users,
  Clock,
  Grid3X3,
  List,
  Maximize2,
  Star,
} from "lucide-react"

import { Navbar } from "@/reusables/Navbar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ----------------------
// Interfaces
// ----------------------

interface Applicant {
  id: string
  name: string
  time: string
  avatar?: string
  rating: number
}

interface StageColumnProps {
  title: string
  id: string
  applicants: Applicant[]
  count: number
}

interface ApplicantCardProps {
  id: string
  name: string
  time: string
  avatar?: string
  rating: number
  isDragging?: boolean
}

interface SidebarCandidate {
  id: string
  name: string
  title: string
  avatar: string
  stage: number
  stageColor: "orange" | "red" | "green"
  timeAgo: string
}

interface DayObject {
  day: number
  isCurrentMonth: boolean
  isToday: boolean
}

interface WeekDayObject {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isToday: boolean
  fullDate: Date
}

// ----------------------
// ApplicantCard Component
// ----------------------

function ApplicantCard({ id, name, time, avatar, rating, isDragging = false }: ApplicantCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: sortableIsDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 150ms ease",
    opacity: sortableIsDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white p-3 rounded-lg border mb-2 cursor-move
        hover:shadow-md transition-all duration-200
        ${isDragging ? "rotate-1 shadow-lg" : ""}
        ${sortableIsDragging ? "z-50" : ""}
      `}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar || "/placeholder.svg?height=32&width=32"} alt={name} />
          <AvatarFallback className="text-xs">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-gray-900 truncate">{name}</p>
          <div className="flex items-center gap-1 mt-1">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{time}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ----------------------
// DroppableColumn Component
// ----------------------

function DroppableColumn({ title, id, applicants, count }: StageColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div className="w-full sm:w-[320px]">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">{title}</h3>
          <Badge variant="secondary" className="text-xs">
            {count}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Maximize2 className="h-3 w-3" />
        </Button>
      </div>

      <div
        ref={setNodeRef}
        className={`
          border rounded-lg min-h-[400px] p-3 transition-colors duration-200
          ${isOver ? "bg-blue-50 border-blue-300" : "bg-gray-50"}
        `}
      >
        <SortableContext items={applicants.map((a) => a.id)} strategy={verticalListSortingStrategy}>
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} {...applicant} />
          ))}
        </SortableContext>
        {applicants.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">Drop applicants here</div>
        )}
      </div>
    </div>
  )
}

// ----------------------
// Calendar Component
// ----------------------

function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1)) // February 2025
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const getDaysInMonth = (date: Date): DayObject[] => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Adjust for Monday start

    const days: DayObject[] = []

    // Previous month days
    const prevMonth = new Date(year, month - 1, 0)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
      })
    }

    // Current month days
    const today = new Date()
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
      })
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
      })
    }

    return days
  }

  const getCurrentWeek = (date: Date): WeekDayObject[] => {
    // Use the passed date instead of always using today
    const referenceDate = new Date(date)
    const dayOfWeek = (referenceDate.getDay() + 6) % 7 // Adjust for Monday start
    const currentWeekStart = new Date(referenceDate)
    currentWeekStart.setDate(referenceDate.getDate() - dayOfWeek)

    const today = new Date()
    const weekDays: WeekDayObject[] = []

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart)
      day.setDate(currentWeekStart.getDate() + i)

      weekDays.push({
        day: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear(),
        isCurrentMonth: day.getMonth() === referenceDate.getMonth(),
        isToday: day.toDateString() === today.toDateString(),
        fullDate: new Date(day),
      })
    }

    return weekDays
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (viewMode === "weekly") {
        // Navigate by week
        if (direction === "prev") {
          newDate.setDate(prev.getDate() - 7)
        } else {
          newDate.setDate(prev.getDate() + 7)
        }
      } else {
        // Navigate by month
        if (direction === "prev") {
          newDate.setMonth(prev.getMonth() - 1)
        } else {
          newDate.setMonth(prev.getMonth() + 1)
        }
      }
      return newDate
    })
  }

  return (
    <div className="bg-white rounded-lg border p-4">
      {/* View Toggle */}
      <div className="flex gap-1 mb-4">
        <Button
          variant={viewMode === "weekly" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("weekly")}
          className="text-xs"
        >
          Weekly
        </Button>
        <Button
          variant={viewMode === "monthly" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("monthly")}
          className="text-xs"
        >
          Monthly
        </Button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === "weekly" ? (
        <div className="space-y-2">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {getCurrentWeek(currentDate).map((day, index) => (
              <div
                key={index}
                className={`
                  text-center text-sm p-2 cursor-pointer rounded hover:bg-gray-100
                  ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                  ${day.isToday ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
                `}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
          {getDaysInMonth(currentDate).map((day, index) => (
            <div
              key={index}
              className={`
                text-center text-sm p-2 cursor-pointer rounded hover:bg-gray-100
                ${day.isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                ${day.isToday ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
              `}
            >
              {day.day}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ----------------------
// Sidebar Component
// ----------------------

function Sidebar() {
  const candidates: SidebarCandidate[] = [
    {
      id: "c1",
      name: "Jane Cruise",
      title: "Senior frontend developer",
      avatar: "/placeholder.svg?height=40&width=40",
      stage: 3,
      stageColor: "orange",
      timeAgo: "5d ago",
    },
    {
      id: "c2",
      name: "Green William",
      title: "UI/UX designer & developer",
      avatar: "/placeholder.svg?height=40&width=40",
      stage: 3,
      stageColor: "red",
      timeAgo: "4h ago",
    },
    {
      id: "c3",
      name: "Daniel Goldberg",
      title: "Magna lorem consectetur",
      avatar: "/placeholder.svg?height=40&width=40",
      stage: 1,
      stageColor: "green",
      timeAgo: "1 day ago",
    },
  ]

  const getStageColorClass = (color: "orange" | "red" | "green") => {
    switch (color) {
      case "orange":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "red":
        return "bg-red-100 text-red-800 border-red-200"
      case "green":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 pt-[100px] space-y-4">
      <MiniCalendar />

      {/* Filters */}
      <div className="flex gap-2">
        <Select defaultValue="stage-01">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stage-01">Stage: 01</SelectItem>
            <SelectItem value="stage-02">Stage: 02</SelectItem>
            <SelectItem value="stage-03">Stage: 03</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="today">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Candidates List */}
      <div className="space-y-3">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50">
            <Avatar className="h-10 w-10">
              <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
              <AvatarFallback>{candidate.name.split(" ").map((n) => n[0])}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{candidate.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{candidate.title}</p>
                  <Badge variant="outline" className={`text-xs ${getStageColorClass(candidate.stageColor)}`}>
                    Stage {candidate.stage}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">{candidate.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ----------------------
// Main Component
// ----------------------

export default function LeadDeveloperWeekly() {
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentStage, setCurrentStage] = useState("stage1")

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Stage 1 Data
  const [stage1Columns, setStage1Columns] = useState<{
    [key: string]: Applicant[]
  }>({
    "resume-screening": [
      { id: "1", name: "Rosa Bumbay", time: "1h ago", rating: 0 },
      { id: "2", name: "Maria Batumbakal", time: "1h ago", rating: 0 },
      { id: "5", name: "Jhonny Bravo", time: "3h ago", rating: 0 },
      { id: "6", name: "RJ Oremimo", time: "Dec 3", rating: 0 },
      { id: "7", name: "Sung Jin Woo", time: "Dec 1", rating: 0 },
    ],
    "phone-call": [
      { id: "3", name: "Joseph Adams", time: "7h ago", rating: 0 },
      { id: "8", name: "Brian Martinez", time: "1d ago", rating: 0 },
      { id: "9", name: "Sarah Johnson", time: "Nov 30", rating: 0 },
      { id: "10", name: "Sarah Davis", time: "Nov 28", rating: 0 },
    ],
    shortlisted: [
      { id: "4", name: "Joseph Adams", time: "2d ago", rating: 0 },
      { id: "11", name: "Brian Martinez", time: "Nov 29", rating: 0 },
      { id: "12", name: "Sarah Johnson", time: "Nov 30", rating: 0 },
      { id: "13", name: "Sarah Davis", time: "Nov 28", rating: 0 },
    ],
  })

  // Stage 2 Data
  const [stage2Columns, setStage2Columns] = useState<{
    [key: string]: Applicant[]
  }>({
    "initial-interview": [
      { id: "s2-1", name: "Joseph Santos", time: "1h ago", rating: 0 },
      { id: "s2-2", name: "Virla Getalado", time: "1h ago", rating: 0 },
    ],
    assessment: [{ id: "s2-3", name: "Kyle Maybury", time: "1h ago", rating: 0 }],
    "final-interview": [
      { id: "s2-4", name: "Joseph Adams", time: "7h ago", rating: 0 },
      { id: "s2-5", name: "Brian Martinez", time: "5h ago", rating: 0 },
      { id: "s2-6", name: "Sarah Johnson", time: "Nov 30", rating: 0 },
      { id: "s2-7", name: "Sarah Davis", time: "Nov 28", rating: 0 },
    ],
  })

  // Stage 3 Data
  const [stage3Columns, setStage3Columns] = useState<{
    [key: string]: Applicant[]
  }>({
    "job-offer": [
      { id: "s3-1", name: "Kyle Maybury", time: "1h ago", rating: 0 },
      { id: "s3-2", name: "Clara Lopez", time: "1h ago", rating: 0 },
      { id: "s3-3", name: "John Clark", time: "4h ago", rating: 0 },
      { id: "s3-4", name: "John Clark", time: "Dec 5", rating: 0 },
      { id: "s3-5", name: "Brian Harris", time: "Dec 1", rating: 0 },
    ],
    "job-offer-finalization": [
      { id: "s3-6", name: "Kyle Maybury", time: "1h ago", rating: 0 },
      { id: "s3-7", name: "Clara Lopez", time: "1h ago", rating: 0 },
      { id: "s3-8", name: "John Clark", time: "4h ago", rating: 0 },
    ],
    onboarding: [
      { id: "s3-9", name: "Joseph Adams", time: "7h ago", rating: 0 },
      { id: "s3-10", name: "Brian Martinez", time: "5h ago", rating: 0 },
      { id: "s3-11", name: "Sarah Johnson", time: "Nov 30", rating: 0 },
      { id: "s3-12", name: "Sarah Davis", time: "Nov 28", rating: 0 },
    ],
    warm: [
      { id: "s3-13", name: "Christian Edwards", time: "1h ago", rating: 0 },
      { id: "s3-14", name: "Clara Lopez", time: "1h ago", rating: 0 },
      { id: "s3-15", name: "John Clark", time: "4h ago", rating: 0 },
    ],
    failed: [
      { id: "s3-16", name: "Joseph Adams", time: "1h ago", rating: 0 },
      { id: "s3-17", name: "Brian Martinez", time: "3h ago", rating: 0 },
      { id: "s3-18", name: "Sarah Johnson", time: "Nov 30", rating: 0 },
    ],
  })

  useEffect(() => {
    document.title = "Applicants"
  }, [])

  const getCurrentColumns = () => {
    switch (currentStage) {
      case "stage1":
        return stage1Columns
      case "stage2":
        return stage2Columns
      case "stage3":
        return stage3Columns
      default:
        return stage1Columns
    }
  }

  const setCurrentColumns = (columns: { [key: string]: Applicant[] }) => {
    switch (currentStage) {
      case "stage1":
        setStage1Columns(columns)
        break
      case "stage2":
        setStage2Columns(columns)
        break
      case "stage3":
        setStage3Columns(columns)
        break
    }
  }

  const findContainer = (id: string) => {
    const columns = getCurrentColumns()
    if (id in columns) {
      return id
    }

    return Object.keys(columns).find((key) => columns[key].find((item) => item.id === id))
  }

  const getActiveApplicant = () => {
    if (!activeId) return null

    const columns = getCurrentColumns()
    for (const items of Object.values(columns)) {
      const applicant = items.find((item) => item.id === activeId)
      if (applicant) return applicant
    }
    return null
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer) return

    if (activeContainer === overContainer) return

    const columns = getCurrentColumns()
    const activeItems = columns[activeContainer]
    const overItems = columns[overContainer]

    const activeIndex = activeItems.findIndex((item) => item.id === activeId)
    const activeItem = activeItems[activeIndex]

    if (!activeItem) return

    setCurrentColumns({
      ...columns,
      [activeContainer]: activeItems.filter((item) => item.id !== activeId),
      [overContainer]: [...overItems, activeItem],
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer) return

    if (activeContainer === overContainer) {
      const columns = getCurrentColumns()
      const items = columns[activeContainer]
      const oldIndex = items.findIndex((item) => item.id === activeId)
      const newIndex = items.findIndex((item) => item.id === overId)

      if (oldIndex !== newIndex) {
        const newItems = [...items]
        const [removed] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, removed)

        setCurrentColumns({
          ...columns,
          [activeContainer]: newItems,
        })
      }
    }
  }

  const activeApplicant = getActiveApplicant()
  const columns = getCurrentColumns()
  const totalApplicants = Object.values(columns).reduce((sum, col) => sum + col.length, 0)

  const getStageTitle = () => {
    switch (currentStage) {
      case "stage1":
        return "STAGE 01 - HR Interview"
      case "stage2":
        return "STAGE 02 - Hiring Manager/Client"
      case "stage3":
        return "STAGE 03"
      default:
        return "STAGE 01 - HR Interview"
    }
  }

  const getStageColumns = () => {
    switch (currentStage) {
      case "stage1":
        return [
          { title: "Resume Screening", id: "resume-screening" },
          { title: "Phone-Call Interview", id: "phone-call" },
          { title: "Shortlisted", id: "shortlisted" },
        ]
      case "stage2":
        return [
          { title: "Initial Interview", id: "initial-interview" },
          { title: "Assessment", id: "assessment" },
          { title: "Final Interview", id: "final-interview" },
        ]
      case "stage3":
        return [
          { title: "For Job Offer", id: "job-offer" },
          { title: "Job Offer & Finalization", id: "job-offer-finalization" },
          { title: "Onboarding", id: "onboarding" },
          { title: "Warm", id: "warm" },
          { title: "Failed", id: "failed" },
        ]
      default:
        return []
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex">
        {/* Main Content */}
        <div className="flex-1 p-6 pt-[100px]">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">Lead Developer</h2>
                <Select defaultValue="active">
                  <SelectTrigger className="w-auto min-w-[80px] bg-green-100 text-green-800 border-green-300 hover:bg-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Details */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Full time</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Dec 9</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Onsite</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Total applicant: {totalApplicants}</span>
              </div>
            </div>

            {/* Stage Tabs */}
            <Tabs value={currentStage} onValueChange={setCurrentStage} className="w-full">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-auto grid-cols-3">
                  <TabsTrigger value="stage1">Stage 01</TabsTrigger>
                  <TabsTrigger value="stage2">Stage 02</TabsTrigger>
                  <TabsTrigger value="stage3">Stage 03</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stage Header */}
              <div className="mt-4">
                <h2 className="text-3xl font-bold text-gray-900">{getStageTitle()}</h2>
              </div>

              <TabsContent value={currentStage} className="mt-6">
                {/* Drag and Drop Columns */}
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex gap-6 overflow-x-auto pb-4">
                    {getStageColumns().map((column) => (
                      <DroppableColumn
                        key={column.id}
                        title={column.title}
                        id={column.id}
                        applicants={columns[column.id] || []}
                        count={(columns[column.id] || []).length}
                      />
                    ))}
                  </div>

                  <DragOverlay>
                    {activeApplicant ? <ApplicantCard {...activeApplicant} isDragging={true} /> : null}
                  </DragOverlay>
                </DndContext>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar */}
        <Sidebar />
      </div>
    </>
  )
}
