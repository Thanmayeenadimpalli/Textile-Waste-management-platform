import {
  Upload,
  Image,
  Brain,
  Recycle,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    icon: <Upload size={40} />,
    title: "Upload Image",
  },
  {
    icon: <Image size={40} />,
    title: "Image Processing",
  },
  {
    icon: <Brain size={40} />,
    title: "AI Prediction",
  },
  {
    icon: <Recycle size={40} />,
    title: "Recycling Suggestion",
  },
  {
    icon: <BarChart3 size={40} />,
    title: "Analytics",
  },
];

function Workflow() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white mb-16">
          AI Workflow
        </h2>

        <div className="grid md:grid-cols-5 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 text-center hover:scale-105 transition"
            >
              <div className="text-cyan-400 flex justify-center mb-5">
                {step.icon}
              </div>

              <h3 className="text-xl text-white font-semibold">
                {step.title}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Workflow;