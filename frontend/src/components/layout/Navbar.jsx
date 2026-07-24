import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-cyan-400">
          TextileAI
        </h1>

        <div className="flex gap-8 text-lg">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;