const API_URL = "http://127.0.0.1:5000";

export const getSustainabilityReport = async (
    fabricType,
    quantity,
    condition
) => {
    const response = await fetch(
        `${API_URL}/sustainability-report`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fabric_type: fabricType,
                quantity: Number(quantity),
                condition: condition
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to get sustainability report");
    }

    return await response.json();
};


export const getCircularityAnalysis = async (
    fabricType,
    quantity,
    condition
) => {
    const response = await fetch(
        `${API_URL}/circularity-analysis`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fabric_type: fabricType,
                quantity: Number(quantity),
                condition: condition
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to get circularity analysis");
    }

    return await response.json();
};


export const getRecommendations = async (
    fabricType,
    condition,
    defect
) => {
    const response = await fetch(
        `${API_URL}/recommendations`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fabric_type: fabricType,
                condition: condition,
                defect: defect
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to get recommendations");
    }

    return await response.json();
};