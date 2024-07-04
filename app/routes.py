# routes.py

from flask import Blueprint, jsonify, request
from app import db
from app.models import Price, Product
from flask_cors import CORS
from datetime import datetime, timedelta

bp = Blueprint('main', __name__)

@bp.route('/api/prices/current', methods=['GET'])
def get_current_prices():
    current_date = datetime.utcnow().date()
    start_of_week = current_date - timedelta(days=current_date.weekday())
    prices = Price.query.filter(Price.date >= start_of_week).all()
    return jsonify([price.to_dict() for price in prices])

@bp.route('/api/prices/historical', methods=['GET'])
def get_historical_prices():
    product_name = request.args.get('product_name')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    product = Product.query.filter_by(name=product_name).first_or_404()
    prices = Price.query.filter(
        Price.product_id == product.id,
        Price.date >= start_date,
        Price.date <= end_date
    ).all()
    return jsonify([price.to_dict() for price in prices])

@bp.route('/api/prices', methods=['POST'])
def add_price():
    data = request.get_json()
    product = Product.query.filter_by(name=data['product_name']).first_or_404()
    new_price = Price(
        product_id=product.id,
        price=data['price'],
        date=datetime.strptime(data['date'], '%Y-%m-%d').date()
    )
    db.session.add(new_price)
    db.session.commit()
    return jsonify(new_price.to_dict()), 201

@bp.route('/api/prices/<string:product_name>', methods=['PUT', 'PATCH'])
def update_price(product_name):
    data = request.get_json()
    product = Product.query.filter_by(name=product_name).first_or_404()
    price = Price.query.filter_by(product_id=product.id, date=datetime.strptime(data['date'], '%Y-%m-%d').date()).first_or_404()
    price.price = data.get('price', price.price)
    db.session.commit()
    return jsonify(price.to_dict())
