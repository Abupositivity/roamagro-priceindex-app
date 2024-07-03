#!/usr/bin/python3
"""
define routes for interacting with the database
"""
from flask import Blueprint, jsonify, request
from app import db
from app.models import Price
from flask_cors import CORS
from datetime import datetime

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return "Welcome to RoamAgro API"

@bp.route('/api/prices/current', methods=['GET'])
def get_current_prices():
    current_date = datetime.utcnow().date()
    prices = Price.query.filter(Price.date == current_date).all()
    return jsonify([price.to_dict() for price in prices])

@bp.route('/api/prices/historical', methods=['GET'])
def get_historical_prices():
    product_id = request.args.get('product_id')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    prices = Price.query.filter(
        Price.product_id == product_id,
        Price.date >= start_date,
        Price.date <= end_date
    ).all()
    return jsonify([price.to_dict() for price in prices])

@bp.route('/api/prices', methods=['POST'])
def add_price():
    data = request.get_json()
    new_price = Price(
        product_id=data['product_id'],
        price=data['price'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date()
    )
    db.session.add(new_price)
    db.session.commit()
    return jsonify(new_price.to_dict()), 201

@bp.route('/api/prices/<int:id>', methods=['PUT', 'PATCH'])
def update_price(id):
    data = request.get_json()
    price = Price.query.get_or_404(id)
    price.product_id = data.get('product_id', price.product_id)
    price.price = data.get('price', price.price)
    price.date = datetime.strptime(data.get('date', price.date.isoformat()), '%Y-%m-%d').date()
    db.session.commit()
    return jsonify(price.to_dict())
