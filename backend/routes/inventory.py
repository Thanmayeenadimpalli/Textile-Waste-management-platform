from flask import Blueprint, request, jsonify
from models import db
from models.inventory import Inventory

inventory = Blueprint("inventory", __name__)

@inventory.route("/inventory", methods=["POST"])
def add_inventory():

    data = request.get_json()

    item = Inventory(
        waste_batch_id=data["waste_batch_id"],
        fabric_type=data["fabric_type"],
        source=data["source"],
        quantity=data["quantity"],
        color=data["color"],
        condition=data["condition"],
        collection_date=data["collection_date"]
    )

    db.session.add(item)
    db.session.commit()

    return jsonify({
        "message": "Inventory Added Successfully!"
    }), 201
@inventory.route("/inventory", methods=["GET"])
def get_inventory():

    items = Inventory.query.all()

    result = []

    for item in items:
        result.append({
            "id": item.id,
            "waste_batch_id": item.waste_batch_id,
            "fabric_type": item.fabric_type,
            "source": item.source,
            "quantity": item.quantity,
            "color": item.color,
            "condition": item.condition,
            "collection_date": item.collection_date
        })

    return jsonify(result), 200