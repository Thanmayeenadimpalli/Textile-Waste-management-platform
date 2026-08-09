import axios from "axios";

const API = "http://127.0.0.1:5000";

export const predictImages = async (
    files,
    fabricType,
    quantity,
    condition
) => {

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
    }

    formData.append("fabric_type", fabricType);
    formData.append("quantity", quantity);
    formData.append("condition", condition);

    const response = await axios.post(
        `${API}/predict`,
        formData
    );

    return response.data;
};