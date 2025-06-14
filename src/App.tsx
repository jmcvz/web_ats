import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from "@/reusables/Navbar"
import Login from "@/pages/Login";
import Page from "@/app/DashboardCall";
/* import { Button } from "@/components/ui/button" */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}
