from flask import Blueprint, jsonify, request

from models import db
from models.notification import Notification


notifications = Blueprint(
    "notifications",
    __name__
)


# ==========================================
# GET NOTIFICATIONS
# ==========================================

@notifications.route(
    "/notifications",
    methods=["GET"]
)
def get_notifications():

    user_id = request.args.get(
        "user_id",
        type=int
    )

    query = Notification.query

    if user_id:
        query = query.filter(
            Notification.user_id == user_id
        )

    notification_list = (
        query
        .order_by(
            Notification.created_at.desc()
        )
        .limit(50)
        .all()
    )

    return jsonify([
        notification.to_dict()
        for notification in notification_list
    ]), 200


# ==========================================
# UNREAD COUNT
# ==========================================

@notifications.route(
    "/notifications/unread-count",
    methods=["GET"]
)
def unread_count():

    user_id = request.args.get(
        "user_id",
        type=int
    )

    query = Notification.query.filter(
        Notification.is_read == False
    )

    if user_id:
        query = query.filter(
            Notification.user_id == user_id
        )

    count = query.count()

    return jsonify({
        "count": count
    }), 200


# ==========================================
# MARK ONE AS READ
# ==========================================

@notifications.route(
    "/notifications/<int:notification_id>/read",
    methods=["PUT"]
)
def mark_as_read(notification_id):

    notification = Notification.query.get(
        notification_id
    )

    if notification is None:
        return jsonify({
            "message": "Notification not found"
        }), 404

    notification.is_read = True

    db.session.commit()

    return jsonify({
        "message": "Notification marked as read"
    }), 200


# ==========================================
# MARK ALL AS READ
# ==========================================

@notifications.route(
    "/notifications/read-all",
    methods=["PUT"]
)
def mark_all_as_read():

    user_id = request.args.get(
        "user_id",
        type=int
    )

    query = Notification.query.filter(
        Notification.is_read == False
    )

    if user_id:
        query = query.filter(
            Notification.user_id == user_id
        )

    query.update({
        Notification.is_read: True
    })

    db.session.commit()

    return jsonify({
        "message": "All notifications marked as read"
    }), 200