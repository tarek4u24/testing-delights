# 📊 Performance Testing & Observability Lab

A complete environment combining **FastAPI**, **PostgreSQL**, **Locust**, **Prometheus**, **Grafana**, **Loki**, and **cAdvisor** to simulate real‑world performance engineering and monitoring.

---

# 🧩 Architecture Overview
```
FastAPI / DB / Containers → expose metrics
                ↓
           Prometheus scrapes them
                ↓
           Stores time‑series data
                ↓
           Grafana visualizes it
```

Components: 
* FastAPI — API backend
* PostgreSQL — database
* pgAdmin — DB GUI
* Prometheus — metrics scraper
* Grafana — dashboards
* cAdvisor — container metrics
* Loki — log aggregation
* Locust — load generator

## 📈 Grafana Dashboards

Explore dashboards at:  
https://grafana.com/grafana/dashboards

Recommended searches:
- Locust
- Prometheus
- Load testing

### Common Dashboard IDs
| Dashboard | ID |
|----------|----|
| Locust | 10441 |
| Prometheus Stats | 3662 |
| cAdvisor | 193 |
| Postgres Exporter | 9628 |

## 🐗 Locust (Headless Mode)

Run Locust without UI and auto‑generate HTML + CSV reports:

```bash
python -m locust -f locustfile.py \
  --headless \
  --users 50 \
  --spawn-rate 5 \
  --run-time 2m \
  --html reports/report.html \
  --csv reports/results \
  --csv-full-history


## 📚 API Documentation
Swagger UI:
http://localhost:8000/docs

Below is a clean, upgraded version of your code with:

✔ Public endpoints
/products

/products/{id}

✔ Authenticated user endpoints
/baskets

/baskets/{id}/items

/baskets/{id}

/products/secure

✔ Admin‑only endpoint
/products (create product)

✔ Role support (user vs admin)
This gives you a realistic load‑testing environment.

## Docker Container

Run to create docker container for n8n and others

```bash
docker-compose up --build -d
docker compose up --scale locust-worker=5
```


|Data Type |	Tool	| Why|
|Metrics	|Prometheus	| Time‑series, numeric, aggregated|
|Logs	|Loki	| Text, searchable, high‑volume|

## 🛢️ PostgreSQL Setup
```
docker exec -it perf_db psql -U perfuser -d perfdb
\dt --check if there any table
-- create tables
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    price NUMERIC,
    description TEXT
);

CREATE TABLE baskets (
    id SERIAL PRIMARY KEY
);

CREATE TABLE basket_items (
    id SERIAL PRIMARY KEY,
    basket_id INT REFERENCES baskets(id),
    product_id INT REFERENCES products(id),
    quantity INT
);
```

### Test API connectivity:
GET http://localhost:8000/items


### Check API logs:
docker logs perf_api
------------------------------------

# 🚀 Performance Test Scenarios

Six core scenarios used in real‑world performance engineering.

---

## 1️⃣ Health Check Load
**Purpose:** Validate API availability under load.  
**Endpoint:** `GET /health`  
**Pattern:**  
- High RPS  
- Very small payload  
- Baseline latency measurement  

---

## 2️⃣ Read‑Heavy Load (80% GET / 20% POST)
**Purpose:** Simulate typical production traffic.  
**Endpoints:**  
- `GET /items`  
- `POST /items`  

**Pattern:**  
- 80% reads  
- 20% writes  

---

## 3️⃣ Write‑Heavy Load (DB Stress)
**Purpose:** Push PostgreSQL to its limits.  
**Endpoints:**  
- `POST /items`  
- `PUT /items/{id}`  
- `DELETE /items/{id}`  

**Pattern:**  
- 70% writes  
- 30% reads  

---

## 4️⃣ Mixed CRUD Workflow
**Purpose:** Simulate a real user journey.  
**Flow:**  
1. Create item  
2. List items  
3. Get item  
4. Update item  
5. Delete item  

**Notes:**  
- Sequential  
- Stateful  
- Ideal for Locust TaskSets  

---

## 5️⃣ Spike Test
**Purpose:** Measure system reaction to sudden bursts.  
**Pattern:**  
- Start with 1 user  
- Jump instantly to 500  
- Hold for 30 seconds  
- Drop back to 1  

---

## 6️⃣ Soak Test (Long Duration)
**Purpose:** Detect slow degradation over time.  
**Pattern:**  
- Duration: 1–2 hours  
- Low RPS  
- Constant load  

**Watch for:**  
- Memory leaks  
- Connection leaks  
- Latency drift  
