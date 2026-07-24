import {
  Boxes,
  Recycle,
  BrainCircuit,
  BarChart3,
} from "lucide-react";

function StatsCards() {
  const cards = [
    {
      title: "Total Waste",
      value: "250 Kg",
      icon: <Recycle size={28} className="text-green-600" />,
    },
    {
      title: "Inventory Items",
      value: "125",
      icon: <Boxes size={28} className="text-blue-600" />,
    },
    {
      title: "AI Predictions",
      value: "89",
      icon: <BrainCircuit size={28} className="text-purple-600" />,
    },
    {
      title: "Recycling Rate",
      value: "87%",
      icon: <BarChart3 size={28} className="text-orange-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
        >
          <div>
            <h3 className="text-gray-500">{card.title}</h3>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>

          {card.icon}
        </div>
      ))}
    </div>
  );
}

export default StatsCards;