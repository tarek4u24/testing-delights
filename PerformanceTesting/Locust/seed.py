import requests

BASE = "http://localhost:8000"

SEED_DATA = [
    {"name": "iPhone 15", "price": 1299, "description": "Latest model"},
    {"name": "Galaxy S24", "price": 1199, "description": "Android flagship"},
    {"name": "Sony XM5", "price": 499, "description": "Headphones"},
    {"name": "Dell XPS 15", "price": 2499, "description": "Laptop"},
    {"name": "MX Master 3S", "price": 149, "description": "Mouse"},
]

def seed_products():
    existing = requests.get(f"{BASE}/products").json()
    existing_names = {p[1] for p in existing}  # p[1] = name

    for product in SEED_DATA:
        if product["name"] not in existing_names:
            requests.post(f"{BASE}/products", json=product)
            print(f"Created: {product['name']}")
        else:
            print(f"Skipped (already exists): {product['name']}")

if __name__ == "__main__":
    seed_products()
