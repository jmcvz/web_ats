import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from "@/components/ui/reusables/Navbar"
import Login from "@/components/ui/pages/Login";
/* import { Button } from "@/components/ui/button" */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
