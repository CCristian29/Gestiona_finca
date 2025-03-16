import { Outlet } from "react-router-dom";
import { SideBar } from "@components/SideBar";
import { NavBarDas } from "@components/componentsDashboard/NavBarDas";

interface DashboardLayoutProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function DashboardLayout({
  isSidebarOpen,
  toggleSidebar,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex-shrink-0 h-screen sticky top-0">
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar del Dashboard */}
        <div className="sticky top-0 z-10">
          <NavBarDas />
        </div>

        {/* Contenido de cada ruta */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
