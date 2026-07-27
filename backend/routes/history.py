from flask import Blueprint, jsonify
from models.prediction import Prediction

history = Blueprint("history", __name__)


@history.route("/history", methods=["GET"])
def get_history():

    predictions = Prediction.query.order_by(
        Prediction.created_at.desc()
    ).all()

    data = []

    for item in predictions:
        data.append({
            "id": item.id,
            "image_name": item.image_name,
            "prediction": item.prediction,
            "confidence": item.confidence,
            "created_at": item.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(data)