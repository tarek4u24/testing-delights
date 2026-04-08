import requests

def login(host, username, password):
    response = requests.post(
        f"{host}/auth/login",
        json={"username": username, "password": password},
    )

    if response.status_code == 200:
        data = response.json()
        return {"Authorization": f"Bearer {data['access_token']}"}

    else:
        print(f"Login failed for {username}: {response.text}")
        return None

def test_valid_login():
    auth=login("http://localhost:8000","tarek","password123")
    assert auth is not None
    assert "Authorization" in auth
    assert auth["Authorization"].startswith("Bearer ")


def test_invalid_login():
    auth=login("http://localhost:8000","worng","wrong")
    assert auth is None