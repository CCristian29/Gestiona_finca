import React from "react";
import { Worker, WorkerPayment } from "../../types/Worker";

interface WorkerFormProps {
  onSubmit: (worker: Omit<Worker, "id">) => void;
  existingWorkers: WorkerPayment[];
}

export function WorkerForm({ onSubmit, existingWorkers }: WorkerFormProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    kilos: 0,
    pricePerKilo: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const [isNewWorker, setIsNewWorker] = React.useState(false);
  const [newWorkerName, setNewWorkerName] = React.useState("");

  // Obtener nombres únicos de recolectores
  const uniqueWorkers = Array.from(new Set(existingWorkers.map((w) => w.name)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = isNewWorker ? newWorkerName : formData.name;
    onSubmit({
      ...formData,
      name: finalName,
    });
    setFormData((prev) => ({
      ...prev,
      kilos: 0,
      date: new Date().toISOString().split("T")[0],
    }));
    if (isNewWorker) {
      setNewWorkerName("");
      setIsNewWorker(false);
    }
  };

  const inputBaseClasses =
    "block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors duration-200 bg-white shadow-sm";
  const labelBaseClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className={labelBaseClasses}>Nombre del Recolector</label>
        <div className="relative">
          {!isNewWorker && uniqueWorkers.length > 0 ? (
            <div className="flex gap-2">
              <select
                className={`${inputBaseClasses} appearance-none`}
                value={formData.name}
                onChange={(e) => {
                  if (e.target.value === "__new__") {
                    setIsNewWorker(true);
                    setFormData((prev) => ({ ...prev, name: "" }));
                  } else {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                  }
                }}
              >
                <option value="">Seleccionar recolector</option>
                {uniqueWorkers.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
                <option value="__new__">+ Agregar nuevo recolector</option>
              </select>
            </div>
          ) : (
            <input
              type="text"
              className={inputBaseClasses}
              value={isNewWorker ? newWorkerName : formData.name}
              onChange={(e) => {
                if (isNewWorker) {
                  setNewWorkerName(e.target.value);
                } else {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                }
              }}
              placeholder="Nombre completo"
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelBaseClasses}>Kilos Recolectados</label>
        <div className="relative">
          <input
            type="number"
            required
            min="0"
            step="0.1"
            className={inputBaseClasses}
            value={formData.kilos || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                kilos: parseFloat(e.target.value),
              }))
            }
            placeholder="0.0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            kg
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelBaseClasses}>Precio por Kilo</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            required
            min="0"
            step="100"
            className={`${inputBaseClasses} pl-8`}
            value={formData.pricePerKilo || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                pricePerKilo: parseFloat(e.target.value),
              }))
            }
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelBaseClasses}>Fecha</label>
        <input
          type="date"
          required
          className={inputBaseClasses}
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
        disabled={!formData.name && !newWorkerName}
      >
        Registrar Recolección
      </button>
    </form>
  );
}
