from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    board1 = Board(
        user_id= 1, title='Home Decor',)
    board2 = Board(
        user_id= 1, title='OOTD Inspo',)
    board3 = Board(
        user_id= 2, title='Recipes',)
    board4 = Board(
        user_id= 2, title='Stardew',)
    board5 = Board(
        user_id= 3, title='ACOTAR',)
    board6 = Board(
        user_id= 3, title='Cooking',)
    board7 = Board(
        user_id= 4, title='Outfits',)
    board8 = Board(
        user_id= 4, title='Fae',)
    board9 = Board(
        user_id= 5, title='Stardew Inspo',)
    board10 = Board(
        user_id= 5, title='Decorating',)


    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.add(board4)
    db.session.add(board5)
    db.session.add(board6)
    db.session.add(board7)
    db.session.add(board8)
    db.session.add(board9)
    db.session.add(board10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
