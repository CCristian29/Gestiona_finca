import { Code2, Database, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

export function HomeDashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Todo lo que necesitas para gestionar tu finca
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example dashboard cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Active Projects</h2>
          <p className="text-3xl font-bold text-green-600">56</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Pagos a personal</h2>
          <p className="text-3xl font-bold text-purple-600">
            <Link to="/Pagos">$5.600.300</Link>
          </p>
        </div>
      </div>
      <section className="bg-white/50 my-5 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Herramientas principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-green-950 hover:bg-green-800 transition-all transform hover:-translate-y-2">
              <Code2 className="w-12 h-12 mb-4 text-purple-500" />
              <h3 className="text-xl text-white font-bold mb-2">
                Frontend Development
              </h3>
              <p className="text-gray-400">React, TypeScript, Tailwind CSS</p>
            </div>
            <div className="p-6 rounded-lg bg-green-950/100 hover:bg-green-800 transition-all transform hover:-translate-y-2 rgb-border-effect">
              <Database className="w-12 h-12 mb-4 text-purple-500" />
              <h3 className="text-xl text-white font-bold mb-2">
                Backend Development
              </h3>
              <p className="text-gray-400">Node.js, php, Python, MySQL</p>
            </div>
            <div className="p-6 rounded-lg bg-green-950/100 hover:bg-green-800 transition-all transform hover:-translate-y-2 rgb-border-effect">
              <Link to="/dashboard/calculadora">
                <Calculator className="w-12 h-12 mb-4 text-purple-500" />
                <h3 className="text-xl text-white font-bold mb-2">
                  Calcular pagos
                </h3>
                <p className="text-gray-400">
                  la calculadora de pagos te permite imprimir los pagos de tus
                  empleados
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
