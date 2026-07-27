import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { getHistory } from "../services/historyService";
import { exportHistoryToExcel } from "../utils/exportExcel";
import PredictionModal from "../components/history/PredictionModal";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [predictionFilter, setPredictionFilter] = useState("All");
  const [confidenceFilter, setConfidenceFilter] = useState(0);

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.image_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.prediction
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesPrediction =
      predictionFilter === "All" ||
      item.prediction === predictionFilter;

    const matchesConfidence =
      item.confidence >= confidenceFilter;

    return (
      matchesSearch &&
      matchesPrediction &&
      matchesConfidence
    );
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-6">
        <Header />

        <div className="bg-white rounded-xl shadow-md p-8 mt-6">

          <h2 className="text-3xl font-bold mb-6">
            📜 Prediction History
          </h2>

          {/* Search & Filter */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">

            <input
              type="text"
              placeholder="Search image or prediction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg p-3"
            />

            <select
              value={predictionFilter}
              onChange={(e) =>
                setPredictionFilter(e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option>All</option>
              <option>Shirts</option>
              <option>Jeans</option>
              <option>Dress</option>
              <option>Jacket</option>
            </select>

            <input
              type="number"
              placeholder="Min Confidence"
              value={confidenceFilter}
              onChange={(e) =>
                setConfidenceFilter(Number(e.target.value))
              }
              className="border rounded-lg p-3"
            />

            <button
              onClick={() =>
                exportHistoryToExcel(filteredHistory)
              }
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 font-semibold"
            >
              📥 Download Excel
            </button>

          </div>

          {loading ? (
            <p className="text-center text-lg font-semibold">
              Loading...
            </p>
          ) : filteredHistory.length === 0 ? (
            <p className="text-center text-red-600">
              No matching prediction history found.
            </p>
          ) : (
            <table className="min-w-full border border-gray-300 text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Image</th>
                  <th className="border p-3">Prediction</th>
                  <th className="border p-3">Confidence</th>
                  <th className="border p-3">Date</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-100"
                  >
                    <td className="border p-3">
                      {item.id}
                    </td>

                    <td className="border p-3">
                      {item.image_name}
                    </td>

                    <td className="border p-3">
                      {item.prediction}
                    </td>

                    <td className="border p-3">
                      {item.confidence}%
                    </td>

                    <td className="border p-3">
                      {item.created_at}
                    </td>

                    <td className="border p-3">
                      <button
                        onClick={() => {
                          setSelectedPrediction(item);
                          setShowModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        👁 View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Prediction Modal */}
          {showModal && (
            <PredictionModal
              prediction={selectedPrediction}
              onClose={() => {
                setShowModal(false);
                setSelectedPrediction(null);
              }}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default History;