import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const IniciarSesion = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      alert(response.data.message);
      // Aquí puedes redirigir al usuario o guardar el token de autenticación
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.detail || "Error al iniciar sesión");
      } else {
        alert("Error desconocido al iniciar sesión");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4.5rem)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <TextField
              className="w-full"
              id="email"
              label="Correo"
              variant="outlined"
              type="email"
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              className="w-full"
              id="password"
              label="Contraseña"
              variant="outlined"
              type="password"
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
