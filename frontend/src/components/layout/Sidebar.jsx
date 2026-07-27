import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Upload,
  BrainCircuit,
  BarChart3,
  History,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-white hover:bg-slate-800"
    }`;

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-cyan-400">
          Textile AI
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/inventory" className={linkClass}>
          <Boxes size={20} />
          <span>Inventory</span>
        </NavLink>

        <NavLink to="/upload" className={linkClass}>
          <Upload size={20} />
          <span>Upload Waste</span>
        </NavLink>

        <NavLink to="/prediction" className={linkClass}>
          <BrainCircuit size={20} />
          <span>AI Prediction</span>
        </NavLink>

        <NavLink to="/reports" className={linkClass}>
          <BarChart3 size={20} />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/history" className={linkClass}>
          <History size={20} />
          <span>History</span>
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        <NavLink
          to="/login"
          className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </NavLink>

      </nav>

    </div>
  );
}

export default Sidebar;