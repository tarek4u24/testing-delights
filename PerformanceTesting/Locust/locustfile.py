from tests import login
from locust import HttpUser, task, between, FastHttpUser
import random
import os
from dotenv import find_dotenv, load_dotenv
from shape import StepLoadProfile

# Load environment variables BEFORE Locust reads the classes
load_dotenv(".env.local")


# ---------------------------------------------------------
# RETAIL USER — behaves like a normal shopper
# ---------------------------------------------------------
class RetailUser(FastHttpUser):
    wait_time = between(1, 3)
    host = os.getenv("BASE_HOST")  

    def on_start(self):
        self.username = os.getenv("retail_username")
        self.password = os.getenv("retail_password")
        self.auth_headers = login(self.host, self.username, self.password)

    @task(8)
    def browse_products(self):
        self.client.get("/products", name="Retail: Browse Products")

    @task(3)
    def view_random_product(self):
        product_id = random.randint(1, 5)
        self.client.get(f"/products/{product_id}", name="Retail: View Product")

    @task(2)
    def add_to_basket(self):
        basket = self.client.post(
            "/baskets",
            headers=self.auth_headers,
            name="Retail: Create Basket"
        )

        if basket.status_code != 200:
            return

        basket_id = basket.json().get("basket_id")

        product_id = random.randint(1, 5)
        self.client.post(
            f"/baskets/{basket_id}/items",
            json={"product_id": product_id, "quantity": 1},
            headers=self.auth_headers,
            name="Retail: Add to Basket"
        )


# ---------------------------------------------------------
# COMMERCIAL USER — bulk buyer or wholesaler
# ---------------------------------------------------------
class CommercialUser(FastHttpUser):
    wait_time = between(1, 2)
    host = os.getenv("BASE_HOST")   # <-- same here

    def on_start(self):
        self.username = os.getenv("commercial_username")
        self.password = os.getenv("commercial_password")
        self.auth_headers = login(self.host, self.username, self.password)

    @task(3)
    def list_products(self):
        self.client.get("/products", name="Commercial: List Products")

    @task(5)
    def bulk_order(self):
        basket = self.client.post(
            "/baskets",
            headers=self.auth_headers,
            name="Commercial: Create Basket"
        )

        if basket.status_code != 200:
            return

        basket_id = basket.json().get("basket_id")

        for _ in range(random.randint(10, 20)):
            product_id = random.randint(1, 5)
            qty = random.randint(5, 20)

            self.client.post(
                f"/baskets/{basket_id}/items",
                json={"product_id": product_id, "quantity": qty},
                headers=self.auth_headers,
                name="Commercial: Bulk Add to Basket"
            )
