import csv
import sys
import os
from datetime import datetime

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import Price, Product

app = create_app()

def populate_prices_from_csv(file_path):
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            product_id = row['product_id']
            price = row['price']
            date_str = row['date'].strip()  # Ensure no leading/trailing whitespace
            try:
                date = datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                print(f"Ignoring row with invalid date format: {row}")
                continue

            price_entry = Price(product_id=product_id, price=price, date=date)
            db.session.add(price_entry)
        db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        file_path = 'data.csv'
        populate_prices_from_csv(file_path)
        print("Database populated successfully with current and accurate data.")
