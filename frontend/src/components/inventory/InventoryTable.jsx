import { useEffect, useState } from "react";
import { getInventory } from "../../services/inventoryService";

function InventoryTable({ refresh, onEdit }) {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const response = await getInventory();
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [refresh]);

  return (
    <div className="bg-white rounded-xl shadow-md mt-6 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="p-4 text-left">Batch ID</th>
            <th className="p-4 text-left">Fabric Type</th>
            <th className="p-4 text-left">Source</th>
            <th className="p-4 text-left">Quantity</th>
            <th className="p-4 text-left">Color</th>
            <th className="p-4 text-left">Condition</th>
            <th className="p-4 text-left">Collection Date</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{item.waste_batch_id}</td>
              <td className="p-4">{item.fabric_type}</td>
              <td className="p-4">{item.source}</td>
              <td className="p-4">{item.quantity} Kg</td>
              <td className="p-4">{item.color}</td>
              <td className="p-4">{item.condition}</td>
              <td className="p-4">{item.collection_date}</td>

              <td className="p-4 text-center">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800 mr-4 font-medium"
                >
                  Edit
                </button>

                <button
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;