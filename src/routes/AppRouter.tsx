import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicLayout from "../layout/PublicLayaut";
import {DashboardLayout} from "../layout/DashboarLayout";

import Home from "../pages/Home";
import IniciarSesion from "../pages/IniciarSesion";
import RegistrarU from "../pages/Registro";

// Dashboard
import { HomeDashboard } from "../pages/dashboard/HomeDashboard";
import Perfil from "../pages/dashboard/Perfil";
import Calculadora from "../pages/dashboard/calculadoras/Calculadora";
import { AgregarPersonal } from "../pages/dashboard/usuarios/AgregarEmpleados";
import { AgregarActi } from "../pages/dashboard/actividades/AgregarActi";
import { useState } from "react";

const AppRouter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Rutas públicas con Navbar */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="iniciarSesion" element={<IniciarSesion />} />
          <Route path="registrar" element={<RegistrarU />} />
        </Route>

        {/* Rutas privadas con DashboardLayout y NavbarDas */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          }
        >
          <Route index element={<HomeDashboard />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="calculadora" element={<Calculadora />} />
          <Route path="Agregarempleados" element={<AgregarPersonal />} />
          <Route path="AgregarActi" element={<AgregarActi />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
