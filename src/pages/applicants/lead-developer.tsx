import { Navbar } from "@/reusables/Navbar"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LayoutGrid, List } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"


// tab title
export default function LeadDeveloper() {
    useEffect(() => {
    document.title = "Applicants";
  }, []);

  const navigate = useNavigate();

  const stages = [
    {
      title: "STAGE 01 - HR Interview",
      steps: ["Resume Screening", "Phone Call Interview", "Shortlisted"],
    },
    {
      title: "STAGE 02 - Hiring Manager/Client",
      steps: ["Initial Interview", "Assessments", "Final Interview"],
    },
    {
      title: "STAGE 03 - Final Stage",
      steps: [
        "For Job Offer",
        "For offer and Finalization",
        "Onboarding",
        "Warm",
        "Failed",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-6">
          

        <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-3xl font-bold text-gray-800">Lead Developer</h2>
        </div>
        <div className="flex gap-2">
          <Link to="/applicants/jobdetails/leaddeveloper/leaddeveloperweekly">
            <LayoutGrid className="text-gray-600" />
          </Link>
          <List className="text-blue-800" />
        </div>
      </div>

      {/* Search */}
      <div>
        <Input placeholder="Search" className="max-w-md bg-gray-100" />
      </div>

      <hr />

      {/* Stages */}
      <div className="space-y-10">
        {stages.map((stage) => (
          <div key={stage.title} className="space-y-4">
            <h2 className="text-md font-semibold text-gray-800">
              {stage.title}
            </h2>
            <div className="border rounded-md divide-y">
              {stage.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-50"
                >
                  <span>{step}</span>
                  <Link to={`/applicants`} className="text-blue-500 text-sm p-0 h-auto">
                    View Applicants
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
    </>
  );
}
