import os
from pathlib import Path
from openai import OpenAI
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent.parent / ".env"

load_dotenv(dotenv_path=env_path)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def generate_cv_summary(
    job_title,
    experience,
    skills
):
    try:
        prompt = f"""
        You are a professional CV writer.

        Create a professional CV summary for:

        Job Title: {job_title}

        Experience:
        {experience}

        Skills:
        {skills}

        Rules:
        - Professional tone
        - Simple English
        - Maximum 5 lines
        - ATS-friendly
        """

        response = client.chat.completions.create(
            model="deepseek/deepseek-chat",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("AI ERROR:", e)
        return str(e)