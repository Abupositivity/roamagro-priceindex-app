# routes.py

from flask import Blueprint, jsonify, request
from app import db
from app.models import Price, Product, User
from flask_cors import CORS
from datetime import datetime, timedelta
from flask_login import login_user, logout_user, current_user

bp = Blueprint('main', __name__)
CORS(bp)

@bp.route('/api/prices/current', methods=['GET'])
def get_current_prices():
    current_date = datetime.utcnow().date()
    start_of_week = current_date - timedelta(days=current_date.weekday())
    prices = db.session.query(Price, Product).join(Product).filter(Price.date >= start_of_week).all()
    return jsonify([{
        'id': price.id,
        'product_name': product.name,
        'price': price.price,
        'date': price.date.isoformat()
    } for price, product in prices])

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

@bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401

    login_user(user)
    return jsonify({'message': 'Login successful', 'user': user.to_dict()}), 200

@bp.route('/api/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200

@bp.route('/api/prices', methods=['POST'])
def add_price():
    if not current_user.is_authenticated or not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
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
    if not current_user.is_authenticated or not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    data = request.get_json()
    product = Product.query.filter_by(name=product_name).first_or_404()
    price = Price.query.filter_by(product_id=product.id, date=datetime.strptime(data['date'], '%Y-%m-%d').date()).first_or_404()
    price.price = data.get('price', price.price)
    db.session.commit()
    return jsonify(price.to_dict()), 201