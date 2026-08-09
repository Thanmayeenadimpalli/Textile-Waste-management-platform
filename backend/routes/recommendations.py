from flask import Blueprint, request, jsonify

from ai.recommendations import generate_recommendations


recommendations = Blueprint(
    "recommendations",
    __name__
)


@recommendations.route(
    "/recommendations",
    methods=["POST"]
)
def get_recommendations():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    fabric_type = data.get("fabric_type")
    condition = data.get("condition")
    defect = data.get("defect")

    if not fabric_type:
        return jsonify({
            "error": "fabric_type is required"
        }), 400

    if not condition:
        return jsonify({
            "error": "condition is required"
        }), 400

    result = generate_recommendations(
        fabric_type,
        condition,
        defect
    )

    return jsonify(result), 200