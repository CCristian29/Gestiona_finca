import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Home,
  Users,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  UserPlus,
  List as UserList,
  PenTool as Tool,
  Wrench,
  Gauge,
  ClipboardList as Actividad,
  ListPlus,
  ListVideo,
} from "lucide-react";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SubMenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: SubMenuItem[];
}

export function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );

  const menuItems: MenuItem[] = [
    {
      title: "Inicio",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      title: "Usuarios",
      icon: <Users size={20} />,
      submenu: [
        {
          title: "Agregar empleados",
          icon: <UserPlus size={18} />,
          path: "/dashboard/Agregarempleados",
        },
        {
          title: "Lista de empleados",
          icon: <UserList size={18} />,
          path: "/dashboard/users/list",
        },
      ],
    },
    {
      title: "Actividades",
      icon: <Actividad size={20} />,
      submenu: [
        {
          title: "Agregar actividad",
          icon: <ListPlus size={18} />,
          path: "/dashboard/AgregarActi",
        },
        {
          title: "Ver actividades",
          icon: <ListVideo size={18} />,
          path: "/dashboard/ListActivi",
        },
      ],
    },
    {
      title: "Herramientas",
      icon: <Tool size={20} />,
      submenu: [
        {
          title: "Calcular pagos",
          icon: <Wrench size={18} />,
          path: "/dashboard/calculadora",
        },
        {
          title: "Metrics",
          icon: <Gauge size={18} />,
          path: "/dashboard/tools/metrics",
        },
      ],
    },
    {
      title: "Perfil",
      icon: <Settings size={20} />,
      path: "/dashboard/profile",
    },
    {
      title: "Ayuda",
      icon: <HelpCircle size={20} />,
      path: "/dashboard/help",
    },
    {
      title: "Pagina de inicio",
      icon: <Home size={20} />,
      path: "/Home",
    },
  ];

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuTitle]: !prev[menuTitle],
    }));
  };

  return (
    <aside
      className={`bg-green-800 text-white h-screen ${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300 shadow-xl relative`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-green-700">
        <Link to="/dashboard">
          <h1 className={`font-bold text-xl ${isOpen ? "block" : "hidden"}`}>
            CCRA
          </h1>
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-green-700 rounded-lg transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`w-full flex items-center px-4 py-2 hover:bg-green-700 transition-colors ${
                      expandedMenus[item.title] ? "bg-green-700" : ""
                    }`}
                  >
                    {item.icon}
                    <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>
                      {item.title}
                    </span>
                    {isOpen && (
                      <span className="ml-auto">
                        {expandedMenus[item.title] ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </button>
                  {/* Submenu */}
                  <div
                    className={`${
                      expandedMenus[item.title] && isOpen
                        ? "max-h-screen"
                        : "max-h-0"
                    } overflow-hidden transition-all duration-300 bg-green-900`}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="flex items-center px-6 py-2 hover:bg-green-700 transition-colors"
                      >
                        {subItem.icon}
                        <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path!}
                  className="flex items-center px-4 py-2 hover:bg-green-700 transition-colors"
                >
                  {item.icon}
                  <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>
                    {item.title}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
