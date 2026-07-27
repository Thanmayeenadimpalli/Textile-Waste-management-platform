import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatsCards from "../components/dashboard/StatsCards";
import PieChartCard from "../components/dashboard/PieChartCard";
import { getDashboardStats } from "../services/dashboardService";
import BarChartCard from "../components/dashboard/BarChartCard";
import LineChartCard from "../components/dashboard/LineChartCard";

function Dashboard() {
  const [chartData, setChartData] = useState([]);
const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setChartData(data.chart_data);
      setTrendData(data.trend_data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-6">
        <Header />

        <StatsCards />

        <PieChartCard data={chartData} />

        <BarChartCard data={chartData} />

        <LineChartCard data={trendData} />
      </div>
    </div>
  );
}

export default Dashboard;