import React from "react";
import { Recolector, PagoRecolector } from "../../types/Worker";

interface PropiedadesFormulario {
  onSubmit: (recolector: Omit<Recolector, "id">) => void;
  recolectoresExistentes: PagoRecolector[];
}

export function FormularioRecolector({
  onSubmit,
  recolectoresExistentes,
}: PropiedadesFormulario) {
  const [datosFormulario, setDatosFormulario] = React.useState({
    nombre: "",
    kilos: 0,
    precioPorKilo: 0,
    fecha: new Date().toISOString().split("T")[0],
  });

  const [esNuevoRecolector, setEsNuevoRecolector] = React.useState(false);
  const [nombreNuevoRecolector, setNombreNuevoRecolector] = React.useState("");

  const nombresUnicos = Array.from(
    new Set(recolectoresExistentes.map((r) => r.nombre))
  );

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    const nombreFinal = esNuevoRecolector
      ? nombreNuevoRecolector
      : datosFormulario.nombre;
    onSubmit({
      ...datosFormulario,
      nombre: nombreFinal,
    });
    setDatosFormulario((prev) => ({
      ...prev,
      kilos: 0,
      fecha: new Date().toISOString().split("T")[0],
    }));
    if (esNuevoRecolector) {
      setNombreNuevoRecolector("");
      setEsNuevoRecolector(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Recolector
        </label>
        <div className="relative">
          {!esNuevoRecolector && nombresUnicos.length > 0 ? (
            <div className="flex gap-2">
              <select
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors duration-200 bg-white shadow-lg"
                value={datosFormulario.nombre}
                onChange={(e) => {
                  if (e.target.value === "__nuevo__") {
                    setEsNuevoRecolector(true);
                    setDatosFormulario((prev) => ({ ...prev, nombre: "" }));
                  } else {
                    setDatosFormulario((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }));
                  }
                }}
              >
                <option value="">Seleccionar recolector</option>
                {nombresUnicos.map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))}
                <option value="__nuevo__">+ Agregar nuevo recolector</option>
              </select>
            </div>
          ) : (
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors duration-200 bg-white shadow-sm"
              value={
                esNuevoRecolector
                  ? nombreNuevoRecolector
                  : datosFormulario.nombre
              }
              onChange={(e) => {
                if (esNuevoRecolector) {
                  setNombreNuevoRecolector(e.target.value);
                } else {
                  setDatosFormulario((prev) => ({
                    ...prev,
                    nombre: e.target.value,
                  }));
                }
              }}
              placeholder="Nombre completo"
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kilos Recolectados
        </label>
        <div className="relative">
          <input
            type="number"
            required
            min="0"
            step="0.1"
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors duration-200 bg-white shadow-sm"
            value={datosFormulario.kilos || ""}
            onChange={(e) =>
              setDatosFormulario((prev) => ({
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Precio por Kilo (COP)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            required
            min="0"
            className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors duration-200 bg-white shadow-sm"
            value={datosFormulario.precioPorKilo || ""}
            onChange={(e) =>
              setDatosFormulario((prev) => ({
                ...prev,
                precioPorKilo: parseFloat(e.target.value),
              }))
            }
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha
        </label>
        <input
          type="date"
          required
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors duration-200 bg-white shadow-sm"
          value={datosFormulario.fecha}
          onChange={(e) =>
            setDatosFormulario((prev) => ({ ...prev, fecha: e.target.value }))
          }
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
        disabled={!datosFormulario.nombre && !nombreNuevoRecolector}
      >
        Registrar Recolección
      </button>
    </form>
  );
}
