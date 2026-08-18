import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import { generateSustainabilityReport } from "../services/reportService";
import { getHistory } from "../services/historyService";
import { getInventory } from "../services/inventoryService";


function Reports() {

    const [reportType, setReportType] = useState("sustainability");

    const [fabricType, setFabricType] = useState("Cotton");
    const [quantity, setQuantity] = useState(10);
    const [condition, setCondition] = useState("Good");

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [predictions, setPredictions] = useState([]);
    const [loadingPredictions, setLoadingPredictions] = useState(false);

    const [inventory, setInventory] = useState([]);
    const [loadingInventory, setLoadingInventory] = useState(false);


    // =========================================================
    // GENERATE SUSTAINABILITY REPORT
    // =========================================================

    const handleGenerateReport = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await generateSustainabilityReport(
                fabricType,
                quantity,
                condition
            );

            setReport(data);

        } catch (err) {

            console.error(
                "Report generation error:",
                err
            );

            setError(
                err.response?.data?.error ||
                "Failed to generate sustainability report."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // LOAD PREDICTION HISTORY
    // =========================================================

    const loadPredictions = async () => {

        try {

            setLoadingPredictions(true);

            const data = await getHistory();

            setPredictions(data);

        } catch (error) {

            console.error(
                "Error loading predictions:",
                error
            );

        } finally {

            setLoadingPredictions(false);

        }

    };


    // =========================================================
    // LOAD INVENTORY
    // =========================================================

    const loadInventory = async () => {

        try {

            setLoadingInventory(true);

            const response = await getInventory();

            setInventory(response.data);

        } catch (error) {

            console.error(
                "Error loading inventory:",
                error
            );

        } finally {

            setLoadingInventory(false);

        }

    };


    // =========================================================
    // LOAD DATA WHEN REPORTS PAGE OPENS
    // =========================================================

    useEffect(() => {

        loadPredictions();
        loadInventory();

    }, []);


    return (

        /*
         * =====================================================
         * MAIN DASHBOARD LAYOUT
         * =====================================================
         *
         * Sidebar stays on the left.
         * Reports content appears on the right.
         */

        <div className="flex bg-gray-100 min-h-screen">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <Sidebar />


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="ml-64 flex-1 p-6">

                {/* Header */}

                <Header />


                {/* =================================================
                    REPORT CONTENT
                ================================================= */}

                <div className="mt-6">

                    <h1 className="text-3xl font-bold mb-2">
                        📊 Reports
                    </h1>

                    <p className="text-gray-600 mb-6">
                        View textile waste analysis and sustainability
                        reports.
                    </p>


                    {/* =================================================
                        REPORT TYPE
                    ================================================= */}

                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

                        <h2 className="text-xl font-semibold mb-4">
                            Report Type
                        </h2>

                        <select
                            value={reportType}
                            onChange={(e) =>
                                setReportType(e.target.value)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full md:w-80"
                        >

                            <option value="sustainability">
                                Sustainability Report
                            </option>

                            <option value="prediction">
                                AI Prediction Report
                            </option>

                            <option value="inventory">
                                Inventory Report
                            </option>

                        </select>

                    </div>


                    {/* =================================================
                        SUSTAINABILITY REPORT
                    ================================================= */}

                    {reportType === "sustainability" && (

                        <>

                            <div className="bg-white rounded-xl shadow-md p-8">

                                <h2 className="text-2xl font-bold mb-6">
                                    🌱 Sustainability Report
                                </h2>


                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

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
                                            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
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
                                            min="0"
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
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
                                            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
                                        >

                                            <option value="Good">
                                                Good
                                            </option>

                                            <option value="Fair">
                                                Fair
                                            </option>

                                            <option value="Poor">
                                                Poor
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                {/* Generate Button */}

                                <button
                                    onClick={handleGenerateReport}
                                    disabled={loading}
                                    className={`px-6 py-3 rounded-lg text-white ${
                                        loading
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700"
                                    }`}
                                >

                                    {loading
                                        ? "Generating..."
                                        : "🌱 Generate Report"}

                                </button>


                                {/* Error */}

                                {error && (

                                    <p className="mt-4 text-red-600">
                                        {error}
                                    </p>

                                )}

                            </div>


                            {/* =================================================
                                SUSTAINABILITY RESULTS
                            ================================================= */}

                            {report && (

                                <div className="bg-white rounded-xl shadow-md p-8 mt-6">

                                    <h2 className="text-2xl font-bold mb-6">
                                        🌍 Environmental Impact
                                    </h2>


                                    {/* Environmental Cards */}

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                                        {/* CO2 */}

                                        <div className="bg-green-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                CO₂ Savings
                                            </p>

                                            <h3 className="text-2xl font-bold">
                                                {
                                                    report
                                                        .environmental_impact
                                                        ?.co2_savings
                                                }{" "}
                                                kg
                                            </h3>

                                        </div>


                                        {/* Water */}

                                        <div className="bg-blue-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Water Savings
                                            </p>

                                            <h3 className="text-2xl font-bold">
                                                {
                                                    report
                                                        .environmental_impact
                                                        ?.water_savings
                                                }{" "}
                                                L
                                            </h3>

                                        </div>


                                        {/* Landfill */}

                                        <div className="bg-yellow-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Landfill Reduction
                                            </p>

                                            <h3 className="text-2xl font-bold">
                                                {
                                                    report
                                                        .environmental_impact
                                                        ?.landfill_reduction
                                                }{" "}
                                                kg
                                            </h3>

                                        </div>


                                        {/* Resource Recovery */}

                                        <div className="bg-purple-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Resource Recovery
                                            </p>

                                            <h3 className="text-2xl font-bold">
                                                {
                                                    report
                                                        .environmental_impact
                                                        ?.resource_recovery
                                                }%
                                            </h3>

                                        </div>

                                    </div>


                                    {/* Sustainability & Circularity */}

                                    <div className="mt-8">

                                        <h3 className="text-xl font-semibold mb-4">
                                            ♻ Sustainability & Circularity
                                        </h3>


                                        <p className="mb-2">

                                            <strong>
                                                Sustainability Score:
                                            </strong>{" "}

                                            {
                                                report
                                                    .sustainability
                                                    ?.sustainability_score
                                            }

                                            {" "}/ 100

                                        </p>


                                        <p className="mb-2">

                                            <strong>
                                                Circularity Score:
                                            </strong>{" "}

                                            {
                                                report
                                                    .circularity
                                                    ?.score
                                            }

                                            {" "}/ 100

                                        </p>


                                        <p>

                                            <strong>
                                                Recovery Category:
                                            </strong>{" "}

                                            {
                                                report
                                                    .circularity
                                                    ?.category
                                            }

                                        </p>

                                    </div>

                                </div>

                            )}

                        </>

                    )}


                    {/* =================================================
                        AI PREDICTION REPORT
                    ================================================= */}

                    {reportType === "prediction" && (

                        <div className="bg-white rounded-xl shadow-md p-8">

                            <h2 className="text-2xl font-bold mb-6">
                                🤖 AI Prediction Report
                            </h2>


                            {loadingPredictions ? (

                                <p className="text-gray-600">
                                    Loading predictions...
                                </p>

                            ) : predictions.length === 0 ? (

                                <p className="text-gray-600">
                                    No predictions available yet.
                                </p>

                            ) : (

                                <>

                                    {/* Prediction Statistics */}

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                                        <div className="bg-blue-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Total Predictions
                                            </p>

                                            <h3 className="text-3xl font-bold">
                                                {predictions.length}
                                            </h3>

                                        </div>


                                        <div className="bg-green-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Average Confidence
                                            </p>

                                            <h3 className="text-3xl font-bold">

                                                {(
                                                    predictions.reduce(
                                                        (sum, item) =>
                                                            sum +
                                                            Number(
                                                                item.confidence
                                                            ),
                                                        0
                                                    ) /
                                                    predictions.length
                                                ).toFixed(2)}

                                                %

                                            </h3>

                                        </div>


                                        <div className="bg-purple-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Classes Detected
                                            </p>

                                            <h3 className="text-3xl font-bold">

                                                {
                                                    new Set(
                                                        predictions.map(
                                                            (item) =>
                                                                item.prediction
                                                        )
                                                    ).size
                                                }

                                            </h3>

                                        </div>

                                    </div>


                                    {/* Prediction History */}

                                    <h3 className="text-xl font-semibold mb-4">
                                        Prediction History
                                    </h3>


                                    <div className="overflow-x-auto">

                                        <table className="min-w-full border border-gray-300">

                                            <thead className="bg-gray-200">

                                                <tr>

                                                    <th className="border p-3">
                                                        Image
                                                    </th>

                                                    <th className="border p-3">
                                                        Prediction
                                                    </th>

                                                    <th className="border p-3">
                                                        Confidence
                                                    </th>

                                                    <th className="border p-3">
                                                        Date
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {predictions.map(
                                                    (item, index) => (

                                                        <tr
                                                            key={
                                                                item.id ||
                                                                index
                                                            }
                                                        >

                                                            <td className="border p-3">
                                                                {
                                                                    item.image_name
                                                                }
                                                            </td>

                                                            <td className="border p-3 font-semibold">
                                                                {
                                                                    item.prediction
                                                                }
                                                            </td>

                                                            <td className="border p-3">
                                                                {
                                                                    item.confidence
                                                                }%
                                                            </td>

                                                            <td className="border p-3">

                                                                {item.created_at
                                                                    ? new Date(
                                                                        item.created_at
                                                                    ).toLocaleString()
                                                                    : "N/A"}

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </>

                            )}

                        </div>

                    )}


                    {/* =================================================
                        INVENTORY REPORT
                    ================================================= */}

                    {reportType === "inventory" && (

                        <div className="bg-white rounded-xl shadow-md p-8">

                            <h2 className="text-2xl font-bold mb-6">
                                📦 Inventory Report
                            </h2>


                            {loadingInventory ? (

                                <p className="text-gray-600">
                                    Loading inventory...
                                </p>

                            ) : inventory.length === 0 ? (

                                <p className="text-gray-600">
                                    No inventory records available.
                                </p>

                            ) : (

                                <>

                                    {/* Inventory Statistics */}

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                                        {/* Total Batches */}

                                        <div className="bg-blue-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Total Batches
                                            </p>

                                            <h3 className="text-3xl font-bold">
                                                {inventory.length}
                                            </h3>

                                        </div>


                                        {/* Total Quantity */}

                                        <div className="bg-green-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Total Quantity
                                            </p>

                                            <h3 className="text-3xl font-bold">

                                                {inventory
                                                    .reduce(
                                                        (sum, item) =>
                                                            sum +
                                                            Number(
                                                                item.quantity
                                                            ),
                                                        0
                                                    )
                                                    .toFixed(2)}{" "}

                                                kg

                                            </h3>

                                        </div>


                                        {/* Reusable */}

                                        <div className="bg-purple-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Reusable Batches
                                            </p>

                                            <h3 className="text-3xl font-bold">

                                                {
                                                    inventory.filter(
                                                        (item) =>
                                                            item.condition
                                                                ?.toLowerCase() ===
                                                            "reusable"
                                                    ).length
                                                }

                                            </h3>

                                        </div>


                                        {/* Damaged */}

                                        <div className="bg-red-50 p-5 rounded-lg">

                                            <p className="text-gray-600">
                                                Damaged Batches
                                            </p>

                                            <h3 className="text-3xl font-bold">

                                                {
                                                    inventory.filter(
                                                        (item) =>
                                                            item.condition
                                                                ?.toLowerCase() ===
                                                            "damaged"
                                                    ).length
                                                }

                                            </h3>

                                        </div>

                                    </div>


                                    {/* Inventory Details */}

                                    <h3 className="text-xl font-semibold mb-4">
                                        Inventory Details
                                    </h3>


                                    <div className="overflow-x-auto">

                                        <table className="min-w-full border border-gray-300">

                                            <thead className="bg-gray-200">

                                                <tr>

                                                    <th className="border p-3">
                                                        Batch ID
                                                    </th>

                                                    <th className="border p-3">
                                                        Fabric Type
                                                    </th>

                                                    <th className="border p-3">
                                                        Source
                                                    </th>

                                                    <th className="border p-3">
                                                        Quantity
                                                    </th>

                                                    <th className="border p-3">
                                                        Color
                                                    </th>

                                                    <th className="border p-3">
                                                        Condition
                                                    </th>

                                                    <th className="border p-3">
                                                        Collection Date
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {inventory.map(
                                                    (item, index) => (

                                                        <tr
                                                            key={
                                                                item.id ||
                                                                index
                                                            }
                                                        >

                                                            <td className="border p-3">
                                                                {
                                                                    item.waste_batch_id
                                                                }
                                                            </td>

                                                            <td className="border p-3">
                                                                {
                                                                    item.fabric_type
                                                                }
                                                            </td>

                                                            <td className="border p-3">
                                                                {
                                                                    item.source
                                                                }
                                                            </td>

                                                            <td className="border p-3">
                                                                {
                                                                    item.quantity
                                                                }{" "}
                                                                kg
                                                            </td>

                                                            <td className="border p-3">
                                                                {
                                                                    item.color
                                                                }
                                                            </td>

                                                            <td className="border p-3">
                                                                {
                                                                    item.condition
                                                                }
                                                            </td>

                                                            <td className="border p-3">
                                                                {
                                                                    item.collection_date
                                                                }
                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </>

                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Reports;