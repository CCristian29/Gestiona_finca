export default function Perfil (){
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Perfil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example dashboard cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Active Projects</h2>
            <p className="text-3xl font-bold text-green-600">56</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Revenue</h2>
            <p className="text-3xl font-bold text-purple-600">$45,678</p>
          </div>
        </div>
      </div>
    );
}