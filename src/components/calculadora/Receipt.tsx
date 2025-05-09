import React from "react";
import { WorkerSummary } from "../../types/Worker";
import { Coffee, X } from "lucide-react";

interface ReceiptProps {
  worker: WorkerSummary;
  onClose: () => void;
}

export function Receipt({ worker, onClose }: ReceiptProps) {
  const receiptRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = receiptRef.current;
    if (!content) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const styles = `
      body { 
        font-family: system-ui, -apple-system, sans-serif;
        padding: 40px;
        margin: 0;
        color: #1a1a1a;
        background-color: #ffffff;
      }
      .receipt { 
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
        border: 2px solid #16a34a;
        border-radius: 12px;
      }
      .header { 
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 2px solid #16a34a;
      }
      .details { 
        margin-bottom: 40px;
        line-height: 1.8;
      }
      .records-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin-bottom: 40px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
      }
      .records-table th,
      .records-table td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
      }
      .records-table th {
        background-color: #f9fafb;
        font-weight: 600;
        color: #4b5563;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
      }
      .records-table tr:last-child td {
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
        .receipt {
          border: none;
          padding: 0;
        }
      }
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Recibo de Pago - ${worker.name}</title>
          <meta charset="UTF-8">
          <style>${styles}</style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1 style="margin: 0 0 10px 0; color: #16a34a; font-size: 2rem;">Finca Cafetera</h1>
              <h2 style="margin: 0; color: #4b5563; font-size: 1.5rem;">Recibo de Pago</h2>
            </div>
            
            <div class="details">
              <p><strong>Recolector:</strong> ${worker.name}</p>
              <p><strong>Período:</strong> ${new Date(
                worker.records[0].date
              ).toLocaleDateString()} - ${new Date(
      worker.records[worker.records.length - 1].date
    ).toLocaleDateString()}</p>
              <p><strong>Total Kilos:</strong> ${worker.totalKilos.toFixed(
                1
              )} kg</p>
            </div>

            <table class="records-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Kilos</th>
                  <th>Precio/Kilo</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${worker.records
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  .map(
                    (record) => `
                    <tr>
                      <td>${new Date(record.date).toLocaleDateString()}</td>
                      <td>${record.kilos} kg</td>
                      <td>$${record.pricePerKilo.toLocaleString()}</td>
                      <td>$${record.total.toLocaleString()}</td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
            </table>

            <div class="total">
              <p>Total a Pagar: $${worker.totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
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
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div ref={receiptRef} className="p-8">
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Información del Recolector
              </h3>
              <p className="mt-2 text-gray-600">
                <span className="font-medium">Nombre:</span> {worker.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total Kilos:</span>{" "}
                {worker.totalKilos.toFixed(1)} kg
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Total a Pagar:</span> $
                {worker.totalAmount.toLocaleString()}
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
                  {worker.records
                    .sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    )
                    .map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.kilos} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${record.pricePerKilo.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${record.total.toLocaleString()}
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
            onClick={handlePrint}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 font-medium flex items-center space-x-2"
          >
            <Printer className="h-5 w-5" />
            <span>Imprimir Recibo</span>
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
