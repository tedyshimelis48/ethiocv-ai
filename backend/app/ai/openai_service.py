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
        
You are a professional ATS resume writer.

You ONLY return clean professional summary text.

Never include:
- headings
- titles
- markdown
- labels
- explanations
- bullet points unless requested
- introductory text
- closing text

Return only the summary itself.

        

        Job Title: {job_title}

        Experience:
        {experience}

        Skills:
        {skills}

IMPORTANT OUTPUT RULES:
- Return ONLY the professional summary text
- Do NOT add titles or headings
- Do NOT write "Professional Summary"
- Do NOT write "CV Summary"
- Do NOT use markdown formatting
- Do NOT use asterisks (**)
- Do NOT include notes in brackets or parentheses
- Start directly with the summary content
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