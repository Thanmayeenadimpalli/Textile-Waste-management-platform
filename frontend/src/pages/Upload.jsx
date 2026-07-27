import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { predictImages } from "../services/predictService";
import { generatePDF } from "../utils/pdfReport";
import toast from "react-hot-toast";

function Upload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setSelectedImages(files);
    setResults([]);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    try {
      setLoading(true);

      const response = await predictImages(selectedImages);

      setResults(response);

      toast.success(
        `Successfully predicted ${response.length} image(s)!`
      );
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(
          error.response.data.message || "Prediction failed!"
        );
      } else {
        toast.error(error.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-6">
        <Header />

        <div className="bg-white rounded-xl shadow-md p-8 mt-6">
          <h2 className="text-3xl font-bold mb-8">
            🤖 AI Textile Prediction
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mb-6"
          />

          {selectedImages.length > 0 && (
            <p className="text-gray-600 mb-6">
              📷 Selected Images: <strong>{selectedImages.length}</strong>
            </p>
          )}

          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {previews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-white ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "⏳ Predicting..." : "🔍 Predict Images"}
          </button>

          {results.length > 0 && (
            <>
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">
                  🤖 AI Prediction Results
                </h3>

                <table className="min-w-full border border-gray-300 text-center">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-2">Image</th>
                      <th className="border p-2">Prediction</th>
                      <th className="border p-2">Confidence</th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.map((item, index) => (
                      <tr key={index}>
                        <td className="border p-2">{item.image}</td>
                        <td className="border p-2">{item.prediction}</td>
                        <td className="border p-2">
                          {item.confidence}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-xl font-semibold mb-3">
                    📊 Batch Summary
                  </h4>

                  <p>
                    <strong>Total Images:</strong> {results.length}
                  </p>

                  {Object.entries(
                    results.reduce((acc, curr) => {
                      acc[curr.prediction] =
                        (acc[curr.prediction] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([label, count]) => (
                    <p key={label}>
                      <strong>{label}:</strong> {count}
                    </p>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="text-2xl font-bold mb-4">
                    ♻ Recycling Recommendations
                  </h4>

                  {results.map((item, index) => (
                    <div
                      key={index}
                      className="bg-green-50 border border-green-300 rounded-lg p-4 mb-4"
                    >
                      <h5 className="text-lg font-semibold text-green-700">
                        {item.image}
                      </h5>

                      <p>
                        <strong>Prediction:</strong> {item.prediction}
                      </p>

                      <p>
                        <strong>Confidence:</strong> {item.confidence}%
                      </p>

                      <p className="mt-3 font-semibold">
                        ♻ Recycling Recommendation
                      </p>

                      <ul className="list-disc ml-6 mt-2">
                        {item.recommendation.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>

                      <p className="mt-4 text-blue-700">
                        <strong>🌍 Environmental Impact:</strong>{" "}
                        {item.impact}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => generatePDF(results)}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                  >
                    📄 Download PDF Report
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;