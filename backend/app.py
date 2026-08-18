from flask import Flask
from flask_cors import CORS

from models import db
from models.user import User
from models.inventory import Inventory
from models.prediction import Prediction
from models.notification import Notification

from config import Config

from routes.auth import auth
from routes.inventory import inventory
from routes.predict import predict
from routes.history import history
from routes.dashboard import dashboard
from routes.sustainability import sustainability
from routes.recommendations import recommendations
from routes.circularity import circularity
from routes.notifications import notifications
from routes.reports import reports


app = Flask(__name__)

app.config.from_object(Config)


# =========================================================
# DATABASE
# =========================================================

db.init_app(app)


# =========================================================
# CORS
# =========================================================

CORS(app)


# =========================================================
# REGISTER BLUEPRINTS
# =========================================================

app.register_blueprint(auth)

app.register_blueprint(inventory)

app.register_blueprint(predict)

app.register_blueprint(history)

app.register_blueprint(dashboard)

app.register_blueprint(sustainability)

app.register_blueprint(recommendations)

app.register_blueprint(circularity)
app.register_blueprint(reports)

# Notification API
app.register_blueprint(notifications)


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():

    return {
        "message":
            "Textile Waste Management Backend is Running!",

        "status":
            "success"
    }


# =========================================================
# START APPLICATION
# =========================================================

if __name__ == "__main__":

    with app.app_context():

        db.create_all()

    app.run(debug=True)