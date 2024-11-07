import { Button } from 'primereact/button';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { Avatar } from 'primereact/avatar';

type SideBarProps = {
  isSidebarOpen: boolean,
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SideBar = ({ isSidebarOpen, setIsSidebarOpen }: SideBarProps) => {
  const user = {
    name: JSON.parse(localStorage.getItem('user') || "")?.username || 'Usuário',
    email: JSON.parse(localStorage.getItem('user') || "")?.email || 'user@example.com'
  };

  return (
    <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out z-20 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex items-center justify-between p-3 pt-4 mx-2">
          <h2 className={`text-2xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>GymOne</h2>
          <Button
            icon={`${isSidebarOpen ? "pi pi-angle-left" : "pi pi-angle-right"}`}
            className="p-button-rounded p-button-text p-button-plain text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <nav className="mt-10">
          <ul className="space-y-4">
            <li>
              <Button
                className="w-full text-left text-white hover:bg-gray-700 flex items-center p-3"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                <FiHome className="mx-2" />
                {isSidebarOpen && 'Home'}
              </Button>
            </li>
            <li>
              <Button
                className="w-full text-left text-white hover:bg-gray-700 flex items-center p-3"
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  setIsSidebarOpen(false);
                  window.location.href = '/login';
                }}
              >
                <FiLogOut className="mx-2" />
                {isSidebarOpen && 'Logout'}
              </Button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-900">
          <div className="flex items-center">
            <Avatar label={user.name.charAt(0)} className="mr-2" />
            {isSidebarOpen && (
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
  )
};