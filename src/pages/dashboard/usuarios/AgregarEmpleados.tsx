
import { UserPlus } from "lucide-react";

import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";


export const AgregarPersonal = () => {


  return (
    <div className="flex h-auto bg-gray-100 py-12 text-gray-500 sm:px-6 lg:px-8">
      <form className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto ">
        <div className="flex items-center justify-center gap-2 mb-6">
          <UserPlus className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Agregar Nuevo Trabajador
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Nombre" name="name" required />

          <TextField label="Teléfono" name="phone" type="tel" required />

          <TextField
            label="Correo Electrónico"
            name="email"
            type="email"
            required
          />

          <TextField label="Localidad" name="location" required />
        </div>
        <div className="grid grid-cols-1 my-5">
        <TextField label="Información Adicional" name="additionalInfo" />

        </div>

        <div className="mt-4 mb-1">
          <FormControl className="w-full">
            <InputLabel id="demo-controlled-open-select-label">
              Selecione su rol
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              label="Selecione su rol"
            >
              <MenuItem value="">
                <em>Seleccione un rol</em>
              </MenuItem>
              <MenuItem value={10}>Administrador</MenuItem>
              <MenuItem value={20}>Empleado</MenuItem>
            </Select>
          </FormControl>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <UserPlus className="h-5 w-5" />
          Agregar Trabajador
        </button>
      </form>
    </div>
  );
};
