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
import LeadDeveloper from '@/pages/applicants/lead-developer'
import LeadDeveloperWeekly from '@/pages/applicants/lead-developer-weekly-monthly'
import ApplicantInformationTab from '@/pages/applicants/ApplicantsInformationTab'
import LeadDeveloperRS from '@/pages/applicants/LeadDeveloper_ResumeScreening'
import LeadDeveloperPI from '@/pages/applicants/LeadDeveloper_PhoneInterview'
import LeadDeveloperSL from '@/pages/applicants/LeadDeveloper_Shortlisted'

import InterviewEvaluationForm from '@/pages/InterviewEvaluationFormPage'

import PositionsPendings from '@/pages/positions/positions-pendings'
import PositionsOnHold from '@/pages/positions/positions-onhold'
import PositionsPublished from '@/pages/positions/positions-published'
import PositionsClosed from '@/pages/positions/positions-closed'
import PositionsArchive from '@/pages/positions/positions-archive'


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
      <Route path="/ApplicantInformation/" element={<ApplicantInformationTab />} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperRS" element={<LeadDeveloperRS />} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperPI" element={<LeadDeveloperPI/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperSL" element={<LeadDeveloperSL/>} />

      <Route path="/ieform/*" element={<InterviewEvaluationForm/>} />

      {/* Positions */}
      <Route path="/positions/pendings" element={<PositionsPendings />} />
      <Route path="/positions/on-hold" element={<PositionsOnHold />} />
      <Route path="/positions/published" element={<PositionsPublished />} />
      <Route path="/positions/closed" element={<PositionsClosed />} />
      <Route path="/positions/archive" element={<PositionsArchive />} />
       
      </Routes>
    </BrowserRouter>
  );
}
