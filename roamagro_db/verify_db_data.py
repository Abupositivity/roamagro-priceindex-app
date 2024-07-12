import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import Price

app = create_app()
app.app_context().push()

# Query all Price records
prices = Price.query.all()

# Print each Price record
for price in prices:
    print(f"ID: {price.id}, Product ID: {price.product_id}, Price: {price.price}, Date: {price.date}")
