import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white w-64 p-4 space-y-6 shadow-lg ${sidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-xl font-bold" id="box">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <span>🏠</span>
              <span>Home</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📊</span>
              <span>Analytics</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white p-4 shadow-md flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 border rounded">
            ☰
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl font-bold">$12,500</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">New Users</h3>
            <p className="text-2xl font-bold">1,250</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-2xl font-bold">340</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="p-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
