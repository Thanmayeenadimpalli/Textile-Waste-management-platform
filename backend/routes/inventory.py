from flask import Blueprint, request, jsonify
from sqlalchemy import func
from models.inventory import Inventory
from models import db

inventory = Blueprint("inventory", __name__)

# ==========================
# GET ALL INVENTORY
# ==========================
@inventory.route("/inventory", methods=["GET"])
def get_inventory():
    items = Inventory.query.all()

    inventory_list = []

    for item in items:
        inventory_list.append({
            "id": item.id,
            "waste_batch_id": item.waste_batch_id,
            "fabric_type": item.fabric_type,
            "source": item.source,
            "quantity": item.quantity,
            "color": item.color,
            "condition": item.condition,
            "collection_date": item.collection_date
        })

    return jsonify(inventory_list), 200


# ==========================
# ADD INVENTORY
# ==========================
@inventory.route("/inventory", methods=["POST"])
def add_inventory():
    data = request.get_json()

    new_item = Inventory(
        waste_batch_id=data["waste_batch_id"],
        fabric_type=data["fabric_type"],
        source=data["source"],
        quantity=data["quantity"],
        color=data["color"],
        condition=data["condition"],
        collection_date=data["collection_date"]
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify({"message": "Inventory added successfully"}), 201


# ==========================
# UPDATE INVENTORY
# ==========================
@inventory.route("/inventory/<int:id>", methods=["PUT"])
def update_inventory(id):
    data = request.get_json()

    item = Inventory.query.get(id)

    if item is None:
        return jsonify({"message": "Inventory item not found"}), 404

    item.waste_batch_id = data["waste_batch_id"]
    item.fabric_type = data["fabric_type"]
    item.source = data["source"]
    item.quantity = data["quantity"]
    item.color = data["color"]
    item.condition = data["condition"]
    item.collection_date = data["collection_date"]

    db.session.commit()

    return jsonify({"message": "Inventory updated successfully"}), 200


# ==========================
# DELETE INVENTORY
# ==========================
@inventory.route("/inventory/<int:id>", methods=["DELETE"])
def delete_inventory(id):
    item = Inventory.query.get(id)

    if item is None:
        return jsonify({"message": "Inventory item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Inventory deleted successfully"}), 200


# ==========================
# INVENTORY ANALYTICS
# ==========================
@inventory.route("/inventory-stats", methods=["GET"])
def inventory_stats():

    # Total Inventory Records
    total_inventory = Inventory.query.count()

    # Fabric Type Distribution
    fabric_counts = (
        db.session.query(
            Inventory.fabric_type,
            func.count(Inventory.fabric_type)
        )
        .group_by(Inventory.fabric_type)
        .all()
    )

    fabric_chart = [
        {
            "label": fabric,
            "count": count
        }
        for fabric, count in fabric_counts
    ]

    # Source Distribution
    source_counts = (
        db.session.query(
            Inventory.source,
            func.count(Inventory.source)
        )
        .group_by(Inventory.source)
        .all()
    )

    source_chart = [
        {
            "label": source,
            "count": count
        }
        for source, count in source_counts
    ]

    # Total Quantity by Fabric Type
    quantity_data = (
        db.session.query(
            Inventory.fabric_type,
            func.sum(Inventory.quantity)
        )
        .group_by(Inventory.fabric_type)
        .all()
    )

    quantity_chart = [
        {
            "label": fabric,
            "quantity": float(quantity)
        }
        for fabric, quantity in quantity_data
    ]

    return jsonify({
        "total_inventory": total_inventory,
        "fabric_chart": fabric_chart,
        "source_chart": source_chart,
        "quantity_chart": quantity_chart
    }), 200