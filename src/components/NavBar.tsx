import { Coffee, LogIn, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-900 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Coffee size={24} />
          <span>CaféGestor</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/registrar"
            className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
          >
            <span>Registrar</span>
          </Link>

          <Link
            to="/iniciarSesion"
            className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
          >
            <LogIn size={20} />
            <span>Iniciar Sesión</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
