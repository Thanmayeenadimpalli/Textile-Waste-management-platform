import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import StatsCards from "../components/dashboard/StatsCards";
import PieChartCard from "../components/dashboard/PieChartCard";
import BarChartCard from "../components/dashboard/BarChartCard";
import LineChartCard from "../components/dashboard/LineChartCard";

import { getDashboardStats } from "../services/dashboardService";

import {
    getSustainabilityReport,
    getCircularityAnalysis,
    getRecommendations
} from "../services/sustainabilityService";


function Dashboard() {

    const [chartData, setChartData] = useState([]);
    const [trendData, setTrendData] = useState([]);

    // Milestone 3 states
    const [fabricType, setFabricType] = useState("Cotton");
    const [quantity, setQuantity] = useState(10);
    const [condition, setCondition] = useState("Good");
    const [defect, setDefect] = useState("Broken stitch");

    const [sustainability, setSustainability] = useState(null);
    const [circularity, setCircularity] = useState(null);
    const [recommendations, setRecommendations] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // Existing dashboard data
    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {
        try {

            const data = await getDashboardStats();

            setChartData(data.chart_data || []);
            setTrendData(data.trend_data || []);

        } catch (error) {

            console.error(
                "Error loading dashboard:",
                error
            );

        }
    };


    // Milestone 3 analysis
    const analyzeSustainability = async () => {

        try {

            setLoading(true);
            setError("");

            const sustainabilityData =
                await getSustainabilityReport(
                    fabricType,
                    quantity,
                    condition
                );

            const circularityData =
                await getCircularityAnalysis(
                    fabricType,
                    quantity,
                    condition
                );

            const recommendationData =
                await getRecommendations(
                    fabricType,
                    condition,
                    defect
                );

            setSustainability(
                sustainabilityData
            );

            setCircularity(
                circularityData
            );

            setRecommendations(
                recommendationData
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load sustainability analysis."
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

                {/* EXISTING DASHBOARD */}

                <StatsCards />

                <PieChartCard
                    data={chartData}
                />

                <BarChartCard
                    data={chartData}
                />

                <LineChartCard
                    data={trendData}
                />


                {/* ============================= */}
                {/* MILESTONE 3 */}
                {/* ============================= */}

                <div className="mt-8">

                    <h1 className="text-2xl font-bold mb-2">
                        Sustainability Intelligence
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Analyze environmental impact,
                        circularity and recovery
                        recommendations.
                    </p>


                    {/* INPUT SECTION */}

                    <div className="bg-white rounded-xl shadow p-6 mb-6">

                        <h2 className="text-xl font-semibold mb-4">
                            Textile Analysis
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                            {/* Fabric */}

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Fabric Type
                                </label>

                                <select
                                    value={fabricType}
                                    onChange={(e) =>
                                        setFabricType(e.target.value)
                                    }
                                    className="w-full border rounded-lg p-2"
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

                                <label className="block text-sm font-medium mb-1">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                    className="w-full border rounded-lg p-2"
                                />

                            </div>


                            {/* Condition */}

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Condition
                                </label>

                                <select
                                    value={condition}
                                    onChange={(e) =>
                                        setCondition(e.target.value)
                                    }
                                    className="w-full border rounded-lg p-2"
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


                            {/* Defect */}

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Detected Defect
                                </label>

                                <select
                                    value={defect}
                                    onChange={(e) =>
                                        setDefect(e.target.value)
                                    }
                                    className="w-full border rounded-lg p-2"
                                >

                                    <option value="defect free">
                                        Defect Free
                                    </option>

                                    <option value="Broken stitch">
                                        Broken stitch
                                    </option>

                                    <option value="Needle mark">
                                        Needle mark
                                    </option>

                                    <option value="Pinched fabric">
                                        Pinched fabric
                                    </option>

                                    <option value="hole">
                                        Hole
                                    </option>

                                    <option value="stain">
                                        Stain
                                    </option>

                                    <option value="lines">
                                        Lines
                                    </option>

                                    <option value="horizontal">
                                        Horizontal
                                    </option>

                                    <option value="Vertical">
                                        Vertical
                                    </option>

                                </select>

                            </div>

                        </div>


                        <button
                            onClick={analyzeSustainability}
                            disabled={loading}
                            className="mt-5 px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
                        >

                            {loading
                                ? "Analyzing..."
                                : "Analyze Sustainability"
                            }

                        </button>


                        {error && (
                            <p className="text-red-600 mt-3">
                                {error}
                            </p>
                        )}

                    </div>


                    {/* RESULTS */}

                    {sustainability && (

                        <>

                            {/* ENVIRONMENTAL IMPACT */}

                            <h2 className="text-xl font-bold mb-4">
                                Environmental Impact
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                                <div className="bg-white rounded-xl shadow p-5">

                                    <p className="text-gray-500">
                                        CO₂ Savings
                                    </p>

                                    <h3 className="text-2xl font-bold mt-2">
                                        {sustainability.environmental_impact.co2_savings}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        kg
                                    </p>

                                </div>


                                <div className="bg-white rounded-xl shadow p-5">

                                    <p className="text-gray-500">
                                        Water Savings
                                    </p>

                                    <h3 className="text-2xl font-bold mt-2">
                                        {sustainability.environmental_impact.water_savings}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        L
                                    </p>

                                </div>


                                <div className="bg-white rounded-xl shadow p-5">

                                    <p className="text-gray-500">
                                        Landfill Reduction
                                    </p>

                                    <h3 className="text-2xl font-bold mt-2">
                                        {sustainability.environmental_impact.landfill_reduction}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        kg
                                    </p>

                                </div>


                                <div className="bg-white rounded-xl shadow p-5">

                                    <p className="text-gray-500">
                                        Resource Recovery
                                    </p>

                                    <h3 className="text-2xl font-bold mt-2">
                                        {sustainability.environmental_impact.resource_recovery}%
                                    </h3>

                                </div>

                            </div>


                            {/* SUSTAINABILITY SCORES */}

                            <h2 className="text-xl font-bold mb-4">
                                Sustainability & Circularity
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                                <div className="bg-white rounded-xl shadow p-5">

                                    <p className="text-gray-500">
                                        Sustainability Score
                                    </p>

                                    <h3 className="text-3xl font-bold mt-2">
                                        {sustainability.sustainability.sustainability_score}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        / 100
                                    </p>

                                </div>


                                <div className="bg-white rounded-xl shadow p-5">

                                    <p className="text-gray-500">
                                        Circularity Score
                                    </p>

                                    <h3 className="text-3xl font-bold mt-2">
                                        {circularity.circularity.score}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        / 100
                                    </p>

                                </div>


                                <div className="bg-white rounded-xl shadow p-5">

                                    <p className="text-gray-500">
                                        Recovery Category
                                    </p>

                                    <h3 className="text-xl font-bold mt-3">
                                        {circularity.circularity.category}
                                    </h3>

                                </div>

                            </div>


                            {/* RECOMMENDATIONS */}

                            {recommendations && (

                                <div className="bg-white rounded-xl shadow p-6 mb-8">

                                    <h2 className="text-xl font-bold mb-4">
                                        Recycling & Reuse Recommendations
                                    </h2>

                                    <ul className="list-disc pl-6 space-y-2">

                                        {recommendations.recommendations.map(
                                            (item, index) => (

                                                <li key={index}>
                                                    {item}
                                                </li>

                                            )
                                        )}

                                    </ul>

                                    <p className="mt-5 text-gray-600">
                                        <strong>Environmental Impact:</strong>{" "}
                                        {recommendations.impact}
                                    </p>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;