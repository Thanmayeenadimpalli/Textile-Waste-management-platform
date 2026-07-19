from flask import Blueprint, request, jsonify
from models import db
from models.user import User

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Check whether user already exists
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    new_user = User(
        username=username,
        email=email,
        password=password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User Registered Successfully!"}), 201
@auth.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"message": "User not found"}), 404

    if user.password != password:
        return jsonify({"message": "Invalid Password"}), 401

    return jsonify({
        "message": "Login Successful",
        "username": user.username,
        "email": user.email
    }), 200