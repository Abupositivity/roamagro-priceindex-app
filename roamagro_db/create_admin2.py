# create_admin.py
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import User

def create_admin(username, password):
    app = create_app()
    with app.app_context():
        if User.query.filter_by(username=username).first() is not None:
            print(f'Error: User {username} already exists.')
            return
        admin = User(username=username, is_admin=True)
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        print(f'Success: Admin user {username} created.')

if __name__ == '__main__':
    import sys
    if len(sys.argv) != 3:
        print('Usage: python create_admin.py <username> <email> <password>')
        sys.exit(1)
    create_admin(sys.argv[1], sys.argv[2])
