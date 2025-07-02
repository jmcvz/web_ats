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
import { User, Users2 } from "lucide-react"

interface BaseJobPosting {
  id: number
  title: string
  department: string
  description: string
  status?: string
  assignee?: string
  progress?: { completed: number; total: number }
  link?: string
}

type JobPosting = BaseJobPosting

// Dummy data (different data per tab)
const jobData = {
  drafts: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      description:
        "We are seeking an experienced Frontend Developer to join our engineering team and build cutting-edge user interfaces.",
      status: "Reopened",
    },
    {
      id: 2,
      title: "Product Marketing Manager",
      department: "Marketing",
      description:
        "Looking for a strategic Product Marketing Manager to drive go-to-market initiatives and product positioning.",
    },
    {
      id: 3,
      title: "Data Scientist",
      department: "Analytics",
      description:
        "Join our analytics team to extract insights from complex datasets and drive data-driven decision making.",
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "Design",
      description:
        "We need a creative UX/UI Designer to craft intuitive and beautiful user experiences for our products.",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      description: "Seeking a DevOps Engineer to optimize our infrastructure and streamline deployment processes.",
    },
    {
      id: 6,
      title: "Business Analyst",
      department: "Operations",
      description: "Business Analyst to bridge the gap between business requirements and technical solutions.",
    },
    {
      id: 7,
      title: "Security Engineer",
      department: "Engineering",
      description: "Cybersecurity expert to protect our systems and implement security best practices.",
    },
  ],

  pendings: [
    {
      id: 11,
      title: "Sales Development Representative",
      department: "Sales",
      description:
        "Energetic SDR needed to generate leads and build our sales pipeline through outbound prospecting....",
    },
    {
      id: 12,
      title: "Customer Success Manager",
      department: "Customer Success",
      description: "Join our customer success team to ensure client satisfaction and drive account growth....",
    },
    {
      id: 13,
      title: "Backend Engineer",
      department: "Engineering",
      description: "We're looking for a skilled Backend Engineer to build scalable APIs and microservices....",
    },
    {
      id: 14,
      title: "Content Marketing Specialist",
      department: "Marketing",
      description: "Creative content marketer needed to develop engaging content across multiple channels....",
    },
    {
      id: 15,
      title: "Financial Analyst",
      department: "Finance",
      description: "Detail-oriented Financial Analyst to support budgeting, forecasting, and financial reporting....",
    },
    {
      id: 16,
      title: "HR Business Partner",
      department: "Human Resources",
      description: "Strategic HR Business Partner to support organizational development and employee relations....",
    },
    {
      id: 17,
      title: "Machine Learning Engineer",
      department: "Analytics",
      description: "ML Engineer to develop and deploy machine learning models for our AI-powered features....",
    },
    {
      id: 18,
      title: "Partnership Manager",
      department: "Business Development",
      description: "Partnership Manager to identify and develop strategic alliances and business partnerships....",
    },
  ],

  "on-hold": [
    {
      id: 21,
      title: "Mobile App Developer",
      department: "Engineering",
      description: "iOS/Android developer to build native mobile applications for our growing user base....",
    },
    {
      id: 22,
      title: "Brand Manager",
      department: "Marketing",
      description:
        "Brand Manager to oversee brand strategy and maintain consistent messaging across all touchpoints....",
    },
    {
      id: 23,
      title: "Quality Assurance Engineer",
      department: "Engineering",
      description: "QA Engineer to ensure product quality through comprehensive testing and automation....",
    },
    {
      id: 24,
      title: "Operations Manager",
      department: "Operations",
      description:
        "Operations Manager to streamline processes and improve operational efficiency across departments....",
    },
    {
      id: 25,
      title: "Legal Counsel",
      department: "Legal",
      description: "In-house Legal Counsel to handle contracts, compliance, and corporate legal matters....",
    },
    {
      id: 26,
      title: "Research Scientist",
      department: "R&D",
      description: "Research Scientist to lead innovative research projects and explore new technologies....",
    },
  ],

  published: [
    {
      id: 31,
      title: "Account Executive",
      department: "Sales",
      description: "Experienced Account Executive to manage enterprise client relationships and close deals....",
    },
    {
      id: 32,
      title: "Software Engineer",
      department: "Engineering",
      description: "Full-stack Software Engineer to work on our core platform and new feature development....",
    },
    {
      id: 33,
      title: "Digital Marketing Manager",
      department: "Marketing",
      description: "Digital Marketing Manager to lead our online marketing efforts and campaign optimization....",
    },
    {
      id: 34,
      title: "Product Manager",
      department: "Product",
      description: "Product Manager to define product roadmap and work closely with engineering and design teams....",
    },
    {
      id: 35,
      title: "Technical Writer",
      department: "Documentation",
      description: "Technical Writer to create clear documentation and user guides for our products and APIs....",
    },
    {
      id: 36,
      title: "Site Reliability Engineer",
      department: "Engineering",
      description: "SRE to ensure system reliability, performance monitoring, and incident response....",
    },
    {
      id: 37,
      title: "Growth Marketing Manager",
      department: "Marketing",
      description: "Growth Marketing Manager to drive user acquisition and retention through data-driven campaigns....",
    },
    {
      id: 38,
      title: "Solutions Architect",
      department: "Engineering",
      description: "Solutions Architect to design scalable system architectures for enterprise clients....",
    },
  ],

  closed: [
    {
      id: 41,
      title: "Marketing Coordinator",
      department: "Marketing",
      description: "Entry-level Marketing Coordinator to support marketing campaigns and event coordination.",
      status: "Reopened",
    },
    {
      id: 42,
      title: "Junior Developer",
      department: "Engineering",
      description: "Junior Developer position for recent graduates to start their career in software development.",
    },
    {
      id: 43,
      title: "Sales Intern",
      department: "Sales",
      description: "Summer internship opportunity in sales to gain hands-on experience in B2B sales.",
    },
    {
      id: 44,
      title: "Graphic Designer",
      department: "Design",
      description: "Graphic Designer to create visual assets for marketing materials and digital campaigns.",
    },
    {
      id: 45,
      title: "Administrative Assistant",
      department: "Operations",
      description: "Administrative Assistant to provide executive support and manage office operations.",
    },
    {
      id: 46,
      title: "Social Media Manager",
      department: "Marketing",
      description: "Social Media Manager to manage our social media presence and community engagement.",
    },
    {
      id: 47,
      title: "IT Support Specialist",
      department: "IT",
      description: "IT Support Specialist to provide technical support and maintain office technology systems.",
    },
  ],

  archive: [
    {
      id: 51,
      title: "Legacy System Administrator",
      department: "IT",
      description:
        "System Administrator role for maintaining legacy infrastructure (position archived due to system migration).",
    },
    {
      id: 52,
      title: "Regional Sales Manager",
      department: "Sales",
      description: "Regional Sales Manager position for European market expansion (archived due to strategy change).",
    },
    {
      id: 53,
      title: "Print Marketing Specialist",
      department: "Marketing",
      description: "Specialist for traditional print marketing campaigns (archived due to digital-first strategy).",
    },
    {
      id: 54,
      title: "Flash Developer",
      department: "Engineering",
      description: "Flash Developer for interactive web content (archived due to technology deprecation).",
    },
    {
      id: 55,
      title: "Telemarketing Representative",
      department: "Sales",
      description: "Telemarketing role for cold calling campaigns (archived due to strategy pivot).",
    },
  ],
}

// Interviewers for pending jobs
const assignees = ["Joseph Santos", "Virla Getalado", "Choi Beomgyu", "Kang Taehyun", "Flynn Rider", "Choi Yeonjun"]

const getRandomProgress = () => {
  // Generate a random total number of interviews (1 to 5)
  const totalSteps = Math.floor(Math.random() * 5) + 1

  // Generate a random completion level (0 to totalSteps completed)
  const completedSteps = Math.floor(Math.random() * (totalSteps + 1))

  return { completed: completedSteps, total: totalSteps }
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
    drafts: jobData.drafts,

    pendings: jobData.pendings.map((job, index) => ({
      ...job,
      assignee: assignees[index % assignees.length],
      progress: getRandomProgress(),
    })),

    "on-hold": jobData["on-hold"],

    published: jobData.published.map((job) => ({
      ...job,
      link: generateJobLink(job.title),
    })),

    closed: jobData.closed,

    archive: jobData.archive,
  }
}

const positionsData = generatePositionsData()

const getDepartmentColor = (department: string) => {
  switch (department) {
    case "Marketing":
      return "bg-blue-100 text-blue-700"
    case "Engineering":
      return "bg-purple-100 text-purple-700"
    case "Sales":
      return "bg-green-100 text-green-700"
    case "Design":
      return "bg-pink-100 text-pink-700"
    case "Analytics":
      return "bg-orange-100 text-orange-700"
    case "Customer Success":
      return "bg-teal-100 text-teal-700"
    case "Finance":
      return "bg-yellow-100 text-yellow-700"
    case "Human Resources":
      return "bg-indigo-100 text-indigo-700"
    case "Operations":
      return "bg-gray-100 text-gray-700"
    case "Product":
      return "bg-red-100 text-red-700"
    case "Documentation":
      return "bg-cyan-100 text-cyan-700"
    case "IT":
      return "bg-slate-100 text-slate-700"
    case "Business Development":
      return "bg-emerald-100 text-emerald-700"
    case "Legal":
      return "bg-amber-100 text-amber-700"
    case "R&D":
      return "bg-violet-100 text-violet-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const ProgressBar = ({ progress, assignee }: { progress: { completed: number; total: number }; assignee: string }) => {
  // Colors for each interview
  const segmentColors = [
    "bg-red-500", // Step 1
    "bg-orange-500", // Step 2
    "bg-yellow-500", // Step 3
    "bg-green-500", // Step 4
    "bg-blue-500", // Step 5
  ]

  // Use actual total for number of interview
  const numberOfSegments = progress.total

  // Fixed total width for all progress bars
  const totalWidth = 90 // pixels
  const segmentWidth = Math.floor(totalWidth / numberOfSegments)

  // Find the index of the last completed segment for hover functionality
  const lastCompletedIndex = progress.completed > 0 ? progress.completed - 1 : -1

  return (
    <div className="flex flex-col items-end gap-1 mt-1">
      <span className="text-xs text-gray-500 font-medium">
        {progress.completed}/{progress.total} completed
      </span>
      <div className="flex bg-gray-200 rounded-full p-1 shadow-inner" style={{ width: `${totalWidth}px` }}>
        {Array.from({ length: numberOfSegments }, (_, index) => (
          <div
            key={index}
            className={`relative h-3 ${index < progress.completed ? segmentColors[index] : "bg-gray-300"} ${
              index === 0 ? "rounded-l-full" : index === numberOfSegments - 1 ? "rounded-r-full" : ""
            } ${index > 0 ? "ml-0.5" : ""} transition-all duration-300 ease-in-out ${
              index === lastCompletedIndex && index < progress.completed ? "group cursor-pointer" : ""
            }`}
            style={{ width: `${segmentWidth - (index > 0 ? 2 : 0)}px` }}
          >
            {/* Hover effect on the last accomplished interview */}
            {index === lastCompletedIndex && index < progress.completed && (
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                {assignee}
                <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Positions() {
  const navigate = useNavigate()
  const { tab } = useParams()

  // Get current tab from URL path or default to 'drafts'
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

  // Update current tab when URL changes
  useEffect(() => {
    const newTab = getCurrentTab()
    setCurrentTab(newTab)
    document.title = `Positions | ${newTab.charAt(0).toUpperCase() + newTab.slice(1).replace("-", " ")}`
  }, [currentTab]) // Add currentTab as dependency

  const handleTabChange = (value: string) => {
    setCurrentTab(value)
    navigate(`/positions/${value}`)
    setSelected([])
    // Update document title
    document.title = `Positions | ${value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ")}`
  }

  const currentData: JobPosting[] = positionsData[currentTab as keyof typeof positionsData] || []

  const filteredPostings = currentData.filter((posting: JobPosting) =>
    posting.title.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelectAllToggle = () => {
    if (selected.length === filteredPostings.length && filteredPostings.length > 0) {
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
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            onClick={() => navigate("/positions/create-new-position")}
          >
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
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            onClick={() => navigate("/positions/create-new-position")}
          >
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
          <ProgressBar progress={posting.progress} assignee={posting.assignee} />
        </div>
      )
    }
    return renderActionButton(posting)
  }

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
              <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="w-full sm:w-auto">
      + File Request
    </Button>
  </DialogTrigger>
  <DialogContent className="text-center">
    <DialogHeader>
      <DialogTitle className="text-blue-700 text-sm font-semibold">
        SELECT REQUISITION FORM
      </DialogTitle>
    </DialogHeader>

    <div className="flex justify-center gap-12 mt-6">
      {/* Internal Hiring */}
      <div
        className="flex flex-col items-center space-y-2 cursor-pointer"
        onClick={() => navigate("/prf")}
      >
        <div className="w-16 h-16 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <span className="text-sm text-blue-500 font-medium">Internal Hiring</span>
      </div>

      {/* Client */}
      <div className="flex flex-col items-center space-y-2 cursor-pointer">
        <div className="w-16 h-16 rounded-full border border-gray-400 text-gray-500 flex items-center justify-center">
          <Users2 className="w-6 h-6" />
        </div>
        <span className="text-sm text-gray-500 font-medium">Client</span>
      </div>
    </div>
  </DialogContent>
</Dialog>


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
            <div className="flex items-center gap-3 ml-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.length === filteredPostings.length && filteredPostings.length > 0}
                  onChange={handleSelectAllToggle}
                  className="w-4 h-4 bg-white border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-blue-600 checked:after:text-xs checked:after:font-bold"
                />
                Select All
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
          </div>

          {/* Postings */}
          <div className="space-y-2">
            {filteredPostings.map((posting: JobPosting, idx: number) => (
              <Card key={posting.id} className="p-4 shadow-sm hover:shadow-md transition border rounded-md">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 bg-white border-2 border-gray-400 rounded focus:ring-2 focus:ring-blue-500 checked:bg-white checked:border-blue-600 appearance-none relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-blue-600 checked:after:text-xs checked:after:font-bold"
                      checked={selected.includes(idx)}
                      onChange={() =>
                        setSelected((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]))
                      }
                    />
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
