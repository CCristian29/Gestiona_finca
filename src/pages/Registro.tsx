import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const RegistrarU = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rol, setRol] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          nombre,
          apellido,
          rol,
          email,
          password,
        }
      );

      alert(response.data.message);
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>

        <form onSubmit={handleRegister}>
          <TextField
            className="w-full"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <FormControl className="w-full mt-4">
            <InputLabel>Rol</InputLabel>
            <Select
              value={rol}
              onChange={(e) => setRol(e.target.value as string)}
              required
            >
              <MenuItem value="Administrador">Administrador</MenuItem>
              <MenuItem value="Empleado">Empleado</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className="w-full"
            label="Correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            className="w-full mt-4"
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
