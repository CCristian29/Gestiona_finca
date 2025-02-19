import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";


const RegistrarU = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4.5rem)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>

        <form>
          <div className="mb-4">
            <TextField
              className="w-full"
              id="nombre"
              label="Nombre"
              variant="outlined"
              type="text"
              required
              margin="normal"
            />
            <TextField
              className="w-full"
              id="apellido"
              label="Apellido"
              variant="outlined"
              type="text"
              required
              margin="normal"
            />

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

            <TextField
              className="w-full"
              id="email"
              label="Correo"
              variant="outlined"
              type="email"
              required
              margin="normal"
            />

            <TextField
              className="w-full"
              id="password"
              label="Contraseña"
              variant="outlined"
              type="password"
              required
              margin="normal"
            />
          </div>

          <Button
            className="w-full"
            variant="contained"
            color="success"
            type="submit"
          >
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarU;
