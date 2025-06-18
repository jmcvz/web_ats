import { Navbar } from "@/reusables/Navbar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Archive } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const postings = [
  {
    title: "Social Media Manager Posting",
    department: "Marketing",
    status: "Reopened",
    description:
      "We are looking for a Social Media Manager to lead our digital marketing efforts and enhance our online presence.",
  },
  {
    title: "Web Developer Posting",
    department: "Information Technology",
    status: "",
    description:
      "We are seeking a skilled Web Developer to design, develop, and maintain high-quality websites and web applications.",
  },
  {
    title: "Human Resources Coordinator Posting",
    department: "Human Resource",
    status: "",
    description:
      "We are looking for a Human Resource Coordinator to support the HR department in various administrative and operational tasks.",
  },
  {
    title: "Marketing Specialist Posting",
    department: "Marketing",
    status: "",
    description:
      "We are looking for a Marketing Specialist to lead our digital marketing efforts and enhance our online presence.",
  },
  {
    title: "Social Media Content Posting",
    department: "Marketing",
    status: "",
    description:
      "We are looking for a Social Media Content to lead our digital marketing efforts and enhance our online presence.",
  },
  {
    title: "Marketing Manager Posting",
    department: "Marketing",
    status: "",
    description:
      "We are looking for a Marketing Manager to lead our digital marketing efforts and enhance our online presence.",
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

export default function PositionsClosed() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    document.title = "Positions - Closed"
  }, [])

  const filteredPostings = postings.filter((posting) =>
    posting.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleTabChange = (value: string) => {
    navigate(`/positions/${value}`)
  }

  const handleSelectToggle = () => {
    if (selected.length === filteredPostings.length) {
      setSelected([])
    } else {
      setSelected(filteredPostings.map((_, i) => i))
    }
  }

  const handleCheckboxChange = (index: number) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Positions</h1>

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

          <div className="flex justify-between items-center border-b pb-2">
            <Tabs value="closed" onValueChange={handleTabChange} className="flex-1">
              <TabsList className="flex gap-6 border-b-0 bg-transparent">
                {[
                  "Drafts",
                  "Pendings",
                  "On-hold",
                  "Published",
                  "Closed",
                  "Archive",
                ].map((tab) => (
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

            <div className="flex items-center gap-2 ml-4 text-sm text-gray-600">
              <input
                type="checkbox"
                id="select"
                className="w-4 h-4 accent-blue-600"
                checked={selected.length === filteredPostings.length}
                onChange={handleSelectToggle}
              />
              <label htmlFor="select">Select</label>

              {selected.length > 0 && (
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
                      <DialogTitle className="flex items-center gap-2 text-sm text-gray-800">
                        <span className="text-blue-600">ⓘ</span> Archive Item
                      </DialogTitle>
                      <DialogDescription className="text-sm text-gray-600">
                        This will be moved to your archives. You can restore it later if needed.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-sm text-gray-800 mt-2">Archive now?</div>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                      <button
                        onClick={() => setShowDialog(false)}
                        className="text-sm text-gray-600 hover:underline"
                      >
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

          <div className="space-y-2">
            {filteredPostings.map((posting, idx) => (
              <Card
                key={idx}
                className="p-4 shadow-sm hover:shadow-md transition border rounded-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 accent-blue-600"
                      checked={selected.includes(idx)}
                      onChange={() => handleCheckboxChange(idx)}
                    />
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
                        {posting.status && (
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                            {posting.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {posting.description.length > 100
                          ? posting.description.slice(0, 100) + "..."
                          : posting.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
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
