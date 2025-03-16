import { Coffee, LogIn, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-900 text-white p-2 sm:p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-xl font-bold"
        >
          <Coffee size={20} className="sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">CaféGestor</span>
          <span className="sm:hidden">CaféGestor</span>
        </Link>

        <div className="flex items-center space-x-1 sm:space-x-4">
          {/* Botón Dashboard solo visible en pantallas md (768px) y mayores */}
          <Link
            to="/dashboard"
            className="hidden md:flex items-center space-x-1 sm:space-x-2 bg-green-700 hover:bg-green-600 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-base whitespace-nowrap"
          >
            <LayoutDashboard size={16} className="sm:w-5 sm:h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/registrar"
            className="flex items-center bg-green-700 hover:bg-green-600 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-base whitespace-nowrap"
          >
            <span>Registrar</span>
          </Link>
          <Link
            to="/iniciarSesion"
            className="flex items-center space-x-1 sm:space-x-2 bg-green-700 hover:bg-green-600 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-base whitespace-nowrap"
          >
            <LogIn size={16} className="sm:w-5 sm:h-5" />
            <span>Iniciar Sesión</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
