#!/usr/bin/python3
"""
define routes for interacting with the database
"""
from flask import request, jsonify
from . import db
from .models import Product, Price
from app import create_app

app = create_app()

@app.route('/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        data = request.get_json()
        new_product = Product(name=data['name'], description=data.get('description'))
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product created!'}), 201
    else:
        products = Product.query.all()
        return jsonify([{'id': p.id, 'name': p.name, 'description': p.description} for p in products])

@app.route('/prices', methods=['GET', 'POST'])
def handle_prices():
    if request.method == 'POST':
        data = request.get_json()
        product = Product.query.get(data['product_id'])
        if not product:
            return jsonify({'message': 'Product not found!'}), 404

        new_price = Price(product_id=data['product_id'], price=data['price'], date=data['date'])
        db.session.add(new_price)
        db.session.commit()
        return jsonify({'message': 'Price added!'}), 201
    else:
        prices = Price.query.all()
        return jsonify([{'id': p.id, 'product_id': p.product_id, 'price': p.price, 'date': p.date} for p in prices])
