# create_admin.py
from app import create_app, db
from app.models import User

app = create_app()

with app.app_context():
    username = input("Enter admin username: ")
    password = input("Enter admin password: ")

    if User.query.filter_by(username=username).first():
        print("User already exists!")
    else:
        user = User(username=username, is_admin=True)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        print(f"Admin user {username} created successfully!")
