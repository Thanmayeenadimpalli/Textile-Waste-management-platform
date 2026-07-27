function PredictionStats({ total, averageConfidence, highestConfidence }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-gray-500">Total Predictions</h3>
        <p className="text-3xl font-bold mt-2">{total}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-gray-500">Average Confidence</h3>
        <p className="text-3xl font-bold mt-2">
          {averageConfidence}%
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-gray-500">Highest Confidence</h3>
        <p className="text-3xl font-bold mt-2">
          {highestConfidence}%
        </p>
      </div>

    </div>
  );
}

export default PredictionStats;