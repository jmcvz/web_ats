import { Navbar } from "@/reusables/Navbar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Archive, Info } from "lucide-react"
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

  const handleSelectAllToggle = () => {
    if (selected.length === filteredPostings.length) {
      setSelected([])
    } else {
      setSelected(filteredPostings.map((_, idx) => idx))
    }
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
              <TabsList className="flex flex-wrap gap-2 sm:gap-4 mb-2">
  {["Drafts", "Pendings", "On-hold", "Published", "Closed", "Archive"].map((tab) => (
    <TabsTrigger
      key={tab.toLowerCase()}
      value={tab.toLowerCase()}
      className="relative w-[48%] sm:w-auto px-3 py-2 text-sm font-medium text-gray-500 data-[state=active]:text-blue-600 border border-gray-200 rounded"
    >
      {tab}
      <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-blue-600 scale-x-0 data-[state=active]:scale-x-100 transition-transform origin-left" />
    </TabsTrigger>
  ))}
</TabsList>

            </Tabs>

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
                      <DialogTitle className="text-sm font-medium flex items-center gap-2 text-gray-800">
                        <Info className="text-blue-600 w-4 h-4" /> Archive Item
                      </DialogTitle>
                      <DialogDescription className="text-sm text-gray-600">
                        This will be moved to your archives. You can restore it later if needed.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-sm text-gray-800 mt-4">Archive now?</div>
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
                      onChange={() =>
                        setSelected((prev) =>
                          prev.includes(idx)
                            ? prev.filter((i) => i !== idx)
                            : [...prev, idx]
                        )
                      }
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
