# Sustainability Intelligence Engine
# Milestone 3

SUSTAINABILITY_DATA = {
    "Cotton": {
        "co2_saved": 18,
        "water_saved": 420,
        "landfill_reduction": 5,
        "resource_recovery": 94,
        "sustainability_score": 91,
        "circularity_score": 88
    },

    "Polyester": {
        "co2_saved": 12,
        "water_saved": 180,
        "landfill_reduction": 4,
        "resource_recovery": 82,
        "sustainability_score": 80,
        "circularity_score": 79
    },

    "Denim": {
        "co2_saved": 15,
        "water_saved": 350,
        "landfill_reduction": 4.5,
        "resource_recovery": 90,
        "sustainability_score": 87,
        "circularity_score": 86
    }
}


DEFAULT_DATA = {
    "co2_saved": 10,
    "water_saved": 150,
    "landfill_reduction": 3,
    "resource_recovery": 70,
    "sustainability_score": 70,
    "circularity_score": 70
}


def get_sustainability_data(fabric_type):
    """
    Return sustainability information for a fabric type.
    """

    if not fabric_type:
        return DEFAULT_DATA.copy()

    # Case-insensitive matching
    for material, data in SUSTAINABILITY_DATA.items():
        if material.lower() == fabric_type.lower():
            return data.copy()

    return DEFAULT_DATA.copy()


def calculate_environmental_impact(fabric_type, quantity):
    """
    Estimate environmental benefits based on fabric type and quantity.

    Project assumption:
    The existing sustainability values are treated as baseline
    benefits per unit of textile quantity.
    """

    try:
        quantity = float(quantity)
    except (TypeError, ValueError):
        quantity = 0

    data = get_sustainability_data(fabric_type)

    return {
        "co2_savings": round(data["co2_saved"] * quantity, 2),
        "water_savings": round(data["water_saved"] * quantity, 2),
        "landfill_reduction": round(
            data["landfill_reduction"] * quantity, 2
        ),
        "resource_recovery": data["resource_recovery"]
    }


def calculate_circularity_score(
    fabric_type,
    condition,
    reuse_potential=70,
    processing_feasibility=70
):
    """
    Calculate circularity score using the project specification:

    Material Recyclability      35%
    Material Condition          20%
    Reuse Potential             20%
    Environmental Benefit       15%
    Processing Feasibility      10%
    """

    data = get_sustainability_data(fabric_type)

    material_recyclability = data["resource_recovery"]

    # Convert condition into a score
    condition_scores = {
        "excellent": 100,
        "good": 85,
        "fair": 70,
        "average": 65,
        "poor": 40,
        "damaged": 25
    }

    condition_score = condition_scores.get(
        str(condition).lower(),
        60
    )

    environmental_benefit = data["sustainability_score"]

    circularity_score = (
        material_recyclability * 0.35
        + condition_score * 0.20
        + reuse_potential * 0.20
        + environmental_benefit * 0.15
        + processing_feasibility * 0.10
    )

    score = round(circularity_score, 2)

    if score >= 85:
        category = "Excellent Recovery Potential"
    elif score >= 70:
        category = "High Recovery Potential"
    elif score >= 55:
        category = "Moderate Recovery Potential"
    elif score >= 40:
        category = "Limited Recovery Potential"
    else:
        category = "Disposal Recommended"

    return {
        "score": score,
        "category": category,
        "material_recyclability": material_recyclability,
        "condition_score": condition_score,
        "reuse_potential": reuse_potential,
        "environmental_benefit": environmental_benefit,
        "processing_feasibility": processing_feasibility
    }


def generate_sustainability_report(
    fabric_type,
    quantity,
    condition
):
    """
    Generate complete sustainability analysis.
    """

    sustainability = get_sustainability_data(fabric_type)

    environmental = calculate_environmental_impact(
        fabric_type,
        quantity
    )

    circularity = calculate_circularity_score(
        fabric_type,
        condition
    )

    return {
        "fabric_type": fabric_type,
        "quantity": quantity,
        "condition": condition,

        "environmental_impact": environmental,

        "sustainability": {
            "sustainability_score":
                sustainability["sustainability_score"],
            "resource_recovery":
                sustainability["resource_recovery"]
        },

        "circularity": circularity
    }