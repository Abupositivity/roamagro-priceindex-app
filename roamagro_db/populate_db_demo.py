import sys
import os
from datetime import datetime, timedelta

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import Price, Product
import random

# Create and push application context
app = create_app()
app.app_context().push()

# Define produce with price ranges
produce = [
    ('Maize', 50000, 80000),
    ('Rice', 50000, 70000),
    ('Paddy Rice', 45000, 65000),
    ('Beans', 120000, 160000),
    ('Soybeans', 60000, 87000),
    ('Sorghum', 50000, 85000),
    ('Sweet Potato', 25000, 45000),
    ('Dried Tomatoes', 90000, 160000),
    ('Dried Pepper', 70000, 140000),
    ('Wheat', 70000, 90000),
    ('Millet', 60000, 90000),
]

# Calculate the start date for the current week
today = datetime.today()
start_of_week = today - timedelta(days=today.weekday())  # Monday of the current week

# Add prices for the current week
for item in produce:
    name, min_price, max_price = item
    price = random.randint(min_price // 100, max_price // 100) * 100
    # Retrieve or create the Product instance if needed
    product = Product.query.filter_by(name=name).first()
    if not product:
        product = Product(name=name)
        db.session.add(product)
        db.session.commit()
    new_price = Price(
        product_id=product.id,
        price=price,
        date=start_of_week,
    )
    db.session.add(new_price)

# Commit changes to the database
db.session.commit()

print("Demo prices for the current week added successfully.")
