import { Navbar } from "@/reusables/Navbar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Status = "Draft" | "Pending" | "On Hold" | "Closed";

interface RequestedPosition {
  title: string;
  status: Status;
  manager: string;
  date: string;
  department: string;
  approver: string;
}

const positions: RequestedPosition[] = [
  {
    title: "UI Designer",
    status: "Draft",
    manager: "Mario Perez",
    date: "—",
    department: "CI Department",
    approver: "Ryan Bang, Lily Cruz, and Victor Magtangol",
  },
  {
    title: "Sales Agent",
    status: "Pending",
    manager: "Elizabeth Hall",
    date: "21/10/2023",
    department: "Sales Department",
    approver: "Ryan Bang, Lily Cruz, and Victor Magtangol",
  },
  {
    title: "Marketing Agent",
    status: "On Hold",
    manager: "Juan Martin",
    date: "26/10/2022",
    department: "Marketing Department",
    approver: "Ryan Bang, Lily Cruz, and Victor Magtangol",
  },
  {
    title: "Quality Assurance",
    status: "Closed",
    manager: "Lauren Taylor",
    date: "23/03/2020",
    department: "CI Department",
    approver: "Ryan Bang, Lily Cruz, and Victor Magtangol",
  },
];

export default function Requests() {
  useEffect(() => {
    document.title = "Requests";
  }, []);

  const [search, setSearch] = useState("");

  const filtered = positions.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<Status, string> = {
    Draft: "bg-gray-100 text-gray-500",
    Pending: "bg-orange-100 text-orange-500",
    "On Hold": "bg-red-100 text-red-500",
    Closed: "bg-yellow-100 text-yellow-600",
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">Request</h1>
          <h4 className="text-2xl font-bold mb-4">Requested Positions</h4>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <Input
              placeholder="Search"
              className="w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-2">
              <select className="border p-2 rounded text-sm">
                <option>All Offices</option>
              </select>
              <select className="border p-2 rounded text-sm">
                <option>All Departments</option>
              </select>
              <select className="border p-2 rounded text-sm">
                <option>All Employment Type</option>
              </select>
              <Button variant="outline">+ File Request</Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-50 text-gray-700 text-left">
                <tr>
                  <th className="px-4 py-3">Position Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Hiring Manager</th>
                  <th className="px-4 py-3">Date Requested</th>
                  <th className="px-4 py-3">Approving Officer</th>
                  <th className="px-4 py-3 text-center">
                    <Trash2 className="w-4 h-4 mx-auto text-gray-400" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-3 font-medium">{item.title}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{item.manager}</div>
                      <div className="text-gray-500">{item.department}</div>
                    </td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">{item.approver}</td>
                    <td className="px-4 py-3 text-center">
                      <input type="checkbox" className="accent-blue-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}