import { Navbar } from "@/reusables/Navbar";
import { useEffect } from "react";
import { Users, Building2, Trash2 } from "lucide-react";

export default function Positions() {
  useEffect(() => {
    document.title = "Positions";
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 pt-[100px]">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">Library</h1>

          {/* Access Types and Archive */}
          <div className="flex items-center justify-between py-4">
            {/* Left Side: Access Types */}
            <div className="flex space-x-10">
              {/* Internal */}
              <div className="flex flex-col items-center cursor-pointer">
                <Users className="text-blue-600 w-6 h-6" />
                <span className="text-sm font-medium text-blue-600 mt-1">
                  Internal
                </span>
              </div>

              {/* External Client */}
              <div className="flex flex-col items-center cursor-pointer">
                <Building2 className="text-gray-800 w-6 h-6" />
                <span className="text-sm font-medium text-gray-800 mt-1">
                  External Client
                </span>
              </div>
            </div>

            {/* Right Side: Archive Folder */}
            <div className="flex items-center space-x-1 text-blue-600 cursor-pointer hover:underline">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Archive Folder</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
