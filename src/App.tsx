import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from "@/reusables/Navbar"
import Login from "@/pages/Login"
import Page from "@/app/DashboardCall"
import Applicants from '@/pages/applicants/Applicants'
import Positions from '@/pages/Positions'
import Library from '@/pages/Library'
import Requests from '@/pages/Requests'
import JobDetails from '@/pages/applicants/JobDetails'
import LeadDeveloper from '@/pages/applicants/LeadDeveloper'
import LeadDeveloperWeekly from '@/pages/applicants/LeadDeveloperWeekly'
import ApplicantInformationTab from '@/pages/ApplicantsInformationTab'
import LeadDeveloperRS from '@/pages/LeadDeveloper_ResumeScreening'
import LeadDeveloperPI from '@/pages/LeadDeveloper_PhoneInterview'
import InterviewEvaluationForm from '@/pages/InterviewEvaluationFormPage'
import LeadDeveloperSL from '@/pages/LeadDeveloper_Shortlisted'
import LeadDeveloperII from '@/pages/LeadDeveloper_InitialInterview'
import LeadDeveloperAS from '@/pages/LeadDeveloper_Assessment'
import LeadDeveloperFI from '@/pages/LeadDeveloper_FinalInterview'
import LeadDeveloperFJO from '@/pages/LeadDeveloper_ForJobOffer'
import OfferAndFinalization from '@/pages/OfferAndFinalization'


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
      <Route path="/applicants/jobdetails" element={<JobDetails />} />
      <Route path="/applicants/jobdetails/leaddeveloper" element={<LeadDeveloper />} />
      <Route path="/applicants/jobdetails/leaddeveloper/leaddeveloperweekly" element={<LeadDeveloperWeekly />} />
      <Route path="/ApplicantInformation/" element={<ApplicantInformationTab />} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperRS/" element={<LeadDeveloperRS />} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperPI" element={<LeadDeveloperPI/>} />
      <Route path="/ieform/*" element={<InterviewEvaluationForm/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperSL" element={<LeadDeveloperSL/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperII" element={<LeadDeveloperII/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperAS" element={<LeadDeveloperAS/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperFI" element={<LeadDeveloperFI/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperFJO" element={<LeadDeveloperFJO/>} />  
      <Route  path="/applicants/OfferAndFinalization" element={<OfferAndFinalization />} />
      </Routes>
    </BrowserRouter>
  );
}
