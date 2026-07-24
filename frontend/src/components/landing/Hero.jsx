import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-[88vh] bg-slate-900 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          <span className="inline-block bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ♻ AI Powered Sustainability Platform
          </span>

          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Smart
            <span className="text-cyan-400"> Textile Waste </span>
            Management
          </h1>

          <p className="mt-8 text-xl text-gray-400 leading-8">
            Upload textile waste images, classify fabrics using AI,
            monitor inventory, and generate sustainability reports
            in one intelligent platform.
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/login"
              className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={20}/>
            </Link>

            <button className="border border-cyan-500 text-cyan-400 px-8 py-4 rounded-xl font-semibold hover:bg-cyan-500 hover:text-white transition">
              Learn More
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex justify-center">

          <div className="w-[420px] h-[420px] rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">

            <div className="text-center">

              <div className="text-8xl mb-4">
                ♻
              </div>

              <h2 className="text-3xl font-bold text-white">
                AI Textile Scanner
              </h2>

              <p className="text-white/80 mt-3">
                Image Classification
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;