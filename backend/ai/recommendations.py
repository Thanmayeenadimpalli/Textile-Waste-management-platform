# Recycling Recommendation Engine
# Milestone 3

RECOMMENDATIONS = {
    "Shirts": {
        "recommendation": [
            "Donate if wearable.",
            "Reuse as cleaning cloth.",
            "Recycle through textile recycling centers."
        ],
        "impact": "Reduces landfill waste and promotes fabric reuse."
    },

    "Jeans": {
        "recommendation": [
            "Upcycle into bags or pouches.",
            "Recycle denim fibers.",
            "Donate if in good condition."
        ],
        "impact": "Denim recycling saves water and cotton resources."
    },

    "Dress": {
        "recommendation": [
            "Donate for reuse.",
            "Repurpose into home décor.",
            "Recycle fabric if damaged."
        ],
        "impact": "Extends textile lifespan and reduces waste."
    },

    "Jacket": {
        "recommendation": [
            "Donate during winter drives.",
            "Repair if possible.",
            "Recycle insulation material."
        ],
        "impact": "Keeps usable clothing out of landfills."
    }
}


def generate_recommendations(fabric_type, condition, defect=None):
    """
    Generate textile waste management recommendations.

    Inputs:
        fabric_type - textile/material type
        condition   - current condition
        defect      - optional AI-detected defect
    """

    fabric_type = str(fabric_type or "").strip()
    condition = str(condition or "").strip().lower()
    defect = str(defect or "").strip()

    # Check whether an existing clothing-category recommendation exists
    recommendation_data = RECOMMENDATIONS.get(
        fabric_type,
        None
    )

    # Base recommendations for materials not present
    if recommendation_data is None:

        if condition in ["excellent", "good"]:
            actions = [
                "Reuse or donate if the textile is wearable.",
                "Repair and extend the useful life where possible.",
                "Recycle through an appropriate textile recycling center."
            ]

        elif condition in ["fair", "average"]:
            actions = [
                "Repair before disposal where practical.",
                "Reuse for household or industrial applications.",
                "Recycle the textile material."
            ]

        else:
            actions = [
                "Prioritize material recovery.",
                "Recycle usable textile fibers.",
                "Avoid landfill disposal where recycling is available."
            ]

        impact = (
            "Promotes textile reuse and material recovery "
            "while reducing waste."
        )

    else:
        actions = recommendation_data["recommendation"]
        impact = recommendation_data["impact"]

    # Add a defect-related recommendation when AI detection is available
    if defect:
        defect_lower = defect.lower()

        if defect_lower in [
            "broken stitch",
            "needle mark",
            "pinched fabric"
        ]:
            actions.insert(
                0,
                "Repair the detected stitching or manufacturing defect "
                "before considering disposal."
            )

        elif defect_lower in [
            "hole",
            "lines",
            "horizontal",
            "vertical",
            "stain"
        ]:
            actions.insert(
                0,
                "Assess the detected defect before reuse; "
                "repair, repurpose, or recycle based on severity."
            )

        elif defect_lower == "defect free":
            actions.insert(
                0,
                
                "Prioritize reuse or donation because no major defect "
                "was detected."
            )

    return {
        "fabric_type": fabric_type,
        "condition": condition,
        "detected_defect": defect,
        "recommendations": actions,
        "impact": impact
    }