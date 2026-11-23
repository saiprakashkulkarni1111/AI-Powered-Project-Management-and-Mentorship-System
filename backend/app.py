
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.auth import auth_bp
from routes.skill_assessment import skill_assessment_bp

app = Flask(__name__)

# Application configuration
app.config["SECRET_KEY"] = Config.SECRET_KEY
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False  # Local development only

# Allow React frontend to communicate with Flask
CORS(
    app,
    supports_credentials=True,
    origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
)

# Register authentication routes
app.register_blueprint(auth_bp)
app.register_blueprint(skill_assessment_bp)


@app.route("/")
def home():
    return jsonify({
        "message": "AETHERIS Flask Backend is running!",
        "status": "success"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
