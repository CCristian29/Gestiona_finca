import { Coffee, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Coffee size={24} />
              <span className="text-xl font-bold">CaféGestor</span>
            </div>
            <p className="text-gray-300">
              Soluciones integrales para la gestión de fincas cafeteras
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <a href="#features" className="text-gray-300 hover:text-white">
                  Características
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-300">+57 (1) 234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-300">info@cafegestor.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-gray-300">Bogotá, Colombia</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horario de Atención</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Lunes - Viernes: 8:00 AM - 6:00 PM</li>
              <li>Sábado: 8:00 AM - 2:00 PM</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} CaféGestor. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
