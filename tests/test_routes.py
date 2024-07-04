import unittest
from app import create_app, db
from app.models import Price
import json

class TestRoutes(unittest.TestCase):

    def setUp(self):
        """Set up test app and test client"""
        self.app = create_app('test_config')
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        """Clean up after each test"""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_get_prices(self):
        """Test GET /prices endpoint"""
        # Create test data
        price1 = Price(product_id=1, price=10.5, date='2024-07-01')
        price2 = Price(product_id=2, price=15.2, date='2024-07-02')
        db.session.add_all([price1, price2])
        db.session.commit()

        # Make GET request to /prices
        response = self.client.get('/prices')

        # Assert response status code
        self.assertEqual(response.status_code, 200)

        # Assert response data
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(data), 2)  # Assuming two prices were added
        self.assertEqual(data[0]['price'], 10.5)
        self.assertEqual(data[1]['product_id'], 2)

    def test_add_price(self):
        """Test POST /prices endpoint"""
        # Test data
        new_price = {'product_id': 3, 'price': 12.0, 'date': '2024-07-03'}

        # Make POST request to /prices
        response = self.client.post('/prices', data=json.dumps(new_price), content_type='application/json')

        # Assert response status code
        self.assertEqual(response.status_code, 201)

        # Assert price was added to the database
        price = Price.query.filter_by(product_id=3).first()
        self.assertIsNotNone(price)
        self.assertEqual(price.price, 12.0)
        self.assertEqual(price.date, '2024-07-03')

if __name__ == '__main__':
    unittest.main()
