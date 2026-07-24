import { Database, Recycle, Leaf, Brain } from "lucide-react";

function Stats() {
  const stats = [
    {
      icon: <Database size={42} />,
      number: "5,000+",
      title: "Waste Batches",
    },
    {
      icon: <Brain size={42} />,
      number: "95%",
      title: "AI Accuracy",
    },
    {
      icon: <Recycle size={42} />,
      number: "120 Tons",
      title: "Waste Recycled",
    },
    {
      icon: <Leaf size={42} />,
      number: "80%",
      title: "CO₂ Reduction",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white mb-16">
          Project Statistics
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 rounded-3xl p-10 text-center shadow-xl hover:scale-105 duration-300"
            >

              <div className="text-cyan-400 flex justify-center mb-5">

                {item.icon}

              </div>

              <h1 className="text-4xl font-bold text-white">

                {item.number}

              </h1>

              <p className="text-gray-400 mt-3">

                {item.title}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;