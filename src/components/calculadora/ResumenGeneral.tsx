import React from 'react';
import { PagoRecolector } from '../../types/Worker';
import { Coffee, X, Printer } from 'lucide-react';

interface PropiedadesResumenGeneral {
  recolectores: PagoRecolector[];
  onCerrar: () => void;
}

export function ResumenGeneral({ recolectores, onCerrar }: PropiedadesResumenGeneral) {
  const resumenRef = React.useRef<HTMLDivElement>(null);

  const totalKilos = recolectores.reduce((sum, r) => sum + r.kilos, 0);
  const totalPago = recolectores.reduce((sum, r) => sum + r.total, 0);
  const recolectoresUnicos = Array.from(new Set(recolectores.map(r => r.nombre)));

  const imprimirResumen = () => {
    const contenido = resumenRef.current;
    if (!contenido) return;

    const ventanaImpresion = window.open('', '_blank');
    if (!ventanaImpresion) return;

    const fechaInicio = new Date(Math.min(...recolectores.map(r => new Date(r.fecha).getTime())));
    const fechaFin = new Date(Math.max(...recolectores.map(r => new Date(r.fecha).getTime())));

    const estilos = `
      body { 
        font-family: system-ui, -apple-system, sans-serif;
        padding: 40px;
        margin: 0;
        color: #1a1a1a;
        background-color: #ffffff;
      }
      .resumen { 
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
      .tabla-resumen {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin-bottom: 40px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
      }
      .tabla-resumen th,
      .tabla-resumen td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
      }
      .tabla-resumen th {
        background-color: #f9fafb;
        font-weight: 600;
        color: #4b5563;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
      }
      .tabla-resumen tr:last-child td {
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
        .resumen {
          border: none;
          padding: 0;
        }
      }
    `;

    ventanaImpresion.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resumen General - Finca Cafetera</title>
          <meta charset="UTF-8">
          <style>${estilos}</style>
        </head>
        <body>
          <div class="resumen">
            <div class="encabezado">
              <h1 style="margin: 0 0 10px 0; color: #16a34a; font-size: 2rem;">Finca Cafetera</h1>
              <h2 style="margin: 0; color: #4b5563; font-size: 1.5rem;">Resumen General de Recolección</h2>
            </div>
            
            <div class="detalles">
              <p><strong>Período:</strong> ${fechaInicio.toLocaleDateString('es-CO')} - ${fechaFin.toLocaleDateString('es-CO')}</p>
              <p><strong>Total Recolectores:</strong> ${recolectoresUnicos.length}</p>
              <p><strong>Total Kilos:</strong> ${totalKilos.toFixed(1)} kg</p>
              <p><strong>Total a Pagar:</strong> $${totalPago.toLocaleString('es-CO')}</p>
            </div>

            <table class="tabla-resumen">
              <thead>
                <tr>
                  <th>Recolector</th>
                  <th>Total Kilos</th>
                  <th>Total a Pagar</th>
                </tr>
              </thead>
              <tbody>
                ${recolectoresUnicos.map(nombre => {
                  const registrosRecolector = recolectores.filter(r => r.nombre === nombre);
                  const kilosRecolector = registrosRecolector.reduce((sum, r) => sum + r.kilos, 0);
                  const pagoRecolector = registrosRecolector.reduce((sum, r) => sum + r.total, 0);
                  return `
                    <tr>
                      <td>${nombre}</td>
                      <td>${kilosRecolector.toFixed(1)} kg</td>
                      <td>$${pagoRecolector.toLocaleString('es-CO')}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>

            <div class="total">
              <p>Total General: $${totalPago.toLocaleString('es-CO')}</p>
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
            <h2 className="text-2xl font-bold text-gray-900">Resumen General</h2>
          </div>
          <button
            onClick={onCerrar}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div ref={resumenRef} className="p-8">
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-6">
                <p className="text-center text-gray-600 text-sm mb-1">Total Recolectores</p>
                <p className="text-center text-2xl font-bold text-gray-900">{recolectoresUnicos.length}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <p className="text-center text-gray-600 text-sm mb-1">Total Kilos</p>
                <p className="text-center text-2xl font-bold text-gray-900">{totalKilos.toFixed(1)} kg</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <p className="text-center text-gray-600 text-sm mb-1">Total a Pagar</p>
                <p className="text-center text-2xl font-bold text-gray-900">${totalPago.toLocaleString('es-CO')}</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Recolector
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Kilos
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total a Pagar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recolectoresUnicos.map(nombre => {
                    const registrosRecolector = recolectores.filter(r => r.nombre === nombre);
                    const kilosRecolector = registrosRecolector.reduce((sum, r) => sum + r.kilos, 0);
                    const pagoRecolector = registrosRecolector.reduce((sum, r) => sum + r.total, 0);
                    return (
                      <tr key={nombre} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {kilosRecolector.toFixed(1)} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${pagoRecolector.toLocaleString('es-CO')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="border-t px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={imprimirResumen}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <Printer className="h-5 w-5" />
            <span>Imprimir Resumen</span>
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