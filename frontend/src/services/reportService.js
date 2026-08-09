import axios from "axios";

const API = "http://127.0.0.1:5000";

export const generateSustainabilityReport = async (
    fabricType,
    quantity,
    condition
) => {
    const response = await axios.post(
        `${API}/sustainability-report`,
        {
            fabric_type: fabricType,
            quantity: quantity,
            condition: condition,
        }
    );

    return response.data;
};