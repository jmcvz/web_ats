import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from "@/assets/components/pages/Navbar"
import Login from '@/assets/components/pages/Login';
/* import { Button } from "@/components/ui/button" */

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideNavbar ? (
        <AppLayout>
          <Routes>
            {/* Your other routes go here */}
          </Routes>
        </AppLayout>
      ) : (
        <Routes>
          {/* Make "/" and "/login" show the login page */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}