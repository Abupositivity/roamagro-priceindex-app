import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# remove_last_updated_prices.py
from app import create_app, db
from app.models import Price
from datetime import datetime

app = create_app()

def remove_last_updated_prices():
    with app.app_context():
        # Find the most recent update date
        most_recent_date = db.session.query(db.func.max(Price.date)).scalar()

        if most_recent_date:
            # Delete all prices with the most recent update date
            db.session.query(Price).filter(Price.date == most_recent_date).delete()
            db.session.commit()
            print(f"Prices updated on {most_recent_date} have been removed.")
        else:
            print("No prices found in the database.")

if __name__ == "__main__":
    remove_last_updated_prices()
