import React from "react";
import { ResumenRecolector } from "../../types/Worker";
import { Coffee, X, Printer } from "lucide-react";

interface PropiedadesRecibo {
  recolector: ResumenRecolector;
  onCerrar: () => void;
}

export function Recibo({ recolector, onCerrar }: PropiedadesRecibo) {
  const reciboRef = React.useRef<HTMLDivElement>(null);

  const imprimirRecibo = () => {
    const contenido = reciboRef.current;
    if (!contenido) return;

    const ventanaImpresion = window.open("", "_blank");
    if (!ventanaImpresion) return;

    const estilos = `
      body { 
        font-family: system-ui, -apple-system, sans-serif;
        padding: 40px;
        margin: 0;
        color: #1a1a1a;
        background-color: #ffffff;
      }
      .recibo { 
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
        border: 2px solid #16a34a;
        border-radius: 12px;
      }
      .encabezado { 
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 2px solid #16a34a;
      }
      .detalles { 
        margin-bottom: 40px;
        line-height: 1.8;
      }
      .tabla-registros {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin-bottom: 40px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
      }
      .tabla-registros th,
      .tabla-registros td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
      }
      .tabla-registros th {
        background-color: #f9fafb;
        font-weight: 600;
        color: #4b5563;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
      }
      .tabla-registros tr:last-child td {
        border-bottom: none;
      }
      .total {
        text-align: right;
        font-size: 1.25rem;
        font-weight: 600;
        padding-top: 20px;
        border-top: 2px solid #16a34a;
        color: #16a34a;
      }
      @media print {
        body { 
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
          padding: 0;
        }
        .recibo {
          border: none;
          padding: 0;
        }
      }
    `;

    ventanaImpresion.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Recibo de Pago - ${recolector.nombre}</title>
          <meta charset="UTF-8">
          <style>${estilos}</style>
        </head>
        <body>
          <div class="recibo">
            <div class="encabezado">
              <h1 style="margin: 0 0 10px 0; color: #16a34a; font-size: 2rem;">Finca Cafetera</h1>
              <h2 style="margin: 0; color: #4b5563; font-size: 1.5rem;">Recibo de Pago</h2>
            </div>
            
            <div class="detalles">
              <p><strong>Recolector:</strong> ${recolector.nombre}</p>
              <p><strong>Período:</strong> ${new Date(
                recolector.registros[0].fecha
              ).toLocaleDateString("es-CO")} - ${new Date(
      recolector.registros[recolector.registros.length - 1].fecha
    ).toLocaleDateString("es-CO")}</p>
              <p><strong>Total Kilos:</strong> ${recolector.totalKilos.toFixed(
                1
              )} kg</p>
            </div>

            <table class="tabla-registros">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Kilos</th>
                  <th>Precio/Kilo</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${recolector.registros
                  .sort(
                    (a, b) =>
                      new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
                  )
                  .map(
                    (registro) => `
                    <tr>
                      <td>${new Date(registro.fecha).toLocaleDateString(
                        "es-CO"
                      )}</td>
                      <td>${registro.kilos} kg</td>
                      <td>$${registro.precioPorKilo.toLocaleString(
                        "es-CO"
                      )}</td>
                      <td>$${registro.total.toLocaleString("es-CO")}</td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="total">
              <p>Total a Pagar: $${recolector.totalPago.toLocaleString(
                "es-CO"
              )}</p>
            </div>
          </div>
        </body>
      </html>
    `);

    ventanaImpresion.document.close();
    setTimeout(() => {
      ventanaImpresion.print();
    }, 250);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center">
            <Coffee className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Recibo de Pago</h2>
          </div>
          <button
            onClick={onCerrar}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div ref={reciboRef} className="p-8">
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Información del Recolector
              </h3>
              <p className="mt-2 text-gray-600">
                <span className="font-medium">Nombre:</span> {recolector.nombre}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total Kilos:</span>{" "}
                {recolector.totalKilos.toFixed(1)} kg
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total a Pagar:</span> $
                {recolector.totalPago.toLocaleString("es-CO")}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
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
                  {recolector.registros
                    .sort(
                      (a, b) =>
                        new Date(a.fecha).getTime() -
                        new Date(b.fecha).getTime()
                    )
                    .map((registro) => (
                      <tr key={registro.id} className="hover:bg-gray-50">
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
        </div>

        <div className="border-t px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={imprimirRecibo}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <Printer className="h-5 w-5" />
            <span>Imprimir Recibo</span>
          </button>
          <button
            onClick={onCerrar}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
