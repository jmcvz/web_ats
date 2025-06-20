import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/reusables/Navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const getRandomProgress = () => {
  const steps = [true] 
  const second = Math.random() > 0.5
  const third = Math.random() > 0.5
  steps.push(third ? true : second) // If third is true, second must also be true
  steps.push(third)
  return steps
}

const pendingPostings = [
  {
    title: "Social Media Manager Posting",
    department: "Marketing",
    description:
      "We are looking for a Social Media Manager to lead our digital marketing efforts and enhance our online presence....",
    assignee: "Joseph Santos",
    progress: getRandomProgress(),
  },
  {
    title: "Web Developer Posting",
    department: "Information Technology",
    description:
      "We are seeking a skilled Web Developer to design, develop, and maintain high-quality websites and web applications....",
    assignee: "Virla Getalado",
    progress: getRandomProgress(),
  },
  {
    title: "Human Resources Coordinator Posting",
    department: "Human Resource",
    description:
      "We are looking for a Human Resource Coordinator to support the HR department in various administrative and operational tasks.",
    assignee: "Daniel Jackson",
    progress: getRandomProgress(),
  },
  {
    title: "Marketing Specialist Posting",
    department: "Marketing",
    description:
      "We are looking for a Marketing Specialist to lead our digital marketing efforts and enhance our online presence....",
    assignee: "Anthony Davis",
    progress: getRandomProgress(),
  },
  {
    title: "Social Media Content Posting",
    department: "Marketing",
    description:
      "We are looking for a Social Media Content to lead our digital marketing efforts and enhance our online presence....",
    assignee: "Flynn Rider",
    progress: getRandomProgress(),
  },
  {
    title: "Marketing Manager Posting",
    department: "Marketing",
    description:
      "We are looking for a Marketing Manager to lead our digital marketing efforts and enhance our online presence....",
    assignee: "Choi Yeonjun",
    progress: getRandomProgress(),
  },
]

const getDepartmentColor = (department: string) => {
  switch (department) {
    case "Marketing":
      return "bg-blue-100 text-blue-700"
    case "Information Technology":
      return "bg-orange-100 text-orange-700"
    case "Human Resource":
      return "bg-teal-100 text-teal-700"
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
              isDone
                ? "bg-blue-500 text-white"
                : "border border-gray-400 bg-white text-gray-400"
            }`}
          >
            {isDone ? "✓" : ""}
          </div>
          {i < progress.length - 1 && (
            <div
              className={`-ml-[2px] w-12 h-0.5 ${
                progress[i] && progress[i + 1] ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function PositionsPendings() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  useEffect(() => {
    document.title = "Positions | Pendings"
  }, [])

  const filteredPostings = pendingPostings.filter((posting) =>
    posting.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleTabChange = (value: string) => {
    navigate(`/positions/${value}`)
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
              <Button variant="outline" className="w-full sm:w-auto">
                + File Request
              </Button>
            </div>
          </div>

          {/* Tabs with Select button */}
          <div className="flex justify-between items-center border-b pb-2">
            <Tabs value="pendings" onValueChange={handleTabChange} className="flex-1">
              <TabsList className="flex gap-6 border-b-0 bg-transparent">
                {["Drafts", "Pendings", "On-hold", "Published", "Closed", "Archive"].map((tab) => (
                  <TabsTrigger
                    key={tab.toLowerCase()}
                    value={tab.toLowerCase()}
                    className="relative px-2 pb-2 text-sm font-medium text-gray-500 data-[state=active]:text-blue-600"
                  >
                    {tab}
                    <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-blue-600 scale-x-0 data-[state=active]:scale-x-100 transition-transform origin-left" />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Select checkbox */}
            <div className="flex items-center gap-2 ml-4 text-sm text-gray-600">
              <input type="checkbox" id="select" className="w-4 h-4" />
              <label htmlFor="select">Select</label>
            </div>
          </div>

          {/* Postings */}
          <div className="space-y-2">
            {filteredPostings.map((posting, idx) => (
              <Card
  key={idx}
  className="p-4 shadow-sm hover:shadow-md transition border"
>
  <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-start">
    {/* Job info and description */}
    <div className="flex-1">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-base font-semibold text-gray-800">
          {posting.title}
        </h3>
        <Badge
          variant="secondary"
          className={getDepartmentColor(posting.department)}
        >
          {posting.department}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mt-1">{posting.description}</p>

      {/* Mobile view: Assignee + Progress below description */}
      <div className="mt-2 flex flex-col sm:hidden text-sm font-bold text-black">
        <span className="mb-1">{posting.assignee}</span>
        <ProgressSteps progress={posting.progress} />
      </div>
    </div>

    {/* Desktop view: Assignee + Progress on the right */}
    <div className="hidden sm:flex flex-col items-end min-w-[150px] text-sm font-bold text-black">
      <span className="mb-1 ">{posting.assignee}</span>
      <ProgressSteps progress={posting.progress} />
    </div>
  </div>
</Card>

            ))}
          </div>
        </div>
      </div>
    </>
  )
}
