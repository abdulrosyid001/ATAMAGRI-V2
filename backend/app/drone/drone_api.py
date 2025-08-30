from fastapi import APIRouter, FastAPI
from .drone import get_drone_status

router = APIRouter(prefix="/api/drone")

@router.get("/status")
def drone_status():
	return get_drone_status()

def get_app():
	app = FastAPI()
	app.include_router(router)
	return app

app = get_app()
