import unittest
from unittest.mock import patch
from app.services import calculate_average_price

class TestServices(unittest.TestCase):

    def test_calculate_average_price(self):
        """Test calculate_average_price function"""
        # Mock data
        prices = [{'price': 10.0}, {'price': 15.0}, {'price': 20.0}]

        # Test the function
        average_price = calculate_average_price(prices)

        # Assert the result
        self.assertEqual(average_price, 15.0)

if __name__ == '__main__':
    unittest.main()
