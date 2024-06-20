#!/usr/bin/python3
"""
define the Product and Price models
"""
from . import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)

    prices = db.relationship('Price', backref='product', lazy=True)

class Price(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    date = db.Column(db.Date, nullable=False)

    __table_args__ = (db.UniqueConstraint('product_id', 'date', name='_product_date_uc'),)
