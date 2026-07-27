import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import PredictionStats from "../components/prediction/PredictionStats";
import PredictionTable from "../components/prediction/PredictionTable";
import SearchFilter from "../components/prediction/SearchFilter";

// Reuse the History modal
import PredictionModal from "../components/history/PredictionModal";

// Import the correct service
import { getHistory } from "../services/historyService";

function Prediction() {
  const [predictions, setPredictions] = useState([]);
  const [filteredPredictions, setFilteredPredictions] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadPredictions();
  }, []);

  useEffect(() => {
    let data = [...predictions];

    // Search
    if (search) {
      data = data.filter((item) =>
        (item.image_name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Filter
    if (filter !== "All") {
      data = data.filter(
        (item) => item.prediction === filter
      );
    }

    setFilteredPredictions(data);
  }, [search, filter, predictions]);

  const loadPredictions = async () => {
    try {
      const data = await getHistory();

      setPredictions(data);
      setFilteredPredictions(data);
    } catch (error) {
      console.error("Error loading predictions:", error);
    }
  };

  const total = predictions.length;

  const averageConfidence =
    total > 0
      ? (
          predictions.reduce(
            (sum, p) => sum + p.confidence,
            0
          ) / total
        ).toFixed(2)
      : 0;

  const highestConfidence =
    total > 0
      ? Math.max(
          ...predictions.map((p) => p.confidence)
        )
      : 0;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-6">
        <Header />

        <h1 className="text-3xl font-bold mb-6">
          AI Prediction Dashboard
        </h1>

        <PredictionStats
          total={total}
          averageConfidence={averageConfidence}
          highestConfidence={highestConfidence}
        />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <PredictionTable
          predictions={filteredPredictions}
          onView={(item) => {
            setSelectedPrediction(item);
            setShowModal(true);
          }}
        />

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
  );
}

export default Prediction;