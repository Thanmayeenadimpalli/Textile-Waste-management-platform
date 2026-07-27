function InventoryStatsCard({ totalInventory }) {
  return (
    <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold">
        Total Inventory Records
      </h2>

      <p className="text-4xl font-bold mt-3">
        {totalInventory}
      </p>
    </div>
  );
}

export default InventoryStatsCard;