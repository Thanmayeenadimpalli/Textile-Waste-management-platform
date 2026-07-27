const wasteMapping = {
  "Shirt": {
    category: "Cotton Textile Waste",
    recommendation: "Suitable for fabric recycling and reuse.",
  },
  "T-Shirt": {
    category: "Cotton Knit Waste",
    recommendation: "Can be recycled into insulation or recycled yarn.",
  },
  "Jeans": {
    category: "Denim Textile Waste",
    recommendation: "Suitable for denim recycling and industrial reuse.",
  },
  "Trouser": {
    category: "Fabric Textile Waste",
    recommendation: "Can be recycled into new textile products.",
  },
  "Dress": {
    category: "Mixed Textile Waste",
    recommendation: "Separate by material before recycling.",
  },
};

function PredictionModal({ prediction, onClose }) {
  if (!prediction) return null;

  const waste =
    wasteMapping[prediction.prediction] || {
      category: prediction.prediction,
      recommendation: "Further inspection required for proper recycling.",
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Textile Waste Analysis
        </h2>

        <div className="space-y-4">

          <p>
            <strong>Image:</strong> {prediction.image_name}
          </p>

          <p>
            <strong>Textile Waste Category:</strong> {waste.category}
          </p>

          <p>
            <strong>AI Confidence:</strong> {prediction.confidence}%
          </p>

          <p>
            <strong>Recycling Recommendation:</strong> {waste.recommendation}
          </p>

          <p>
            <strong>Analysis Date:</strong> {prediction.created_at}
          </p>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default PredictionModal;