import axios from "axios";

const API = "http://127.0.0.1:5000";

export const predictImages = async (files) => {

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
    }

    const response = await axios.post(
        `${API}/predict`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};