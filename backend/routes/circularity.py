from flask import Blueprint, request, jsonify

from ai.sustainability import (
    calculate_circularity_score,
    calculate_environmental_impact
)

circularity = Blueprint(
    "circularity",
    __name__
)


@circularity.route("/circularity-analysis", methods=["POST"])
def circularity_analysis():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    fabric_type = data.get("fabric_type")
    quantity = data.get("quantity")
    condition = data.get("condition")

    if not fabric_type:
        return jsonify({
            "error": "fabric_type is required"
        }), 400

    if quantity is None:
        return jsonify({
            "error": "quantity is required"
        }), 400

    if not condition:
        return jsonify({
            "error": "condition is required"
        }), 400

    try:
        quantity = float(quantity)
    except (TypeError, ValueError):
        return jsonify({
            "error": "quantity must be a number"
        }), 400

    environmental = calculate_environmental_impact(
        fabric_type,
        quantity
    )

    circularity_result = calculate_circularity_score(
        fabric_type,
        condition
    )

    return jsonify({
        "fabric_type": fabric_type,
        "quantity": quantity,
        "condition": condition,
        "environmental_impact": environmental,
        "circularity": circularity_result
    }), 200