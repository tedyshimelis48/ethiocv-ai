from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.openai_service import (
    generate_cv_summary
)

router = APIRouter()

class SummaryRequest(BaseModel):
    job_title: str
    experience: str
    skills: str

@router.post("/generate-summary")
def generate_summary(
    data: SummaryRequest
):
    summary = generate_cv_summary(
        data.job_title,
        data.experience,
        data.skills
    )

    return {
        "summary": summary
    }