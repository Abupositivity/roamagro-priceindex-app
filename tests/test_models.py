import unittest
from app import db
from app.models import Product, Price

class TestModels(unittest.TestCase):

    def setUp(self):
        """Set up the test database"""
        self.db = db
        self.db.create_all()

    def tearDown(self):
        """Clean up after each test"""
        self.db.session.remove()
        self.db.drop_all()

    def test_product_model(self):
        """Test Product model"""
        # Create a Product instance
        product = Product(name='Apple', description='Fresh apple')

        # Add and commit to database
        self.db.session.add(product)
        self.db.session.commit()

        # Retrieve the product
        retrieved_product = Product.query.filter_by(name='Apple').first()

        # Assert the retrieved product is correct
        self.assertIsNotNone(retrieved_product)
        self.assertEqual(retrieved_product.description, 'Fresh apple')

    def test_price_model(self):
        """Test Price model"""
        # Create a Price instance
        price = Price(product_id=1, price=10.5, date='2024-07-01')

        # Add and commit to database
        self.db.session.add(price)
        self.db.session.commit()

        # Retrieve the price
        retrieved_price = Price.query.filter_by(product_id=1).first()

        # Assert the retrieved price is correct
        self.assertIsNotNone(retrieved_price)
        self.assertEqual(retrieved_price.price, 10.5)
        self.assertEqual(retrieved_price.date, '2024-07-01')

if __name__ == '__main__':
    unittest.main()
