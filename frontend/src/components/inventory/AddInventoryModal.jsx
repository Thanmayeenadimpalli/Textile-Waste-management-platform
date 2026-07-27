import { useState, useEffect } from "react";
import {
  addInventory,
  updateInventory,
} from "../../services/inventoryService";


function AddInventoryModal({
  isOpen,
  onClose,
  onInventoryAdded,
  editData,
}) {

    const [formData, setFormData] = useState({
  waste_batch_id: "",
  fabric_type: "",
  source: "",
  quantity: "",
  color: "",
  condition: "",
  collection_date: "",
});
  useEffect(() => {
  if (editData) {
    setFormData({
      waste_batch_id: editData.waste_batch_id,
      fabric_type: editData.fabric_type,
      source: editData.source,
      quantity: editData.quantity,
      color: editData.color,
      condition: editData.condition,
      collection_date: editData.collection_date,
    });
  } else {
    setFormData({
      waste_batch_id: "",
      fabric_type: "",
      source: "",
      quantity: "",
      color: "",
      condition: "",
      collection_date: "",
    });
  }
}, [editData]);



const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editData) {
      await updateInventory(editData.id, formData);

      alert("Inventory Updated Successfully!");
    } else {
      await addInventory(formData);

      alert("Inventory Added Successfully!");
    }

    onInventoryAdded();

    onClose();

    setFormData({
      waste_batch_id: "",
      fabric_type: "",
      source: "",
      quantity: "",
      color: "",
      condition: "",
      collection_date: "",
    });

  } catch (error) {
    console.error(error);
    alert("Operation Failed!");
  }
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white w-full max-w-2xl rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
  {editData ? "Edit Textile Waste" : "Add Textile Waste"}
</h2>

        <form
  onSubmit={handleSubmit}
  className="grid grid-cols-2 gap-4"
>

          <input
  type="text"
  name="waste_batch_id"
  value={formData.waste_batch_id}
  onChange={handleChange}
  placeholder="Batch ID"
  className="border rounded-lg p-3"
/>

          <input
  type="text"
  name="fabric_type"
  value={formData.fabric_type}
  onChange={handleChange}
  placeholder="Fabric Type"
  className="border rounded-lg p-3"
/>

          <input
  type="text"
  name="source"
  value={formData.source}
  onChange={handleChange}
  placeholder="Source"
  className="border rounded-lg p-3"
/>

          <input
  type="number"
  name="quantity"
  value={formData.quantity}
  onChange={handleChange}
  placeholder="Quantity"
  className="border rounded-lg p-3"
/>

          <input
  type="text"
  name="color"
  value={formData.color}
  onChange={handleChange}
  placeholder="Color"
  className="border rounded-lg p-3"
/>

          <input
  type="text"
  name="condition"
  value={formData.condition}
  onChange={handleChange}
  placeholder="Condition"
  className="border rounded-lg p-3"
/>

          <input
  type="date"
  name="collection_date"
  value={formData.collection_date}
  onChange={handleChange}
  className="border rounded-lg p-3 col-span-2"
/>

          <div className="col-span-2 flex justify-end gap-4 mt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
  type="submit"
  className="px-5 py-3 bg-blue-600 text-white rounded-lg"
>
  {editData ? "Update" : "Save"}
</button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddInventoryModal;