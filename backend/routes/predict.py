from flask import Blueprint, request, jsonify
import tensorflow as tf
import joblib
import numpy as np
import os
from tensorflow.keras.preprocessing import image
from models import db
from models.prediction import Prediction
from ai.recommendations import RECOMMENDATIONS
from ai.sustainability import SUSTAINABILITY_DATA

predict = Blueprint("predict", __name__)

# Load model only once
MODEL_PATH = os.path.join("ai", "textile_model.keras")
LABEL_PATH = os.path.join("ai", "label_encoder.pkl")

model = tf.keras.models.load_model(MODEL_PATH)
label_encoder = joblib.load(LABEL_PATH)
sustainability = SUSTAINABILITY_DATA.get(label)

def predict_single_image(img_path):

    img = image.load_img(img_path, target_size=(224, 224))

    img_array = image.img_to_array(img)

    img_array = np.expand_dims(img_array, axis=0)

    img_array = img_array / 255.0

    prediction = model.predict(img_array, verbose=0)

    predicted_index = np.argmax(prediction)

    confidence = float(np.max(prediction) * 100)

    predicted_label = label_encoder.inverse_transform([predicted_index])[0]

    return predicted_label, confidence


@predict.route("/predict", methods=["POST"])
def predict_images():

    if "images" not in request.files:
        return jsonify({"message": "No images uploaded"}), 400

    files = request.files.getlist("images")

    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    results = []

    for file in files:

        file_path = os.path.join(upload_folder, file.filename)

        file.save(file_path)

        label, confidence = predict_single_image(file_path)

        recommendation = RECOMMENDATIONS.get(
    label,
    {
        "recommendation": ["No recommendation available."],
        "impact": "N/A"
    }
)

# Save to database
        prediction_record = Prediction(
        image_name=file.filename,
        prediction=label,
        confidence=round(confidence, 2)
        )

        db.session.add(prediction_record)

        results.append({
    "image": file.filename,
    "prediction": label,
    "confidence": round(confidence, 2),
    "recommendation": recommendation["recommendation"],
    "impact": recommendation["impact"]
})
    db.session.commit()
    return jsonify(results)