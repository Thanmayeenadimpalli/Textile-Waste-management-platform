from flask import Blueprint, jsonify, request

from services.email_service import send_report_email

from models import db
from models.notification import Notification


reports = Blueprint(
    "reports",
    __name__
)


@reports.route(
    "/reports/email",
    methods=["POST"]
)
def email_report():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    recipient_email = data.get(
        "recipient_email"
    )

    pdf_base64 = data.get(
        "pdf_base64"
    )

    filename = data.get(
        "filename",
        "Textile_Prediction_Report.pdf"
    )

    user_id = data.get(
        "user_id"
    )

    if not recipient_email:
        return jsonify({
            "message": "Recipient email is required"
        }), 400

    if not pdf_base64:
        return jsonify({
            "message": "PDF data is required"
        }), 400

    try:

        send_report_email(
            recipient_email=recipient_email,
            pdf_base64=pdf_base64,
            filename=filename
        )

        # Create notification after successful email
        notification = Notification(
            user_id=user_id,
            title="Report Emailed",
            message=(
                "Your textile waste report "
                "was successfully sent to your email."
            ),
            notification_type="report"
        )

        db.session.add(notification)
        db.session.commit()

        return jsonify({
            "message": "Report emailed successfully"
        }), 200

    except Exception as error:

        db.session.rollback()

        print(
            "Email error:",
            error
        )

        return jsonify({
            "message": "Failed to send report email",
            "error": str(error)
        }), 500