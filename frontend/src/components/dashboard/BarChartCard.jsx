import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BarChartCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Prediction Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="label" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default BarChartCard;