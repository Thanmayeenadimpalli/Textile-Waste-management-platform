import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import Workflow from "../components/landing/Workflow";
import TechStack from "../components/landing/TechStack";
import Footer from "../components/landing/Footer";
function Landing() {
  return (
    <div className="bg-slate-900">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Workflow />
      <TechStack />
      <Footer />
    </div>
  );
}

export default Landing;