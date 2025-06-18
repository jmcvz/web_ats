import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from "@/reusables/Navbar"
import Login from "@/pages/Login"
import Page from "@/app/DashboardCall"
import Applicants from '@/pages/applicants/Applicants'
import Positions from '@/pages/positions/Positions'
import Library from '@/pages/Library'
import Requests from '@/pages/Requests'
import JobDetails from '@/pages/applicants/JobDetails'
import LeadDeveloper from '@/pages/applicants/LeadDeveloper'
import LeadDeveloperWeekly from '@/pages/applicants/LeadDeveloperWeekly'
import ApplicantInformationTab from '@/pages/ApplicantsInformationTab'
import LeadDeveloperRS from '@/pages/LeadDeveloper_ResumeScreening'
import LeadDeveloperPI from '@/pages/LeadDeveloper_PhoneInterview'
import InterviewEvaluationForm from '@/pages/InterviewEvaluationFormPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
      <Route path="/login" element={<Login />} />

      {/* Main Tabs */}
      <Route path="/dashboard/*" element={<Page />} />
      <Route path="/applicants/*" element={<Applicants />} />
      <Route path="/positions/*" element={<Positions />} />
      <Route path="/library/*" element={<Library />} />
      <Route path="/requests/*" element={<Requests />} />

      {/* Applicants */}
      <Route path="/applicants/jobdetails" element={<JobDetails />} />
      <Route path="/applicants/jobdetails/leaddeveloper" element={<LeadDeveloper />} />
      <Route path="/applicants/jobdetails/leaddeveloper/leaddeveloperweekly" element={<LeadDeveloperWeekly />} />

      <Route path="/ApplicantInformation/*" element={<ApplicantInformationTab />} />
      <Route path="/LeadDeveloperRS/*" element={<LeadDeveloperRS />} />
      <Route path="/LeadDeveloperPI/*" element={<LeadDeveloperPI/>} />
      <Route path="/ieform/*" element={<InterviewEvaluationForm/>} />
      </Routes>
    </BrowserRouter>
  );
}
