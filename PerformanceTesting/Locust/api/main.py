from fastapi import FastAPI, Depends, HTTPException, Body
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator
import psycopg2
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from PerformanceTesting.Locust.api.auth_users import fake_users

# -----------------------------
# AUTH CONFIG
# -----------------------------

SECRET_KEY = "supersecretkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        role = payload.get("role")

        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return {"username": username, "role": role}

    except JWTError:
        raise HTTPException(status_code=401, detail="Token expired or invalid")


def require_admin(user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


# -----------------------------
# FASTAPI + METRICS
# -----------------------------

app = FastAPI()
Instrumentator().instrument(app).expose(app)


# -----------------------------
# AUTH ENDPOINTS
# -----------------------------

class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/auth/login")
def login(data: LoginRequest):
    user = fake_users.get(data.username)

    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({
        "sub": data.username,
        "role": user["role"]
    })

    return {"access_token": access_token, "token_type": "bearer"}


# -----------------------------
# MODELS
# -----------------------------

class Product(BaseModel):
    name: str
    price: float
    description: str | None = None


class AddToBasket(BaseModel):
    product_id: int
    quantity: int = 1


# -----------------------------
# DB CONNECTION
# -----------------------------

def get_conn():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        host=os.getenv("DB_HOST")
    )


# -----------------------------
# HEALTH CHECK
# -----------------------------

@app.get("/health")
def health():
    return {"status": "ok"}


# -----------------------------
# PRODUCT ENDPOINTS
# -----------------------------

# ADMIN ONLY
@app.post("/products")
def create_product(product: Product, user=Depends(require_admin)):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO products (name, price, description) VALUES (%s, %s, %s) RETURNING id",
        (product.name, product.price, product.description)
    )
    product_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {"id": product_id, "message": "product created"}


# PUBLIC
@app.get("/products")
def list_products():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, name, price, description FROM products")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    return [
        {"id": r[0], "name": r[1], "price": float(r[2]), "description": r[3]}
        for r in rows
    ]


@app.get("/products/{product_id}")
def get_product(product_id: int):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        "SELECT id, name, price, description FROM products WHERE id = %s",
        (product_id,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Product not found")

    return {
        "id": row[0],
        "name": row[1],
        "price": float(row[2]),
        "description": row[3],
    }


# -----------------------------
# BASKET ENDPOINTS (AUTH REQUIRED)
# -----------------------------

@app.post("/baskets")
def create_basket(user=Depends(get_current_user)):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("INSERT INTO baskets DEFAULT VALUES RETURNING id")
    basket_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        "basket_id": basket_id,
        "message": "basket created",
        "user": user["username"]
    }


@app.post("/baskets/{basket_id}/items")
def add_to_basket(basket_id: int, item: AddToBasket, user=Depends(get_current_user)):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO basket_items (basket_id, product_id, quantity) VALUES (%s, %s, %s)",
        (basket_id, item.product_id, item.quantity)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {"message": "item added to basket", "user": user["username"]}


@app.get("/baskets/{basket_id}")
def get_basket(basket_id: int, user=Depends(get_current_user)):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
        SELECT p.name, p.price, bi.quantity
        FROM basket_items bi
        JOIN products p ON p.id = bi.product_id
        WHERE bi.basket_id = %s
    """, (basket_id,))
    rows = cur.fetchall()
    cur.close()
    conn.close()

    return rows
