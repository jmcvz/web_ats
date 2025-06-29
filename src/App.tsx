import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from "@/reusables/Navbar"
import Login from "@/pages/Login"
import Page from "@/app/DashboardCall"
import Applicants from '@/pages/applicants/Applicants'
import Positions from '@/pages/positions/Positions'
import Library from '@/pages/Library'
import Requests from '@/pages/requests/Requests'

import JobDetails from '@/pages/applicants/Job'
import LeadDeveloper from '@/pages/applicants/JobDetails'
import LeadDeveloperWeekly from '@/pages/applicants/lead-developer-weekly-monthly'
import ApplicantInformationTab from '@/pages/applicants/ApplicantsInformationTab'
import LeadDeveloperRS from '@/pages/applicants/ResumeScreening'
import LeadDeveloperPI from '@/pages/applicants/PhoneInterview'
import LeadDeveloperSL from '@/pages/applicants/Shortlisted'
import Failed from '@/pages/applicants/Failed'
import InterviewEvaluationForm from '@/pages/InterviewEvaluationFormPage'


import LeadDeveloperII from '@/pages/InitialInterview'
import LeadDeveloperAS from '@/pages/Assessment'
import LeadDeveloperFI from '@/pages/FinalInterview'
import LeadDeveloperFJO from '@/pages/ForJobOffer'
import OfferAndFinalization from '@/pages/applicants/OfferAndFinalization'
import JobStageTemplate from './pages/applicants/JobStateTemplate'
import Warm from '@/pages/applicants/Warm'
import Onboarding from '@/pages/applicants/Onboarding.tsx'
import CreateNewPosition from './pages/requests/create-new-position'
import IEForm2 from '@/forms/InterviewEvaluationForm2'
import CustomStages from '@/pages/applicants/CustomStages'
import ExamForm from '@/pages/Exam-Form'
import ApplicantLandingPage from '@/pages/applicantview/applicantslandingpage'
import JobDescription from '@/pages/applicantview/jobdescription'
import ApplicationProcess from '@/pages/applicantview/applicationprocess'
import Tracker from '@/pages/applicantview/tracker'
import Documents from './pages/applicantview/Documents'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
      <Route path="/login" element={<Login />} />

      {/* Main Tabs */}
      <Route path="/dashboard/*" element={<Page />} />
      <Route path="/applicants/" element={<Applicants />} />
      <Route path="/positions/*" element={<Positions />} />
      <Route path="/library/*" element={<Library />} />
      <Route path="/requests/*" element={<Requests />} />

      {/* Applicants */}
      <Route path="/applicants/job" element={<JobDetails />} />
      <Route path="/applicants/job/:jobtitle" element={<LeadDeveloper />} />
      <Route path="/applicants/jobdetails/leaddeveloper/leaddeveloperweekly" element={<LeadDeveloperWeekly />} />
      <Route path="/ApplicantInformation/" element={<ApplicantInformationTab />} />
      <Route path="/applicants/jobdetails/leaddeveloper/resumescreening" element={<LeadDeveloperRS />} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperPI" element={<LeadDeveloperPI/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperSL" element={<LeadDeveloperSL/>} />

      <Route path="/ieform/*" element={<InterviewEvaluationForm/>} />
      <Route path="/applicants/:name/IEForm" element ={<IEForm2/>} />
      <Route path="/applicants/:id/IEForm" element={<IEForm2 />} />

       
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperII" element={<LeadDeveloperII/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperAS" element={<LeadDeveloperAS/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperFI" element={<LeadDeveloperFI/>} />
      <Route path="/applicants/jobdetails/leaddeveloper/LeadDeveloperFJO" element={<LeadDeveloperFJO/>} />  
      <Route path="/applicants/job/OfferAndFinalization" element={<OfferAndFinalization />} />
      <Route path="/applicants/job/:jobtitle/:jobstage" element={<JobStageTemplate />} />
      <Route path="/applicants/:name" element={<ApplicantInformationTab />} />
      <Route path="/applicants/job/Warm" element={< Warm/>} />
      <Route path="/applicants/job/Failed" element={< Failed/>} />
      <Route path="/applicants/job/Onboarding" element={ < Onboarding />} />

      {/* Requests */}
      <Route path="/positions/create-new-position" element={ < CreateNewPosition />} />
      <Route path="/applicants/job/:customStage" element={ <CustomStages/>} />
      <Route path="/applicants/job/:jobtitle/exam-form/:applicantId" element={<ExamForm />} />
      <Route path="/test" element={ <ApplicantLandingPage />} />
      <Route path="/test2" element={<JobDescription />} />
      <Route path="/test3" element={<ApplicationProcess />} />
      <Route path="/track-application" element={<Tracker />} />
      <Route path='/documents' element={<Documents/>} />

      


      </Routes>
    </BrowserRouter>
  );
}
