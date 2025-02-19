import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className="relative h-[600px] bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1684226910423-a4eb43a03257?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto h-full flex items-center px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Sistema de Gestión para Fincas Cafeteras
            </h1>
            <p className="text-xl mb-8">
              Optimice la administración de su finca cafetera con nuestra
              plataforma integral
            </p>
            <Link
              to="/IniciarSesion"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Comenzar Ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
