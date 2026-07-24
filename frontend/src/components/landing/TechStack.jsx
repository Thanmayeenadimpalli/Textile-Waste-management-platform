const tech = [
  "React",
  "Tailwind CSS",
  "Flask",
  "TensorFlow",
  "MySQL",
  "OpenCV",
];

function TechStack() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white mb-16">
          Technology Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

          {tech.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-xl p-8 text-center text-cyan-400 font-bold text-xl hover:bg-cyan-500 hover:text-white transition"
            >
              {item}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TechStack;