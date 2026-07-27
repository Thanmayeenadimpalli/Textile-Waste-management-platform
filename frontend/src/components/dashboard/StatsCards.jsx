import { useEffect, useState } from "react";
import {
  BrainCircuit,
  BarChart3,
  Trophy,
} from "lucide-react";

import { getDashboardStats } from "../../services/dashboardService";

function StatsCards() {

  const [stats, setStats] = useState({
    total_predictions: 0,
    average_confidence: 0,
    most_common: "N/A",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Total Predictions",
      value: stats.total_predictions,
      icon: <BrainCircuit size={28} className="text-purple-600" />,
    },
    {
      title: "Average Confidence",
      value: `${stats.average_confidence}%`,
      icon: <BarChart3 size={28} className="text-orange-600" />,
    },
    {
      title: "Most Common Textile",
      value: stats.most_common,
      icon: <Trophy size={28} className="text-green-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
        >
          <div>
            <h3 className="text-gray-500">{card.title}</h3>
            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>
          </div>

          {card.icon}
        </div>
      ))}
    </div>
  );
}

export default StatsCards;