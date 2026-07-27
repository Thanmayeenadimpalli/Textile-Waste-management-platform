from . import db
from datetime import datetime


class Prediction(db.Model):
    __tablename__ = "predictions"

    id = db.Column(db.Integer, primary_key=True)

    image_name = db.Column(db.String(255), nullable=False)

    prediction = db.Column(db.String(100), nullable=False)

    confidence = db.Column(db.Float, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)