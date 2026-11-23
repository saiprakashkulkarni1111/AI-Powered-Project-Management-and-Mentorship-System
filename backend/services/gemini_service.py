
import json
from google import genai

from config import Config


def get_gemini_client():
    if not Config.GEMINI_API_KEY:
        raise ValueError("Gemini API key is missing from .env")

    return genai.Client(api_key=Config.GEMINI_API_KEY)


def generate_skill_questions(skill, count=10):

    if not skill or not skill.strip():
        raise ValueError("Skill name is required.")

    client = get_gemini_client()

    prompt = f"""
    Generate exactly {count} multiple-choice questions
    to assess a student's knowledge of {skill}.

    Requirements:
    - Include Beginner, Intermediate and Advanced questions.
    - Each question must have exactly four options.
    - Only one option must be correct.
    - Avoid duplicate questions.
    - Include a short explanation.
    - Answer index must be 0, 1, 2 or 3.

    Return questions using this structure:
    {{
        "questions": [
            {{
                "q": "Question text",
                "o": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "a": 0,
                "d": "Beginner",
                "explanation": "Explanation"
            }}
        ]
    }}
    """

    response_schema = {
        "type": "object",
        "properties": {
            "questions": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "q": {"type": "string"},
                        "o": {
                            "type": "array",
                            "items": {"type": "string"}
                        },
                        "a": {"type": "integer"},
                        "d": {"type": "string"},
                        "explanation": {"type": "string"}
                    },
                    "required": ["q", "o", "a", "d", "explanation"]
                }
            }
        },
        "required": ["questions"]
    }

    try:
        response = client.interactions.create(
            model="gemini-3.5-flash",
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": response_schema
            }
        )

        data = json.loads(response.output_text)
        questions = data.get("questions", [])

        if len(questions) != count:
            raise ValueError("Unexpected number of generated questions.")

        for question in questions:
            if (
                not isinstance(question["q"], str)
                or not question["q"].strip()
                or not isinstance(question["o"], list)
                or len(question["o"]) != 4
                or not all(isinstance(option, str) and option.strip()
                           for option in question["o"])
                or type(question["a"]) is not int
                or question["a"] not in range(4)
            ):
                raise ValueError("Gemini generated an invalid question.")

            if question["d"] not in [
                "Beginner", "Intermediate", "Advanced"
            ]:
                question["d"] = "Intermediate"

        return questions

    except Exception as error:
        print("Gemini question generation error:", error)
        raise
