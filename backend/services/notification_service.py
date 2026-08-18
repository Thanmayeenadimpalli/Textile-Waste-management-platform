from models import db
from models.notification import Notification


def create_notification(
    title,
    message,
    notification_type="info",
    user_id=None
):
    notification = Notification(
        user_id=user_id,
        title=title,
        message=message,
        notification_type=notification_type,
        is_read=False
    )

    db.session.add(notification)

    return notification