from flask import Blueprint, request, jsonify
import tensorflow as tf
import joblib
import numpy as np
import os

from tensorflow.keras.preprocessing import image

from models import db
from models.prediction import Prediction

from ai.recommendations import generate_recommendations
from ai.sustainability import (
    calculate_environmental_impact,
    calculate_circularity_score
)


predict = Blueprint("predict", __name__)


# ============================
# LOAD MODEL
# ============================

MODEL_PATH = os.path.join(
    "ai",
    "textile_model.keras"
)

LABEL_PATH = os.path.join(
    "ai",
    "label_encoder.pkl"
)

model = tf.keras.models.load_model(
    MODEL_PATH
)

label_encoder = joblib.load(
    LABEL_PATH
)


# ============================
# SINGLE IMAGE PREDICTION
# ============================

def predict_single_image(img_path):

    img = image.load_img(
        img_path,
        target_size=(224, 224)
    )

    img_array = image.img_to_array(img)

    img_array = np.expand_dims(
        img_array,
        axis=0
    )

    img_array = img_array / 255.0

    prediction = model.predict(
        img_array,
        verbose=0
    )

    predicted_index = np.argmax(
        prediction
    )

    confidence = float(
        np.max(prediction) * 100
    )

    predicted_label = (
        label_encoder.inverse_transform(
            [predicted_index]
        )[0]
    )

    return predicted_label, confidence


# ============================
# PREDICTION API
# ============================

@predict.route(
    "/predict",
    methods=["POST"]
)
def predict_images():

    if "images" not in request.files:

        return jsonify({
            "message": "No images uploaded"
        }), 400


    # ============================
    # GET TEXTILE INFORMATION
    # ============================

    fabric_type = request.form.get(
        "fabric_type",
        "Cotton"
    )

    quantity = request.form.get(
        "quantity",
        1
    )

    condition = request.form.get(
        "condition",
        "Good"
    )


    try:

        quantity = float(quantity)

    except (TypeError, ValueError):

        return jsonify({
            "message": "Quantity must be a number"
        }), 400


    files = request.files.getlist(
        "images"
    )

    upload_folder = "uploads"

    os.makedirs(
        upload_folder,
        exist_ok=True
    )

    results = []


    # ============================
    # PROCESS EACH IMAGE
    # ============================

    for file in files:

        file_path = os.path.join(
            upload_folder,
            file.filename
        )

        file.save(
            file_path
        )


        # AI prediction

        label, confidence = (
            predict_single_image(
                file_path
            )
        )


        # ============================
        # SUSTAINABILITY
        # ============================

        environmental_impact = (
            calculate_environmental_impact(
                fabric_type,
                quantity
            )
        )


        # ============================
        # CIRCULARITY
        # ============================

        circularity = (
            calculate_circularity_score(
                fabric_type,
                condition
            )
        )


        # ============================
        # RECOMMENDATIONS
        # ============================

        recommendation = (
            generate_recommendations(
                fabric_type,
                condition,
                label
            )
        )


        # ============================
        # SAVE PREDICTION
        # ============================

        prediction_record = Prediction(

            image_name=file.filename,

            prediction=label,

            confidence=round(
                confidence,
                2
            )
        )

        db.session.add(
            prediction_record
        )


        # ============================
        # RESPONSE
        # ============================

        results.append({

            "image": file.filename,

            "prediction": label,

            "confidence": round(
                confidence,
                2
            ),

            "fabric_type": fabric_type,

            "quantity": quantity,

            "condition": condition,

            "environmental_impact":
                environmental_impact,

            "circularity":
                circularity,

            "recommendations":
                recommendation[
                    "recommendations"
                ],

            "impact":
                recommendation[
                    "impact"
                ]

        })


    db.session.commit()


    return jsonify(
        results
    ), 200