import './App.css'
import { Navbar } from "@/assets/components/pages/Navbar"
/* import { Button } from "@/components/ui/button" */

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Your page content goes here */}
      </main>
    </div>
  );
}

export default App
