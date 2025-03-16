import React, { useState } from "react";
import {
  Filter,
  Search,
  Calendar,
  User,
  Coffee,
  Truck,
  Warehouse,
  Droplets,
  Sun,
} from "lucide-react";

interface Activity {
  id: number;
  title: string;
  type: string;
  date: string;
  responsible: string;
  status: "Pendiente" | "En Proceso" | "Completado";
  priority: "Alta" | "Media" | "Baja";
  location: string;
  icon: React.ReactNode;
}

const mockActivities: Activity[] = [
  {
    id: 1,
    title: "Cosecha de café sector norte",
    type: "Cosecha",
    date: "2024-03-20",
    responsible: "Juan Pérez",
    status: "En Proceso",
    priority: "Alta",
    location: "Sector Norte - Lote A",
    icon: <Coffee className="text-brown-600" />,
  },
  {
    id: 2,
    title: "Fertilización de plantas nuevas",
    type: "Mantenimiento",
    date: "2024-03-22",
    responsible: "María González",
    status: "Pendiente",
    priority: "Media",
    location: "Sector Sur - Lote C",
    icon: <Droplets className="text-blue-600" />,
  },
  {
    id: 3,
    title: "Transporte de café a beneficiadero",
    type: "Logística",
    date: "2024-03-19",
    responsible: "Carlos Rodríguez",
    status: "Completado",
    priority: "Alta",
    location: "Ruta Principal",
    icon: <Truck className="text-gray-600" />,
  },
  {
    id: 4,
    title: "Control de plagas",
    type: "Mantenimiento",
    date: "2024-03-23",
    responsible: "Ana Martínez",
    status: "Pendiente",
    priority: "Alta",
    location: "Sector Este - Lote B",
    icon: <Sun className="text-yellow-600" />,
  },
  {
    id: 5,
    title: "Almacenamiento de café procesado",
    type: "Almacenamiento",
    date: "2024-03-18",
    responsible: "Luis Torres",
    status: "Completado",
    priority: "Media",
    location: "Bodega Principal",
    icon: <Warehouse className="text-gray-600" />,
  },
];

export function ListActivi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "En Proceso":
        return "bg-blue-100 text-blue-800";
      case "Completado":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800";
      case "Media":
        return "bg-orange-100 text-orange-800";
      case "Baja":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "Todos" || activity.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Actividades de la Finca
        </h1>
        <p className="text-gray-600 mt-2">
          Gestión y seguimiento de actividades diarias
        </p>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar actividad..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Completado">Completado</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </button>
        </div>
      </div>

      {/* Lista de Actividades */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        {activity.icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar size={16} className="mr-2" />
                      {new Date(activity.date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {activity.responsible}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        activity.status
                      )}`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                        activity.priority
                      )}`}
                    >
                      {activity.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
