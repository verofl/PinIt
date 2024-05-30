from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name='User', profile_picture='https://mypinitbucket.s3.amazonaws.com/veronicaflatto2+(1).png', password='password')
    veronica = User(
        username='Veronica', email='veronica@aa.io', first_name='Veronica', last_name='Flatto', profile_picture='https://mypinitbucket.s3.amazonaws.com/Transparent+PFP+Cut.png',password='password')
    feyre = User(
        username='feyre', email='feyre@aa.io', first_name='Feyre', last_name='Archeron', profile_picture='https://mypinitbucket.s3.amazonaws.com/feyre-pfp.jpeg',password='password')
    nesta = User(
        username='nesta', email='nesta@aa.io', first_name='Nesta', last_name='Archeron', profile_picture='https://mypinitbucket.s3.amazonaws.com/nesta-pfp.jpeg',password='password')
    elain = User(
        username='elain', email='elain@aa.io', first_name='Elain', last_name='Archeron', profile_picture='https://mypinitbucket.s3.amazonaws.com/elain-pfp.jpeg',password='password')

    db.session.add(demo)
    db.session.add(veronica)
    db.session.add(feyre)
    db.session.add(nesta)
    db.session.add(elain)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
