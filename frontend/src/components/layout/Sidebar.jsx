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
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-cyan-400">
          Textile AI
        </h1>
      </div>

      <nav className="p-4 space-y-2">

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <Boxes size={20} />
          Inventory
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <Upload size={20} />
          Upload Waste
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <BrainCircuit size={20} />
          AI Prediction
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <BarChart3 size={20} />
          Reports
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <History size={20} />
          History
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <User size={20} />
          Profile
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <Settings size={20} />
          Settings
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-900/20">
          <LogOut size={20} />
          Logout
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;