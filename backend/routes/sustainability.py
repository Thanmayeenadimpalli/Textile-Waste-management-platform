from flask import Blueprint, request, jsonify

from ai.sustainability import generate_sustainability_report

sustainability = Blueprint(
    "sustainability",
    __name__
)


@sustainability.route(
    "/sustainability-report",
    methods=["POST"]
)
def sustainability_report():

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

    report = generate_sustainability_report(
        fabric_type,
        quantity,
        condition
    )

    return jsonify(report), 200