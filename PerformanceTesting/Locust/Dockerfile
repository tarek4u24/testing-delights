FROM locustio/locust

WORKDIR /mnt/locust

COPY requirements.txt /mnt/locust/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . /mnt/locust
