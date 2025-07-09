import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/reusables/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { User2, Sparkles, Wand2, Plus } from "lucide-react";


const InputField = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
    <Input {...props} />
  </div>
);

export default function PRF() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Personnel Requisition Form";
  }, []);

  const goToNextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const goToPreviousStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-4">
          <h1 className="text-lg font-bold text-gray-800 mb-6">
            Personnel Requisition Form
          </h1>

          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-[#0056D2] text-sm hover:underline">
              &larr; Cancel Request
            </a>
          </div>

          <div className="flex space-x-0 border border-gray-300 rounded-md overflow-hidden mb-8">
            {["Step 01", "Step 02", "Step 03", "Step 04"].map((label, i) => (
              <div
                key={i}
                className={`flex-1 text-center py-2 text-sm font-semibold relative ${
                  i + 1 === step ? "bg-[#0056D2] text-white" : "bg-white text-gray-500"
                }`}
              >
                {label}
                {i < 3 && <span className="absolute right-0 top-0 h-full w-px bg-gray-300" />}
              </div>
            ))}
          </div>

          {step === 1 && <Step01 goToNextStep={goToNextStep} step={step} />}
          {step === 2 && (
            <Step02 goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} step={step} />
          )}
          {step === 3 && (
            <Step03 goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} step={step} />
          )}
          {step === 4 && (
            <Step04 goToPreviousStep={goToPreviousStep} step={step} />
            )}
        </div>
      </div>
    </>
  );
}

function PreviewInfo({ step }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="border rounded-md p-4 bg-white text-sm h-fit sticky top-28 space-y-4">
      {step !== 4 && (
        <>
          {/* POSITION INFORMATION */}
          <div className="space-y-2">
            <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase">
              POSITION INFORMATION
            </h2>
            <p><strong>Job Title:</strong> UI Designer Manager</p>
            <p><strong>Target Start Date:</strong> March 28, 2025</p>
            <p><strong>Number of Vacancies:</strong> 3</p>
            <p><strong>Reason for Posting Position:</strong> New role to support product development</p>
          </div>

          {/* DEPARTMENT INFORMATION */}
          <div className="space-y-2">
            <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase">
              DEPARTMENT INFORMATION
            </h2>
            <p><strong>Business Unit:</strong> OODC</p>
            <p><strong>Levels of Interview:</strong> 3</p>
            <p><strong>Department Name:</strong> Continuous Improvement Department</p>
            <p><strong>Immediate Supervisor:</strong> Hailey Adams</p>
          </div>

          {step >= 2 && (
            <>
              {/* JOB DETAILS */}
              <div className="space-y-2">
                <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase">
                  JOB DETAILS
                </h2>
                <p><strong>Contract Type:</strong> Probationary</p>
                <p><strong>Work Arrangement:</strong> Hybrid</p>
                <p><strong>Category:</strong> Managerial</p>
                <p><strong>Subcategory:</strong> UI Design Manager</p>
                <p><strong>Working Site:</strong> Makati</p>
                <p><strong>Working Schedule:</strong> 8:00 am - 5:00 pm</p>
              </div>

              {/* JOB DESCRIPTION */}
              <div className="space-y-2">
                <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase">
                  JOB DESCRIPTION
                </h2>
                <p>
                  We are looking for a creative and detail-oriented UI Designer to design visually appealing and user-friendly interfaces for web and mobile applications...
                </p>
              </div>

              {showMore && (
                <>
                  {/* KEY RESPONSIBILITIES */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Key Responsibilities:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Design intuitive and aesthetically pleasing interfaces.</li>
                      <li>Collaborate with cross-functional teams.</li>
                      <li>Create wireframes and prototypes.</li>
                      <li>Conduct user research and usability testing.</li>
                      <li>Maintain visual consistency.</li>
                    </ul>
                  </div>

                  {/* QUALIFICATIONS */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Qualifications:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Bachelor's degree in a related field.</li>
                      <li>Experience in UI design roles.</li>
                      <li>Proficiency in Adobe XD, Figma, or Sketch.</li>
                      <li>Strong design portfolio.</li>
                      <li>Attention to detail.</li>
                    </ul>
                  </div>

                  {/* NON-NEGOTIABLES */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Non-Negotiables:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>2+ years of experience in UI design.</li>
                      <li>Proficiency in design tools.</li>
                      <li>Collaborative team skills.</li>
                      <li>Strong problem-solving ability.</li>
                    </ul>
                  </div>

                  {/* ASSESSMENTS */}
                  {step === 3 && (
                    <div className="space-y-2">
                      <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase">
                        ASSESSMENTS
                      </h2>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Assessment Required: YES</strong></li>
                        <li>Technical Test</li>
                        <li>Language Proficiency Test</li>
                        <li>Personality Test</li>
                        <li>Psychological Test</li>
                      </ul>
                    </div>
                  )}

                  {/* SALARY BUDGET */}
                  <div className="space-y-2">
                    <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase">
                      SALARY BUDGET
                    </h2>
                    <p className="font-semibold text-gray-800">₱ 20,000 - 25,000</p>
                  </div>
                </>
              )}

              {/* SHOW MORE TOGGLE */}
              <div
                className="text-[#0056D2] text-sm mt-2 cursor-pointer"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "▲ See less" : "▼ See more"}
              </div>
            </>
          )}
        </>
      )}

      {step === 4 && (
  <div className="space-y-6">
    <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase">
      APPROVAL
    </h2>

    {/* STEP BLOCK */}
    {[1, 2, 3].map((stepNumber, i) => {
      const titles = [
        {
          title: "HR Manager Review",
          subtitle: "Initial review and budget allocation",
          label: "HR Manager",
        },
        {
          title: "Finance Approval",
          subtitle: "Budget verification",
          label: "Finance Manager",
        },
        {
          title: "Final Approval",
          subtitle: "Final approval before position opens",
          label: "General Manager",
        },
      ];

      const isLast = i === 2;
      const { title, subtitle, label } = titles[i];

      return (
        <div key={i} className="relative flex gap-4">
          {/* Left Timeline */}
          <div className="flex flex-col items-center w-6">
            {/* Line */}
            {!isLast && (
              <div className="absolute top-6 left-[11px] h-full w-px bg-blue-200 z-0" />
            )}

            {/* Circle */}
            <div className="relative z-10 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {stepNumber}
            </div>
          </div>

          {/* Right Content */}
          <div className="border rounded-lg p-4 bg-white shadow space-y-4 flex-1">
            {/* Header with title & buttons */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>

              <div className="flex gap-2">
                <button className="text-red-600 bg-red-100 px-3 py-1 text-xs rounded">Reject</button>
                <button className="text-green-600 bg-green-100 px-3 py-1 text-xs rounded">Approve</button>
              </div>
            </div>

            {/* Approver */}
            <p className="text-sm text-gray-500">
              <strong>{label}:</strong> Mr. Carlos Garcia
            </p>

            {/* Budget Allocation */}
            <div>
              <label className="text-sm font-semibold block mb-1">Budget Allocation</label>
              <input
                type="text"
                value="₱ 20,000 - 25,000"
                disabled
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-500 bg-white"
              />
            </div>

            {/* Comments */}
            <div>
              <label className="text-sm font-semibold block mb-1">Comments</label>
              <textarea
                rows={4}
                disabled
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 bg-white resize-none"
                defaultValue={
                  stepNumber === 1
                    ? "Approved. Please confirm final budget availability with Finance before proceeding with recruitment."
                    : "Add your review comments..."
                }
              />
            </div>

            {/* Edit Button */}
            {stepNumber === 1 && (
              <div>
                <button className="px-3 py-1 text-xs rounded bg-gray-100 text-blue-600 hover:bg-gray-200">
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
)}

    </div>
  );
}


function Step01({ goToNextStep, step }) {
  const [interviewLevels, setInterviewLevels] = useState(4);

  const handleInterviewLevelChange = (e) => {
    const value = parseInt(e.target.value);
    setInterviewLevels(Number.isNaN(value) ? 0 : value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Position Information */}
        <div>
          <h2 className="text-[#0056D2] font-bold text-sm mb-4 border-l-4 border-[#0056D2] pl-2 uppercase">
            Position Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Job Title" placeholder="Enter Job Title" />
            <InputField label="Target Start Date" type="date" />
            <InputField label="No. of Vacancies" type="number" placeholder="e.g. 3" />
            <InputField label="Reason for Posting Position" placeholder="e.g. New Role" />
          </div>
        </div>

        {/* Department Information */}
        <div>
          <h2 className="text-[#0056D2] font-bold text-sm mb-4 border-l-4 border-[#0056D2] pl-2 uppercase">
            Department Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Business Unit</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input type="radio" name="businessUnit" value="OODC" />
                  OODC
                </label>
                <label className="flex items-center gap-1">
                  <input type="radio" name="businessUnit" value="OORS" />
                  OORS
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Department Name</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ex: Information Technology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT">Information Technology</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Levels of Interview</label>
              <Input type="number" value={interviewLevels} onChange={handleInterviewLevelChange} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Immediate Supervisor</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ex: Ms. Hailey Adams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hailey Adams">Ms. Hailey Adams</SelectItem>
                  <SelectItem value="John Smith">Mr. John Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dynamic Hiring Manager Fields */}
          <div className="mt-6">
            <div className="grid grid-cols-2 bg-gray-100 p-3 font-medium text-sm text-gray-700 border border-gray-200 rounded-t-md">
              <div>LEVELS OF INTERVIEW</div>
              <div>HIRING MANAGERS</div>
            </div>
            {Array.from({ length: interviewLevels }, (_, i) => (
              <div
                key={i}
                className="grid grid-cols-2 gap-4 items-center border-b border-gray-200 p-3"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600">
                <User2 className="w-4 h-4 text-gray-500" />
                Hiring Manager {i + 1}
                </div>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager A">Manager A</SelectItem>
                    <SelectItem value="Manager B">Manager B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <Button className="bg-[#0056D2] hover:bg-blue-700 text-white" onClick={goToNextStep}>
            Next &rarr;
          </Button>
        </div>
      </div>

      <PreviewInfo step={step} />
    </div>
  );
}

function Step02({ goToNextStep, goToPreviousStep, step }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-[#0056D2] font-bold text-sm mb-4 border-l-4 border-[#0056D2] pl-2 uppercase">
            Job Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contract Type</label>
              <div className="flex items-center gap-4">
                <label><input type="radio" name="contract" /> Probationary</label>
                <label><input type="radio" name="contract" /> Project</label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Work Arrangement</label>
              <div className="flex items-center gap-4">
                <label><input type="radio" name="arrangement" /> Hybrid</label>
                <label><input type="radio" name="arrangement" /> Onsite</label>
                <label><input type="radio" name="arrangement" /> Remote</label>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Job Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Managerial">Managerial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Position</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Job Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Managerial">Managerial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputField label="Working Site" placeholder="Makati" />
            <InputField label="Work Schedule" placeholder="8:00 am - 5:00 pm" />
          </div>
        </div>

        <div>
          <h2 className="text-[#0056D2] font-bold text-sm mb-4 border-l-4 border-[#0056D2] pl-2 uppercase">
            Job Description
          </h2>
          <div className="space-y-6">
        {[
          "Job Description",
          "Responsibilities",
          "Qualifications",
          "Non Negotiables",
        ].map((label) => (
          <div key={label}>
            <label className="block text-sm font-semibold mb-1">
              {label}
            </label>
            <div className="relative">
              <Textarea
                placeholder="Input text"
                className="min-h-[90px] pr-20 resize-none"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-2 right-2 text-[#8B8B8B] text-sm hover:bg-transparent flex items-center space-x-1"
              >
                <span>Ask AI</span>
                <Wand2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
        </div>

        <div>
          <h2 className="text-[#0056D2] font-bold text-sm mb-4 border-l-4 border-[#0056D2] pl-2 uppercase">
            Salary Budget
          </h2>
          <InputField label="Salary Budget" placeholder="₱ 20,000 - 25,000" />
        </div>

        <div className="flex justify-between mt-10">
          <Button variant="outline" onClick={goToPreviousStep}>
            &larr; Previous
          </Button>
          <Button className="bg-[#0056D2] hover:bg-blue-700 text-white" onClick={goToNextStep}>
            Next &rarr;
          </Button>
        </div>
      </div>

      <PreviewInfo step={step} />
    </div>
  );
}

function Step03({ goToNextStep, goToPreviousStep, step }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-[#0056D2] font-bold text-sm mb-4 border-l-4 border-[#0056D2] pl-2 uppercase">
          Assessments
        </h2>

        {/* Require Assessment */}
        <div>
          <label className="text-sm font-medium text-gray-700">Require Assessment:</label>
          <div className="flex items-center gap-6 mt-1">
            <label className="flex items-center gap-1 text-sm">
              <input type="radio" name="assessmentRequired" defaultChecked />
              Yes
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input type="radio" name="assessmentRequired" />
              No
            </label>
          </div>
        </div>

        {/* Row: Other Assessment + Type of Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Type of Assessment */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Type of Assessment</label>
            <div className="space-y-2 mt-1">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" 
                className="accent-[#0056D2] bg-white border border-gray-300 rounded"
                defaultChecked />
                Technical Test
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" 
                className="accent-[#0056D2] bg-white border border-gray-300 rounded"
                defaultChecked />
                Language Proficiency Test
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" 
                className="accent-[#0056D2] bg-white border border-gray-300 rounded"/>
                Cognitive Test
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" 
                className="accent-[#0056D2] bg-white border border-gray-300 rounded"
                defaultChecked />
                Personality Test
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" 
                className="accent-[#0056D2] bg-white border border-gray-300 rounded"/>
                Behavioral Test
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" 
                className="accent-[#0056D2] bg-white border border-gray-300 rounded"/>
                Cultural Test
              </label>
            </div>
            <div className="mt-5 text-sm text-blue-600 cursor-pointer hover:underline inline-flex items-center gap-1">
              Generate to AI <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Other Assessment */}
          <div className="w-full">
            <div className="flex items-center mb-1">
              <label className="text-sm font-semibold text-gray-700 mr-2.5">
                Other Assessment
              </label>
              <div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer relative">
                <Plus className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            <input
              type="text"
              value="Psychological Test"
              disabled
              className="max-w-xs px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-400 bg-white placeholder:text-gray-400"
              placeholder="Psychological Test"
            />
          </div>
        </div>

        {/* Asset Request Section */}
        <div>
          <h2 className="text-[#0056D2] font-bold text-sm mt-8 mb-4 border-l-4 border-[#0056D2] pl-2 uppercase flex items-center gap-2">
            ASSET REQUEST 
            <span>
              <div className="w-3.5 h-3.5 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer relative">
                <Plus className="w-2.5 h-2.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </span>
          </h2>

          {/* Hardware and Software Sections */}
          <div className="space-y-6">
            {/* Hardware */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block flex items-center gap-1">
                Hardware Required
              </label>
              <div className="space-y-2 mt-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" 
                  className="accent-[#0056D2] bg-white border border-gray-300 rounded"/>
                  Desktop
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" 
                  className="accent-[#0056D2] bg-white border border-gray-300 rounded"/>
                  Handset
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" 
                  className="accent-[#0056D2] bg-white border border-gray-300 rounded"
                  defaultChecked />
                  Headset
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" 
                  className="accent-[#0056D2] bg-white border border-gray-300 rounded"
                  defaultChecked />
                  Laptop
                </label>
              </div>
            </div>

            {/* Software */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block flex items-center gap-2">
                Software Required
                <span>
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer relative">
                    <Plus className="w-2.5 h-2.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </span>
              </label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
                {[
                  "Adobe Photoshop",
                  "Google Chrome",
                  "MS Teams",
                  "Open VPN",
                  "WinRAR",
                  "ZOHO",
                  "Email",
                  "Microsoft Office",
                  "Nitro Pro 8 PDF",
                  "Viber",
                  "Xlite",
                  "Zoom",
                ].map((software, index) => (
                  <label key={index} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-[#0056D2] bg-white border border-gray-300 rounded"
                      defaultChecked={["Adobe Photoshop", "Microsoft Office", "Viber"].includes(software)}
                    />
                    {software}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10">
          <Button variant="outline" onClick={goToPreviousStep}>
            &larr; Previous
          </Button>
          <Button className="bg-[#0056D2] hover:bg-blue-700 text-white" onClick={goToNextStep}>
            Next &rarr;
          </Button>
        </div>
      </div>

      {/* Preview Sidebar */}
      <PreviewInfo step={step} />
    </div>
  );
}

function Step04({ goToPreviousStep, step }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 text-gray-800">
      {/* Left Content */}
      <div className="lg:col-span-2 space-y-10">
        {/* POSITION + DEPARTMENT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* POSITION INFORMATION */}
          <div>
            <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase mb-4">
              Position Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Job Title</p>
                <p className="text-sm font-semibold text-gray-800">UI Designer Manager</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Target Start Date</p>
                <p className="text-sm text-gray-800">March 28, 2025</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Number of Vacancies</p>
                <p className="text-sm text-gray-800">3</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Reason for Posting Position</p>
                <p className="text-sm text-gray-800">New role to support product development</p>
              </div>
            </div>
          </div>

          {/* DEPARTMENT INFORMATION */}
          <div>
            <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase mb-2">
              Department Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Business Unit</p>
                <p className="text-sm text-gray-800">OODC</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Levels of Interview</p>
                <p className="text-sm text-gray-800">3</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Department Name</p>
                <p className="text-sm text-gray-800">Continuous Improvement Department</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Immediate Supervisor</p>
                <p className="text-sm text-gray-800">Hailey Adams</p>
              </div>
            </div>
          </div>

          {/* JOB DETAILS */}
          <div>
            <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase mb-2 mt-2">
              Job Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Contract Type</p>
                <p className="text-sm text-gray-800">Probationary</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Work Arrangement</p>
                <p className="text-sm text-gray-800">Hybrid</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Category</p>
                <p className="text-sm text-gray-800">Managerial</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Subcategory</p>
                <p className="text-sm text-gray-800">UI Design Manager</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Working Site</p>
                <p className="text-sm text-gray-800">Makati</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Working Schedule</p>
                <p className="text-sm text-gray-800">8:00 am - 5:00 pm</p>
              </div>
            </div>
          </div>

          {/* ASSESSMENTS */}
          <div>
            <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase mb-4">
              Assessments
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">Assessment Required:</p>
                <p className="text-sm text-gray-800">Yes</p>
              </div>
              <ul className="list-disc list-inside text-gray-700 pl-2 text-sm">
                <li>Technical Test</li>
                <li>Language Proficiency Test</li>
                <li>Personality Test</li>
                <li>Psychological Test</li>
              </ul>
            </div>

            <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase mb-4 mt-8">
              Asset Request
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <p className="text-xs text-gray-500">Hardware</p>
              </div>
              <ul className="list-disc list-inside text-gray-700 pl-2 text-sm">
                <li>Headset</li>
                <li>Laptop</li>
              </ul>
              <div className="flex items-center">
                <p className="text-xs text-gray-500">Software</p>
              </div>
              <ul className="list-disc list-inside text-gray-700 pl-2 text-sm">
                <li>Adobe Photoshop</li>
                <li>Microsoft Office</li>
                <li>Viber</li>
              </ul>
            </div>
          </div>
        </div>

        {/* JOB DESCRIPTION */}
        <div>
          <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase mb-2">
            Job Description
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-800">
              We are looking for a creative and detail-oriented UI Designer...
            </p>

            <p className="text-sm font-bold mb-1">Key Responsibilities:</p>
            <ul className="list-disc list-inside text-gray-700 pl-2 text-sm">
              <li>Design intuitive and aesthetically pleasing UIs.</li>
              <li>Collaborate with team members on implementation.</li>
              <li>Create wireframes, prototypes, high-fidelity designs.</li>
              <li>Conduct usability testing and refine designs.</li>
              <li>Ensure brand consistency in visual design.</li>
            </ul>

            <p className="text-sm font-bold mb-1">Qualifications:</p>
            <ul className="list-disc list-inside text-gray-700 pl-2 text-sm">
              <li>Bachelor’s degree in relevant field.</li>
              <li>Experience as UI Designer or similar role.</li>
              <li>Proficiency in Adobe XD, Figma, etc.</li>
              <li>Strong portfolio.</li>
              <li>Great attention to detail.</li>
            </ul>

            <p className="text-sm font-bold mb-1">Non-Negotiables:</p>
            <ul className="list-disc list-inside text-gray-700 pl-2 text-sm">
              <li>Bachelor’s degree in relevant field.</li>
              <li>Experience as UI Designer or similar role.</li>
              <li>Proficiency in Adobe XD, Figma, etc.</li>
              <li>Strong portfolio.</li>
              <li>Great attention to detail.</li>
            </ul>
          </div>

          {/* SALARY BUDGET */}
          <div className="space-y-2 mt-6">
            <h2 className="text-[#0056D2] font-bold text-sm border-l-4 border-[#0056D2] pl-2 uppercase">
              SALARY BUDGET
            </h2>
            <p className="font-semibold text-gray-800">₱ 20,000 - 25,000</p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-10">
          <Button variant="outline" onClick={goToPreviousStep}>
            &larr; Previous
          </Button>
          <Button className="bg-[#0056D2] hover:bg-blue-700 text-white">
            Submit
          </Button>
        </div>
      </div>

      {/* Right Content (Preview) */}
      <div>
        <PreviewInfo step={step} />
      </div>
    </div>
  );
}
