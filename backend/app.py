from flask import Flask
from flask_cors import CORS
from models import db
from models.user import User
from config import Config
from routes.auth import auth
from models.inventory import Inventory
from routes.inventory import inventory
app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

CORS(app)
app.register_blueprint(auth)
app.register_blueprint(inventory)

@app.route("/")
def home():
    return {
        "message": "Textile Waste Management Backend is Running!",
        "status": "success"
    }

if __name__ == "__main__":
    with app.app_context():
        db.create_all()   # Creates all tables (when models exist)
    app.run(debug=True)