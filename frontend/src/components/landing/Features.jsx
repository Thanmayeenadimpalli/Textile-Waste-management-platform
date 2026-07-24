import { Brain, BarChart3, Recycle, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Brain size={40} />,
    title: "AI Fabric Classification",
    description:
      "Upload a textile image and let our AI identify the fabric type with high accuracy.",
  },
  {
    icon: <BarChart3 size={40} />,
    title: "Analytics Dashboard",
    description:
      "Visualize waste statistics, recycling trends, and environmental impact.",
  },
  {
    icon: <Recycle size={40} />,
    title: "Circular Economy",
    description:
      "Get recycling recommendations to maximize textile reuse and reduce waste.",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Inventory Management",
    description:
      "Track every textile waste batch from collection to recycling.",
  },
];

function Features() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white">
          Features
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-16">
          Everything you need to manage textile waste intelligently.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 hover:-translate-y-2 transition duration-300 shadow-lg"
            >
              <div className="text-cyan-400 mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold text-white mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;