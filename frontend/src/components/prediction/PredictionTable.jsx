function PredictionTable({ predictions, onView }) {
  return (
    <div className="bg-white rounded-xl shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4">Image</th>

            <th>Prediction</th>

            <th>Confidence</th>

            <th>Date</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {predictions.map((item) => (
            <tr
              key={item.id}
              className="border-b text-center"
            >

              <td className="p-4">
                {item.image_name}
              </td>

              <td>{item.prediction}</td>

              <td>{item.confidence}%</td>

              <td>{item.created_at}</td>

              <td>

                <button
                  onClick={() => onView(item)}
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  View
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PredictionTable;