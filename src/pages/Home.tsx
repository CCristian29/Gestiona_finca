import { Coffee, LineChart, Users, Sprout } from "lucide-react";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeactureCard";
import Footer from "../components/Footer";
const features = [
  {
    icon: <Sprout className="w-12 h-12 text-green-600" />,
    title: "Gestión de Cultivos",
    description: "Control detallado de sus plantaciones de café",
  },
  {
    icon: <LineChart className="w-12 h-12 text-green-600" />,
    title: "Análisis de Producción",
    description: "Estadísticas y reportes de su producción",
  },
  {
    icon: <Users className="w-12 h-12 text-green-600" />,
    title: "Gestión de Personal",
    description: "Administre su equipo de trabajo eficientemente",
  },
  {
    icon: <Coffee className="w-12 h-12 text-green-600" />,
    title: "Calidad del Café",
    description: "Control de calidad y trazabilidad",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      <HeroSection />

      {/* Features Section */}
      <div className="py-20 bg-gray-50" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestra Experiencia en el Campo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src="https://images.unsplash.com/photo-1524350876685-274059332603?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Coffee plantation rows"
              className="rounded-lg shadow-lg h-64 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Coffee cherries"
              className="rounded-lg shadow-lg h-64 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1521574873411-508db8dbe55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Coffee processing"
              className="rounded-lg shadow-lg h-64 w-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
