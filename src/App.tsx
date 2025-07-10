import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from "@/components/reusables/Navbar"
import Login from "@/components/pages/Login"
import Page from "@/app/DashboardCall"
import Applicants from '@/components/pages/applicants/Applicants'
import Positions from '@/components/pages/positions/Positions'
import Library from '@/components/pages/library/Library'
import Requests from '@/components/pages/requests/Requests'

import JobDetails from '@/components/pages/applicants/Job'
import LeadDeveloper from '@/components/pages/applicants/JobDetails'

import ApplicantInformationTab from '@/components/pages/applicants/ApplicantsInformationTab'

import InterviewEvaluationForm from '@/components/pages/applicants/InterviewEvaluationFormPage'

import JobStageTemplate from './components/pages/applicants/JobStateTemplate'
import CreateNewPosition from './components/pages/requests/create-new-position'
import IEForm2 from '@/components/forms/InterviewEvaluationForm2'
import CustomStages from '@/components/pages/applicants/CustomStages'
import ExamForm from '@/components/pages/Exam-Form'

import ApplicantMainPage from '@/components/pages/applicantview/ApplicantMainPage'

import PRF from './components/pages/positions/PRF'
import PoolApplicants from './components/pages/applicants/PoolApplicants'
import { FullExamResultPage } from './components/pages/FullExamResultPage'



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/navbartest" element={<Navbar />} />
      <Route path="/" element={<Login />} />

      {/* Main Tabs */}
      <Route path="/dashboard/*" element={<Page />} />
      <Route path="/applicants/" element={<Applicants />} />
      <Route path="/positions/*" element={<Positions />} />
      <Route path="/library/*" element={<Library />} />
      <Route path="/requests/*" element={<Requests />} />

      {/* Applicants */}
      <Route path="/applicants/job" element={<JobDetails />} />
      <Route path="/applicants/job/:jobtitle" element={<LeadDeveloper />} />
      <Route path="/ApplicantInformation/" element={<ApplicantInformationTab />} />
      <Route path="/ieform/*" element={<InterviewEvaluationForm/>} />
      <Route path="/applicants/:name/IEForm" element ={<IEForm2/>} />
      <Route path="/applicants/:id/IEForm" element={<IEForm2 />} />
      <Route path="/applicants/job/:jobtitle/:jobstage" element={<JobStageTemplate />} />
      <Route path="/applicants/:name" element={<ApplicantInformationTab />} />
      <Route path="/applicants/job/stage/:customStage" element={<CustomStages />} />
      <Route path="/applicants/job/:jobtitle/exam-form/:applicantId" element={<ExamForm />} />
      <Route path="/applicants/pool"  element={<PoolApplicants/>} />
      <Route path="/applicants/job/:jobtitle/applicant/:applicantId/full-result" element={<FullExamResultPage />} />

      {/* Applicant View */}
      <Route path="/applicantlandingpage"  element={<ApplicantMainPage/>} />

      {/* Requests */}
      <Route path="/positions/create-new-position" element={ < CreateNewPosition />} />
      
      {/* Positions */}
      <Route path="/prf"  element={<PRF/>} />

      

      </Routes>
    </BrowserRouter>
  );
}
