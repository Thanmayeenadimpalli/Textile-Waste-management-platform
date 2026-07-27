import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import InventoryTable from "../components/inventory/InventoryTable";
import AddInventoryModal from "../components/inventory/AddInventoryModal";

import InventoryStatsCard from "../components/inventory/InventoryStatsCard";
import FabricChart from "../components/inventory/FabricChart";
import SourceChart from "../components/inventory/SourceChart";
import QuantityChart from "../components/inventory/QuantityChart";

import { getInventoryStats } from "../services/inventoryService";

function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState(null);

  const [stats, setStats] = useState({
    total_inventory: 0,
    fabric_chart: [],
    source_chart: [],
    quantity_chart: [],
  });

  useEffect(() => {
    loadInventoryStats();
  }, [refresh]);

  const loadInventoryStats = async () => {
    try {
      const data = await getInventoryStats();

      setStats({
        total_inventory: data.total_inventory,
        fabric_chart: data.fabric_chart,
        source_chart: data.source_chart,
        quantity_chart: data.quantity_chart,
      });
    } catch (error) {
      console.error("Failed to load inventory analytics", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-6">
        <Header />

        {/* Inventory Analytics */}
        <InventoryStatsCard
          totalInventory={stats.total_inventory}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FabricChart data={stats.fabric_chart} />

          <SourceChart data={stats.source_chart} />
        </div>

        <div className="mb-8">
          <QuantityChart data={stats.quantity_chart} />
        </div>

        {/* Inventory Section */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Inventory Management
            </h2>

            <button
              onClick={() => {
                setEditData(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Waste
            </button>

          </div>

          <input
            type="text"
            placeholder="Search by Batch ID, Fabric Type..."
            className="mt-6 w-full border rounded-lg p-3"
          />

          <InventoryTable
            refresh={refresh}
            onEdit={(item) => {
              setEditData(item);
              setIsModalOpen(true);
            }}
          />

        </div>
      </div>

      <AddInventoryModal
        isOpen={isModalOpen}
        editData={editData}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onInventoryAdded={() => {
          setRefresh((prev) => !prev);
        }}
      />
    </div>
  );
}

export default Inventory;