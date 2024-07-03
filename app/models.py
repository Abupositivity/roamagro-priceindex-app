#!/usr/bin/python3
"""
define the Product and Price models
"""
from app import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class Price(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    price = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    product = db.relationship('Product', backref=db.backref('prices', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'price': self.price,
            'date': self.date.isoformat()
        }
