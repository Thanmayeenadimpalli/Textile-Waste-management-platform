import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatsCards from "../components/dashboard/StatsCards";

function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-6">
        <Header />
        <StatsCards />
      </div>
    </div>
  );
}

export default Dashboard;