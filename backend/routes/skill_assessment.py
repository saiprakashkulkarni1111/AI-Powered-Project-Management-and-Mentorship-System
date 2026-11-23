
import time
import secrets
import json
import mysql.connector

from flask import Blueprint, request, jsonify, session
from services.gemini_service import generate_skill_questions
from config import Config


skill_assessment_bp = Blueprint(
    "skill_assessment",
    __name__,
    url_prefix="/api/v1/skill-assessment"
)


def get_db_connection():
    return mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME
    )


# Temporary backend assessment storage
TEMP_ASSESSMENTS = {}

ASSESSMENT_EXPIRY = 30 * 60


def clean_expired_assessments():
    current_time = time.time()

    expired_ids = [
        assessment_id
        for assessment_id, assessment in TEMP_ASSESSMENTS.items()
        if current_time - assessment["created_at"] > ASSESSMENT_EXPIRY
    ]

    for assessment_id in expired_ids:
        del TEMP_ASSESSMENTS[assessment_id]


# GENERATE QUESTIONS
@skill_assessment_bp.route("/generate", methods=["POST"])
def generate_questions():
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Please log in first."}), 401

        data = request.get_json(silent=True) or {}
        skills = data.get("skills", [])

        if not isinstance(skills, list) or not skills:
            return jsonify({"error": "Please select at least one skill."}), 400

        if len(skills) > 5:
            return jsonify({"error": "Maximum 5 skills allowed."}), 400

        if not all(
            isinstance(skill, str) and skill.strip()
            for skill in skills
        ):
            return jsonify({"error": "Invalid skill selection."}), 400

        skills = list(dict.fromkeys(skill.strip() for skill in skills))

        all_questions = []

        for skill in skills:
            questions = generate_skill_questions(skill, count=10)

            for question in questions:
                all_questions.append({
                    "id": len(all_questions) + 1,
                    "skill": skill,
                    "q": question["q"],
                    "o": question["o"],
                    "d": question["d"],
                    "a": question["a"],
                    "explanation": question["explanation"]
                })

        clean_expired_assessments()

        assessment_id = secrets.token_urlsafe(32)

        TEMP_ASSESSMENTS[assessment_id] = {
            "user_id": user_id,
            "questions": all_questions,
            "created_at": time.time()
        }

        public_questions = [
            {
                "id": q["id"],
                "skill": q["skill"],
                "q": q["q"],
                "o": q["o"],
                "d": q["d"]
            }
            for q in all_questions
        ]

        return jsonify({
            "message": "Questions generated successfully.",
            "assessment_id": assessment_id,
            "total_questions": len(public_questions),
            "questions": public_questions
        }), 200

    except Exception as error:
        print("Skill assessment error:", error)

        return jsonify({
            "error": "Unable to generate questions. Please try again."
        }), 500


# SUBMIT AND EVALUATE ASSESSMENT
@skill_assessment_bp.route("/submit", methods=["POST"])
def submit_assessment():
    connection = None
    cursor = None

    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Please log in first."}), 401

        data = request.get_json(silent=True) or {}

        assessment_id = data.get("assessment_id")
        answers = data.get("answers")

        if not isinstance(assessment_id, str) or not assessment_id:
            return jsonify({"error": "Assessment ID is required."}), 400

        if not isinstance(answers, dict):
            return jsonify({"error": "Answers must be provided."}), 400

        clean_expired_assessments()

        assessment = TEMP_ASSESSMENTS.get(assessment_id)

        if not assessment or assessment["user_id"] != user_id:
            return jsonify({
                "error": "Assessment not found or expired."
            }), 404

        questions = assessment["questions"]

        question_ids = {
            str(q["id"]) for q in questions
        }

        if set(answers.keys()) != question_ids:
            return jsonify({
                "error": "Please answer all questions."
            }), 400

        score = 0
        total = len(questions)
        skill_results = {}

        for question in questions:
            question_id = str(question["id"])
            selected_answer = answers[question_id]

            if type(selected_answer) is not int or selected_answer not in range(4):
                return jsonify({
                    "error": "Invalid answer option."
                }), 400

            skill = question["skill"]

            if skill not in skill_results:
                skill_results[skill] = {
                    "correct": 0,
                    "total": 0
                }

            skill_results[skill]["total"] += 1

            if selected_answer == question["a"]:
                score += 1
                skill_results[skill]["correct"] += 1

        percentage = round((score / total) * 100, 2)

        selected_skills = list(skill_results.keys())

        # Save result in MySQL
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO skill_assessment_results
            (user_id, skills, total_questions, score, percentage, skill_results)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                user_id,
                json.dumps(selected_skills),
                total,
                score,
                percentage,
                json.dumps(skill_results)
            )
        )

        connection.commit()

        # Delete temporary assessment only after successful DB save
        del TEMP_ASSESSMENTS[assessment_id]

        return jsonify({
            "message": "Assessment evaluated and saved successfully.",
            "score": score,
            "total_questions": total,
            "percentage": percentage,
            "skill_results": skill_results
        }), 200

    except mysql.connector.Error as error:
        if connection and connection.is_connected():
            connection.rollback()

        print("MySQL assessment error:", error)

        return jsonify({
            "error": "Unable to save assessment result."
        }), 500

    except Exception as error:
        print("Assessment evaluation error:", error)

        return jsonify({
            "error": "Unable to evaluate assessment."
        }), 500

    finally:
        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()
