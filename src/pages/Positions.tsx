import { Navbar } from "@/reusables/Navbar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";

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
];

// Page Component
export default function Positions() {
  useEffect(() => {
    document.title = "Positions";
  }, []);

  const [search, setSearch] = useState("");

  const filteredPostings = postings.filter((posting) =>
    posting.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">Positions</h1>

          {/* Search & Filters */}
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
          <Tabs defaultValue="drafts">
  <TabsList className="flex flex-wrap gap-2 mb-2 sm:mb-2 tabs-margin">
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
        className="w-full sm:w-auto"
      >
        {tab}
      </TabsTrigger>
    ))}
  </TabsList>
</Tabs>


          {/* Job Cards */}
          <div className="mt-6 sm:mt-8">
            <div className="space-y-3">
              {filteredPostings.map((posting, idx) => (
                <Card key={idx} className="p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg flex gap-2 items-center">
                      {posting.title}
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {posting.department}
                      </span>
                      {posting.status && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          {posting.status}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 max-w-3xl">
                      {posting.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
}
