import { Outlet } from "react-router-dom";
import Navbar from "@components/NavBar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar público */}
      <Navbar />

      {/* Contenido de cada página pública */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
