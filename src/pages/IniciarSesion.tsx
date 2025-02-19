import { TextField, Button } from '@mui/material';

const IniciarSesion = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4.5rem)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <form>
          <div className="mb-4">
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
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;
