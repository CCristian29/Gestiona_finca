import React from "react";
import { PagoRecolector, ResumenRecolector } from "../../types/Worker";
import { Printer } from "lucide-react";

interface PropiedadesLista {
  recolectores: PagoRecolector[];
  onImprimir: (recolector: ResumenRecolector) => void;
}

export function ListaRecolectores({
  recolectores,
  onImprimir,
}: PropiedadesLista) {
  const resumenRecolectores = React.useMemo(() => {
    const resumen = new Map<string, ResumenRecolector>();

    recolectores.forEach((recolector) => {
      const existente = resumen.get(recolector.nombre);
      if (existente) {
        existente.totalKilos += recolector.kilos;
        existente.totalPago += recolector.total;
        existente.registros.push(recolector);
      } else {
        resumen.set(recolector.nombre, {
          nombre: recolector.nombre,
          totalKilos: recolector.kilos,
          totalPago: recolector.total,
          registros: [recolector],
        });
      }
    });

    return Array.from(resumen.values());
  }, [recolectores]);

  return (
    <div className="space-y-8">
      {resumenRecolectores.map((resumen) => (
        <div
          key={resumen.nombre}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="px-6 py-5 bg-gradient-to-r from-green-50 to-green-100 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {resumen.nombre}
              </h3>
              <div className="mt-1 space-x-4">
                <span className="text-green-800 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                  Total Kilos: {resumen.totalKilos.toFixed(1)} kg
                </span>
                <span className="text-green-800 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                  Total a Pagar: ${resumen.totalPago.toLocaleString("es-CO")}
                </span>
              </div>
            </div>
            <button
              onClick={() => onImprimir(resumen)}
              className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 border border-green-200 shadow-sm"
            >
              <Printer className="h-5 w-5" />
              <span className="font-medium">Imprimir</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kilos
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Precio/Kilo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resumen.registros
                  .sort(
                    (a, b) =>
                      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
                  )
                  .map((registro) => (
                    <tr
                      key={registro.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(registro.fecha).toLocaleDateString("es-CO")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registro.kilos} kg
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${registro.precioPorKilo.toLocaleString("es-CO")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${registro.total.toLocaleString("es-CO")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
