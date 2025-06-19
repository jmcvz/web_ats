import { Navbar } from "@/reusables/Navbar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"

const archivedPostings = [
  {
    title: "Social Media Manager Posting",
    department: "Marketing",
    description:
      "We are looking for a Social Media Manager to lead our digital marketing efforts and enhance our online presence.",
  },
  {
    title: "Web Developer Posting",
    department: "Information Technology",
    description:
      "We are seeking a skilled Web Developer to design, develop, and maintain high-quality websites and web applications.",
  },
  {
    title: "Human Resources Coordinator Posting",
    department: "Human Resource",
    description:
      "We are looking for a Human Resource Coordinator to support the HR department in various administrative and operational tasks.",
  },
]

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

export default function PositionsArchive() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  useEffect(() => {
    document.title = "Positions - Archive"
  }, [])

  const filteredPostings = archivedPostings.filter((posting) =>
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

          {/* Tabs */}
          <Tabs value="archive" onValueChange={handleTabChange} className="w-full">
            <TabsList className="flex gap-6 border-b-0 bg-transparent mb-2">
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

          {/* Archived Job Cards */}
          <div className="space-y-2">
            {filteredPostings.map((posting, idx) => (
              <Card
                key={idx}
                className="p-4 shadow-sm hover:shadow-md transition border rounded-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-gray-800">
                        {posting.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`${getDepartmentColor(posting.department)} text-xs`}
                      >
                        {posting.department}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {posting.description.length > 100
                        ? posting.description.slice(0, 100) + "..."
                        : posting.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-blue-600 text-sm flex items-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restore
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
