from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_endpoint() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_names_routes_are_registered() -> None:
    paths = {route.path for route in app.routes}
    assert "/api/v1/names" in paths
    assert "/api/v1/names/{slug}" in paths
