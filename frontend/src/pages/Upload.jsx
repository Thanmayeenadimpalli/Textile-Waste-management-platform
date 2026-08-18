import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { predictImages } from "../services/predictService";
import {
    generatePDF,
    generatePDFBase64
} from "../utils/pdfReport";

import { emailReport } from "../services/reportService";import toast from "react-hot-toast";

function Upload() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Milestone 3 inputs
    const [fabricType, setFabricType] = useState("Cotton");
    const [quantity, setQuantity] = useState(10);
    const [condition, setCondition] = useState("Good");

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length === 0) return;

        setSelectedImages(files);
        setResults([]);

        const previewUrls = files.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviews(previewUrls);
    };

    const handleUpload = async () => {
        if (selectedImages.length === 0) {
            toast.error("Please select at least one image.");
            return;
        }

        if (!quantity || Number(quantity) <= 0) {
            toast.error("Please enter a valid quantity.");
            return;
        }

        try {
            setLoading(true);

            const response = await predictImages(
                selectedImages,
                fabricType,
                quantity,
                condition
            );

            setResults(response);

            toast.success(
                `Successfully predicted ${response.length} image(s)!`
            );

        } catch (error) {
            console.error(error);

            if (error.response) {
                toast.error(
                    error.response.data.message ||
                    "Prediction failed!"
                );
            } else {
                toast.error(
                    error.message ||
                    "Something went wrong!"
                );
            }

        } finally {
            setLoading(false);
        }
    };
    const handleEmailReport = async () => {

    if (results.length === 0) {
        toast.error(
            "Generate a prediction report first."
        );
        return;
    }

    try {

        setLoading(true);

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user?.email) {

            toast.error(
                "Please login again. User email was not found."
            );

            return;
        }

        const pdfBase64 =
            generatePDFBase64(results);

        await emailReport({
            pdfBase64,
            recipientEmail: user.email,
            filename:
                "Textile_Prediction_Report.pdf"
        });

        toast.success(
            `Report sent to ${user.email}`
        );

    } catch (error) {

        console.error(
            "Email report error:",
            error
        );

        toast.error(
            error.response?.data?.message ||
            "Failed to email the report."
        );

    } finally {

        setLoading(false);

    }
};
    return (
        <div className="flex min-h-screen">

            <Sidebar />

            <div className="ml-64 flex-1 p-6">

                <Header />

                <div className="bg-white rounded-xl shadow-md p-8 mt-6">

                    <h2 className="text-3xl font-bold mb-8">
                        🤖 AI Textile Prediction
                    </h2>

                    {/* ========================= */}
                    {/* TEXTILE INFORMATION */}
                    {/* ========================= */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

                        {/* Fabric Type */}

                        <div>
                            <label className="block font-semibold mb-2">
                                Fabric Type
                            </label>

                            <select
                                value={fabricType}
                                onChange={(e) =>
                                    setFabricType(e.target.value)
                                }
                                className="w-full border rounded-lg p-3"
                            >
                                <option value="Cotton">
                                    Cotton
                                </option>

                                <option value="Polyester">
                                    Polyester
                                </option>

                                <option value="Denim">
                                    Denim
                                </option>
                            </select>
                        </div>


                        {/* Quantity */}

                        <div>
                            <label className="block font-semibold mb-2">
                                Quantity
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(e.target.value)
                                }
                                className="w-full border rounded-lg p-3"
                            />
                        </div>


                        {/* Condition */}

                        <div>
                            <label className="block font-semibold mb-2">
                                Condition
                            </label>

                            <select
                                value={condition}
                                onChange={(e) =>
                                    setCondition(e.target.value)
                                }
                                className="w-full border rounded-lg p-3"
                            >
                                <option value="Excellent">
                                    Excellent
                                </option>

                                <option value="Good">
                                    Good
                                </option>

                                <option value="Fair">
                                    Fair
                                </option>

                                <option value="Poor">
                                    Poor
                                </option>

                                <option value="Damaged">
                                    Damaged
                                </option>
                            </select>
                        </div>

                    </div>


                    {/* ========================= */}
                    {/* IMAGE UPLOAD */}
                    {/* ========================= */}

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-6"
                    />

                    {selectedImages.length > 0 && (
                        <p className="text-gray-600 mb-6">
                            📷 Selected Images:{" "}
                            <strong>
                                {selectedImages.length}
                            </strong>
                        </p>
                    )}


                    {/* IMAGE PREVIEWS */}

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


                    {/* PREDICT BUTTON */}

                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg text-white ${
                            loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading
                            ? "⏳ Analyzing..."
                            : "🔍 Analyze Textile"
                        }
                    </button>


                    {/* ========================= */}
                    {/* RESULTS */}
                    {/* ========================= */}

                    {results.length > 0 && (

                        <div className="mt-8">

                            <h3 className="text-2xl font-bold mb-4">
                                🤖 AI & Sustainability Results
                            </h3>


                            {/* AI PREDICTION TABLE */}

                            <div className="overflow-x-auto">

                                <table className="min-w-full border border-gray-300 text-center">

                                    <thead className="bg-gray-200">

                                        <tr>

                                            <th className="border p-2">
                                                Image
                                            </th>

                                            <th className="border p-2">
                                                Prediction
                                            </th>

                                            <th className="border p-2">
                                                Confidence
                                            </th>

                                            <th className="border p-2">
                                                Circularity
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {results.map(
                                            (item, index) => (

                                                <tr key={index}>

                                                    <td className="border p-2">
                                                        {item.image}
                                                    </td>

                                                    <td className="border p-2">
                                                        {item.prediction}
                                                    </td>

                                                    <td className="border p-2">
                                                        {item.confidence}%
                                                    </td>

                                                    <td className="border p-2">
                                                        {item.circularity?.score ?? "N/A"}
                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>


                            {/* ========================= */}
                            {/* BATCH SUMMARY */}
                            {/* ========================= */}

                            <div className="mt-6 bg-blue-50 p-5 rounded-lg">

                                <h4 className="text-xl font-semibold mb-3">
                                    📊 Batch Summary
                                </h4>

                                <p>
                                    <strong>Total Images:</strong>{" "}
                                    {results.length}
                                </p>

                                <p>
                                    <strong>Fabric Type:</strong>{" "}
                                    {fabricType}
                                </p>

                                <p>
                                    <strong>Quantity:</strong>{" "}
                                    {quantity}
                                </p>

                                <p>
                                    <strong>Condition:</strong>{" "}
                                    {condition}
                                </p>

                                {Object.entries(
                                    results.reduce(
                                        (acc, curr) => {
                                            acc[curr.prediction] =
                                                (acc[curr.prediction] || 0) + 1;

                                            return acc;
                                        },
                                        {}
                                    )
                                ).map(
                                    ([label, count]) => (

                                        <p key={label}>
                                            <strong>
                                                {label}:
                                            </strong>{" "}
                                            {count}
                                        </p>

                                    )
                                )}

                            </div>


                            {/* ========================= */}
                            {/* ENVIRONMENTAL IMPACT */}
                            {/* ========================= */}

                            <div className="mt-8">

                                <h4 className="text-2xl font-bold mb-4">
                                    🌍 Environmental Impact
                                </h4>

                                {results.map(
                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="bg-green-50 border border-green-300 rounded-lg p-5 mb-4"
                                        >

                                            <h5 className="text-xl font-semibold text-green-700">
                                                {item.image}
                                            </h5>


                                            <p className="mt-2">
                                                <strong>
                                                    AI Prediction:
                                                </strong>{" "}
                                                {item.prediction}
                                            </p>


                                            <p>
                                                <strong>
                                                    Confidence:
                                                </strong>{" "}
                                                {item.confidence}%
                                            </p>


                                            {item.environmental_impact && (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">

                                                    <div className="bg-white p-3 rounded">
                                                        <p className="text-sm">
                                                            CO₂ Savings
                                                        </p>
                                                        <strong>
                                                            {item.environmental_impact.co2_savings}
                                                            {" "}kg
                                                        </strong>
                                                    </div>


                                                    <div className="bg-white p-3 rounded">
                                                        <p className="text-sm">
                                                            Water Savings
                                                        </p>
                                                        <strong>
                                                            {item.environmental_impact.water_savings}
                                                            {" "}L
                                                        </strong>
                                                    </div>


                                                    <div className="bg-white p-3 rounded">
                                                        <p className="text-sm">
                                                            Landfill Reduction
                                                        </p>
                                                        <strong>
                                                            {item.environmental_impact.landfill_reduction}
                                                            {" "}kg
                                                        </strong>
                                                    </div>


                                                    <div className="bg-white p-3 rounded">
                                                        <p className="text-sm">
                                                            Resource Recovery
                                                        </p>
                                                        <strong>
                                                            {item.environmental_impact.resource_recovery}%
                                                        </strong>
                                                    </div>

                                                </div>
                                            )}


                                            {/* CIRCULARITY */}

                                            {item.circularity && (

                                                <div className="mt-5">

                                                    <h5 className="font-bold">
                                                        ♻ Circularity
                                                    </h5>

                                                    <p>
                                                        Score:{" "}
                                                        <strong>
                                                            {item.circularity.score}
                                                        </strong>
                                                        /100
                                                    </p>

                                                    <p>
                                                        Category:{" "}
                                                        <strong>
                                                            {item.circularity.category}
                                                        </strong>
                                                    </p>

                                                </div>

                                            )}


                                            {/* RECOMMENDATIONS */}

                                            {item.recommendations && (

                                                <div className="mt-5">

                                                    <h5 className="font-bold">
                                                        ♻ Recycling & Reuse Recommendations
                                                    </h5>

                                                    <ul className="list-disc ml-6 mt-2">

                                                        {item.recommendations.map(
                                                            (rec, i) => (
                                                                <li key={i}>
                                                                    {rec}
                                                                </li>
                                                            )
                                                        )}

                                                    </ul>

                                                    <p className="mt-4 text-blue-700">
                                                        <strong>
                                                            🌍 Impact:
                                                        </strong>{" "}
                                                        {item.impact}
                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    )
                                )}

                            </div>


                            {/* PDF */}

                            <div className="mt-6 flex flex-wrap gap-4">

    <button
        onClick={() =>
            generatePDF(results)
        }
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
    >
        📄 Download PDF Report
    </button>


    <button
        onClick={handleEmailReport}
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white ${
            loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
        }`}
    >
        {loading
            ? "📨 Sending..."
            : "📧 Email Report"
        }
    </button>

</div>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Upload;