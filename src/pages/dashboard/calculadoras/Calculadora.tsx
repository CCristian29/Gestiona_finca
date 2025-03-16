import React from "react";
import { Recolector, PagoRecolector, ResumenRecolector } from "../../../types/Worker";
import { FormularioRecolector } from "@components/calculadora/FormularioRecolector";
import { ListaRecolectores } from "@components/calculadora/ListaRecolectores";
import { Recibo } from "@components/calculadora/Recibo";
import { ResumenGeneral } from "@components/calculadora/ResumenGeneral";
import { Coffee, Users, DollarSign, FileText } from "lucide-react";

function App() {
  const [recolectores, setRecolectores] = React.useState<PagoRecolector[]>([]);
  const [recolectorSeleccionado, setRecolectorSeleccionado] =
    React.useState<ResumenRecolector | null>(null);
  const [mostrarResumenGeneral, setMostrarResumenGeneral] =
    React.useState(false);

  const agregarRecolector = (datosRecolector: Omit<Recolector, "id">) => {
    const nuevoRecolector: PagoRecolector = {
      ...datosRecolector,
      id: crypto.randomUUID(),
      total: datosRecolector.kilos * datosRecolector.precioPorKilo,
    };
    setRecolectores([...recolectores, nuevoRecolector]);
  };

  const totalPagos = recolectores.reduce(
    (sum, recolector) => sum + recolector.total,
    0
  );
  const recolectoresUnicos = new Set(recolectores.map((r) => r.nombre)).size;
  const totalKilos = recolectores.reduce(
    (sum, recolector) => sum + recolector.kilos,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Registrar Recolección
            </h2>
            <FormularioRecolector
              onSubmit={agregarRecolector}
              recolectoresExistentes={recolectores}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-between items-center">
              <span>Resumen General</span>
              {recolectores.length > 0 && (
                <button
                  onClick={() => setMostrarResumenGeneral(true)}
                  className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  <span>Imprimir Resumen</span>
                </button>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-center text-gray-600 text-sm mb-1">
                  Recolectores
                </p>
                <p className="text-center text-2xl font-bold text-gray-900">
                  {recolectoresUnicos}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <Coffee className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-center text-gray-600 text-sm mb-1">
                  Total Kilos
                </p>
                <p className="text-center text-2xl font-bold text-gray-900">
                  {totalKilos.toFixed(1)} kg
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-center text-gray-600 text-sm mb-1">
                  Total a Pagar
                </p>
                <p className="text-center text-2xl font-bold text-gray-900">
                  ${totalPagos.toLocaleString("es-CO")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Registros por Recolector
          </h2>
          <ListaRecolectores
            recolectores={recolectores}
            onImprimir={(recolector) => setRecolectorSeleccionado(recolector)}
          />
        </div>

        {recolectorSeleccionado && (
          <Recibo
            recolector={recolectorSeleccionado}
            onCerrar={() => setRecolectorSeleccionado(null)}
          />
        )}

        {mostrarResumenGeneral && (
          <ResumenGeneral
            recolectores={recolectores}
            onCerrar={() => setMostrarResumenGeneral(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
