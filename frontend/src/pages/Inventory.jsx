import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import InventoryTable from "../components/inventory/InventoryTable";
import { useState } from "react";
import AddInventoryModal from "../components/inventory/AddInventoryModal";

function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">

        <Header />

        {/* Inventory Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Inventory Management
            </h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              + Add Waste
            </button>

          </div>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by Batch ID, Fabric Type..."
            className="mt-6 w-full border rounded-lg p-3"
          />

          <InventoryTable refresh={refresh} />

        </div>

      </div>

      <AddInventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInventoryAdded={() => setRefresh(!refresh)}
      />

    </div>
  );
}

export default Inventory;