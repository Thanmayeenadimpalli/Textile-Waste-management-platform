import { useEffect, useState } from "react";
import { getInventory } from "../../services/inventoryService";

function InventoryTable({ refresh }) {
    const [inventory, setInventory] = useState([]);
    useEffect(() => {
  fetchInventory();
}, [refresh]);

const fetchInventory = async () => {
  try {
    const response = await getInventory();
    setInventory(response.data);
  } catch (error) {
    console.error(error);
  }
};
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
    <tr key={item.id} className="border-b">

      <td className="p-4">{item.waste_batch_id}</td>

      <td className="p-4">{item.fabric_type}</td>

      <td className="p-4">{item.source}</td>

      <td className="p-4">{item.quantity} Kg</td>

      <td className="p-4">{item.color}</td>

      <td className="p-4">{item.condition}</td>

      <td className="p-4">{item.collection_date}</td>

      <td className="p-4 text-center">

        <button className="text-blue-600 mr-3">
          Edit
        </button>

        <button className="text-red-600">
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