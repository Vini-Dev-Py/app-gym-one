import React, { useState } from 'react';
import { SideBar } from '../components/SideBar';
import { ProfessionalDashboard } from './Professional';
import { UserComum } from './UserComum';

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const user = {
    type: JSON.parse(localStorage.getItem('user') || "")?.type || 'user',
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <header className="p-4 bg-white shadow flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Home Page</h1>
        </header>
        <main className="flex-1 p-6">
          {user.type === "professional" && (
            <ProfessionalDashboard />
          )}
          {user.type === "user" && (
            <UserComum />
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
