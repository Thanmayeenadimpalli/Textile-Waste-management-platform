from flask import Blueprint, jsonify
from models.prediction import Prediction
from models import db
from sqlalchemy import func

dashboard = Blueprint("dashboard", __name__)


@dashboard.route("/dashboard-stats", methods=["GET"])
def dashboard_stats():

    # Total Predictions
    total_predictions = Prediction.query.count()

    # Average Confidence
    avg_confidence = db.session.query(
        func.avg(Prediction.confidence)
    ).scalar()

    # Most Common Prediction
    most_common = (
        db.session.query(
            Prediction.prediction,
            func.count(Prediction.prediction).label("count")
        )
        .group_by(Prediction.prediction)
        .order_by(func.count(Prediction.prediction).desc())
        .first()
    )

    # Pie & Bar Chart Data
    prediction_counts = (
        db.session.query(
            Prediction.prediction,
            func.count(Prediction.prediction)
        )
        .group_by(Prediction.prediction)
        .all()
    )

    chart_data = [
        {
            "label": prediction,
            "count": count
        }
        for prediction, count in prediction_counts
    ]

    # Line Chart Data (Predictions Per Day)
    trend_counts = (
        db.session.query(
            func.date(Prediction.created_at).label("date"),
            func.count(Prediction.id).label("count")
        )
        .group_by(func.date(Prediction.created_at))
        .order_by(func.date(Prediction.created_at))
        .all()
    )

    trend_data = [
        {
            "date": str(date),
            "count": count
        }
        for date, count in trend_counts
    ]

    return jsonify({
        "total_predictions": total_predictions,
        "average_confidence": round(avg_confidence or 0, 2),
        "most_common": most_common[0] if most_common else "N/A",
        "chart_data": chart_data,
        "trend_data": trend_data
    })