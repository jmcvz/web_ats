"use client"

import { Navbar } from "@/reusables/Navbar"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, ExternalLink, RotateCcw, Archive, Info } from "lucide-react"
import { ShareModal } from "@/components/ui/ShareModal"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"


interface BaseJobPosting {
  id: number
  title: string
  department: string
  description: string
  status?: string
  assignee?: string
  progress?: boolean[]
  link?: string
}

type JobPosting = BaseJobPosting

const baseJobPostings = [
  {
    id: 1,
    title: "Social Media Manager Posting",
    department: "Marketing",
    description:
      "We are looking for a Social Media Manager to lead our digital marketing efforts and enhance our online presence.",
  },
  {
    id: 2,
    title: "Web Developer Posting",
    department: "Information Technology",
    description:
      "We are seeking a skilled Web Developer to design, develop, and maintain high-quality websites and web applications.",
  },
  {
    id: 3,
    title: "Human Resources Coordinator Posting",
    department: "Human Resource",
    description:
      "We are looking for a Human Resource Coordinator to support the HR department in various administrative and operational tasks.",
  },
  {
    id: 4,
    title: "Marketing Specialist Posting",
    department: "Marketing",
    description:
      "We are looking for a Marketing Specialist to lead our digital marketing efforts and enhance our online presence.",
  },
  {
    id: 5,
    title: "Social Media Content Posting",
    department: "Marketing",
    description:
      "We are looking for a Social Media Content to lead our digital marketing efforts and enhance our online presence.",
  },
  {
    id: 6,
    title: "Marketing Manager Posting",
    department: "Marketing",
    description:
      "We are looking for a Marketing Manager to lead our digital marketing efforts and enhance our online presence.",
  },
]

const assignees = ["Joseph Santos", "Virla Getalado", "Daniel Jackson", "Anthony Davis", "Flynn Rider", "Choi Yeonjun"]

const getRandomProgress = () => {
  const steps = [true]
  const second = Math.random() > 0.5
  const third = Math.random() > 0.5
  steps.push(third ? true : second)
  steps.push(third)
  return steps
}

const generateJobLink = (title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
  return `https://oodc.yourcompany.com/jobs/${slug}`
}

const generatePositionsData = () => {
  return {
    drafts: baseJobPostings.map((job) => ({
      ...job,
      status: job.id === 1 ? "Reopened" : "", 
    })),

    pendings: baseJobPostings.map((job, index) => ({
      ...job,
      description: job.description + "....", 
      assignee: assignees[index],
      progress: getRandomProgress(),
    })),

    "on-hold": baseJobPostings.map((job) => ({
      ...job,
      description: job.description + "....", 
    })),

    published: baseJobPostings.map((job) => ({
      ...job,
      description: job.description + "....", 
      link: generateJobLink(job.title),
    })),

    closed: baseJobPostings.map((job) => ({
      ...job,
      status: job.id === 1 ? "Reopened" : "", 
    })),

    archive: baseJobPostings.slice(0, 3), 
  }
}

const positionsData = generatePositionsData()

const getDepartmentColor = (department: string) => {
  switch (department) {
    case "Marketing":
      return "bg-blue-100 text-blue-700"
    case "Information Technology":
      return "bg-orange-100 text-orange-700"
    case "Human Resource":
      return "bg-green-100 text-green-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const ProgressSteps = ({ progress }: { progress: boolean[] }) => {
  return (
    <div className="flex items-center mt-1">
      {progress.map((isDone, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              isDone ? "bg-blue-500 text-white" : "border border-gray-400 bg-white text-gray-400"
            }`}
          >
            {isDone ? "✓" : ""}
          </div>
          {i < progress.length - 1 && (
            <div className={`-ml-[2px] w-12 h-0.5 ${progress[i] && progress[i + 1] ? "bg-blue-500" : "bg-gray-300"}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Positions() {
  const navigate = useNavigate()
  const { tab } = useParams()

  const getCurrentTab = () => {
    const path = window.location.pathname
    const tabFromPath = path.split("/positions/")[1] || "drafts"
    return tabFromPath
  }

  const [currentTab, setCurrentTab] = useState(getCurrentTab())
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [shareOpen, setShareOpen] = useState(false)
  const [selectedLink, setSelectedLink] = useState("")
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    const newTab = getCurrentTab()
    setCurrentTab(newTab)
    document.title = `Positions | ${newTab.charAt(0).toUpperCase() + newTab.slice(1).replace("-", " ")}`
  }, [currentTab]) 

  const handleTabChange = (value: string) => {
    setCurrentTab(value)
    navigate(`/positions/${value}`)
    setSelected([])
    document.title = `Positions | ${value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ")}`
  }

  const currentData: JobPosting[] = positionsData[currentTab as keyof typeof positionsData] || []

  const filteredPostings = currentData.filter((posting: JobPosting) =>
    posting.title.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelectAllToggle = () => {
    if (selected.length === filteredPostings.length) {
      setSelected([])
    } else {
      setSelected(filteredPostings.map((_, idx) => idx))
    }
  }

  const handleShareClick = (link: string) => {
    setSelectedLink(link)
    setShareOpen(true)
  }

  const renderActionButton = (posting: JobPosting) => {
    switch (currentTab) {
      case "drafts":
        return (
          <Button variant="ghost" size="sm" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        )
      case "on-hold":
        return (
          <a className="text-sm text-blue-600 hover:underline mt-1" href="#">
            Open position
          </a>
        )
      case "published":
        return (
          <div
            className="flex items-center gap-2 text-green-600 font-medium text-sm cursor-pointer"
            onClick={() => posting.link && handleShareClick(posting.link)}
          >
            Published
            <ExternalLink className="w-4 h-4 text-gray-500 hover:text-blue-600" />
          </div>
        )
      case "closed":
        return (
          <Button variant="ghost" size="sm" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        )
      case "archive":
        return (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-blue-600 text-sm flex items-center gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            Restore
          </Button>
        )
      default:
        return null
    }
  }

  const renderRightContent = (posting: JobPosting) => {
    if (currentTab === "pendings" && posting.assignee && posting.progress) {
      return (
        <div className="flex flex-col items-end min-w-[150px] text-sm text-gray-500">
          <span>{posting.assignee}</span>
          <ProgressSteps progress={posting.progress} />
        </div>
      )
    }
    return renderActionButton(posting)
  }

  const showSelect =
    currentTab === "drafts" ||
    currentTab === "pendings" ||
    currentTab === "on-hold" ||
    currentTab === "published" ||
    currentTab === "closed"
  const showCheckboxes = currentTab === "closed"

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Positions</h1>

          {/* Filters */}
          <div className="flex flex-wrap justify-between gap-2">
            <Input
              placeholder="Search"
              className="w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
              <select className="border p-2 rounded text-sm w-full sm:w-auto">
                <option>All Offices</option>
              </select>
              <select className="border p-2 rounded text-sm w-full sm:w-auto">
                <option>All Departments</option>
              </select>
              <select className="border p-2 rounded text-sm w-full sm:w-auto">
                <option>All Employment Type</option>
              </select>
              <Button variant="outline" className="w-full sm:w-auto">
                + File Request
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-between items-center border-b pb-2">
            <Tabs value={currentTab} onValueChange={handleTabChange} className="flex-1">
              <TabsList className="flex gap-6 border-b-0 bg-transparent">
                {["drafts", "pendings", "on-hold", "published", "closed", "archive"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="relative px-2 pb-2 text-sm font-medium text-gray-500 data-[state=active]:text-blue-600"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", "-")}
                    <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-blue-600 scale-x-0 data-[state=active]:scale-x-100 transition-transform origin-left" />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Select Controls */}
            {showSelect && (
              <div className="flex items-center gap-3 ml-4">
                <label className="flex items-center gap-1 text-sm text-gray-700 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.length === filteredPostings.length}
                    onChange={handleSelectAllToggle}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span>Select</span>
                </label>

                {currentTab === "closed" && selected.length > 0 && (
                  <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                      <button
                        className="p-2 rounded border hover:bg-gray-100 transition text-gray-600"
                        aria-label="Archive"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-sm font-medium flex items-center gap-2 text-gray-800">
                          <Info className="text-blue-600 w-4 h-4" /> Archive Item
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-600">
                          This will be moved to your archives. You can restore it later if needed.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="text-sm text-gray-800 mt-4">Archive now?</div>
                      <DialogFooter className="mt-4 flex justify-end gap-2">
                        <button onClick={() => setShowDialog(false)} className="text-sm text-gray-600 hover:underline">
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setSelected([])
                            setShowDialog(false)
                          }}
                          className="text-sm text-blue-600 font-medium hover:underline"
                        >
                          Confirm
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </div>

          {/* Postings */}
          <div className="space-y-2">
            {filteredPostings.map((posting: JobPosting, idx: number) => (
              <Card key={posting.id} className="p-4 shadow-sm hover:shadow-md transition border rounded-md">
                <div className="flex justify-between items-start">
                  <div className={`flex items-start ${showCheckboxes ? "gap-4" : ""}`}>
                    {showCheckboxes && (
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 accent-blue-600"
                        checked={selected.includes(idx)}
                        onChange={() =>
                          setSelected((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]))
                        }
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-semibold text-gray-800">{posting.title}</h3>
                        <Badge variant="secondary" className={`${getDepartmentColor(posting.department)} text-xs`}>
                          {posting.department}
                        </Badge>
                        {posting.status && (
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">{posting.status}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {posting.description.length > 100
                          ? posting.description.slice(0, 100) + "..."
                          : posting.description}
                      </p>
                    </div>
                  </div>
                  {renderRightContent(posting)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ShareModal open={shareOpen} onOpenChange={setShareOpen} link={selectedLink} />
    </>
  )
}
