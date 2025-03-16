import React from "react";
import { WorkerPayment, WorkerSummary } from "../../types/Worker";
import { Printer } from "lucide-react";

interface WorkersListProps {
  workers: WorkerPayment[];
  onPrint: (worker: WorkerSummary) => void;
}

export function WorkersList({ workers, onPrint }: WorkersListProps) {
  const workerSummaries = React.useMemo(() => {
    const summaries = new Map<string, WorkerSummary>();

    workers.forEach((worker) => {
      const existing = summaries.get(worker.name);
      if (existing) {
        existing.totalKilos += worker.kilos;
        existing.totalAmount += worker.total;
        existing.records.push(worker);
      } else {
        summaries.set(worker.name, {
          name: worker.name,
          totalKilos: worker.kilos,
          totalAmount: worker.total,
          records: [worker],
        });
      }
    });

    return Array.from(summaries.values());
  }, [workers]);

  return (
    <div className="space-y-8">
      {workerSummaries.map((summary) => (
        <div
          key={summary.name}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="px-6 py-5 bg-gradient-to-r from-green-50 to-green-100 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {summary.name}
              </h3>
              <div className="mt-1 space-x-4">
                <span className="text-green-800 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                  Total Kilos: {summary.totalKilos.toFixed(1)} kg
                </span>
                <span className="text-green-800 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                  Total a Pagar: ${summary.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => onPrint(summary)}
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
                {summary.records
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
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
      ))}
    </div>
  );
}
