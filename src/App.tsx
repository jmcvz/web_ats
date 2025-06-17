import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from "@/reusables/Navbar"
import Login from "@/pages/Login"
import Page from "@/app/DashboardCall"
import Applicants from '@/pages/Applicants'
import Positions from '@/pages/Positions'
import Library from '@/pages/Library'
import Requests from '@/pages/Requests'
import ApplicantInformationTab from '@/pages/ApplicantsInformationTab'
import LeadDeveloperRS from '@/pages/LeadDeveloper_ResumeScreening'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<Page />} />
      <Route path="/applicants/*" element={<Applicants />} />
      <Route path="/positions/*" element={<Positions />} />
      <Route path="/library/*" element={<Library />} />
      <Route path="/requests/*" element={<Requests />} />
      <Route path="/ApplicantInformation/*" element={<ApplicantInformationTab />} />
      <Route path="/LeadDeveloperRS/*" element={<LeadDeveloperRS />} />
      </Routes>
    </BrowserRouter>
  );
}
