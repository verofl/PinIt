from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text



def seed_comments():
    comment1 = Comment(
        user_id = 1, pin_id = 1, comment="Absolutely delicious! A must-try!")
    comment2 = Comment(
        user_id = 3, pin_id = 1, comment="The crunchiness adds a delightful texture.")
    comment3 = Comment(
        user_id = 4, pin_id = 1, comment="So flavorful and perfect with coffee!")
    comment4 = Comment(
        user_id = 5, pin_id = 1, comment="Authentic taste, just like home!")
    comment5 = Comment(
        user_id = 1, pin_id = 2, comment="Refreshing and soothing, love it!")
    comment6 = Comment(
        user_id = 3, pin_id = 2, comment="Perfect balance of matcha and sweetness.")
    comment7 = Comment(
        user_id = 4, pin_id = 2, comment="Great alternative to regular lattes.")
    comment8 = Comment(
        user_id = 5, pin_id = 2, comment="Creamy and full of green tea goodness!")
    comment9 = Comment(
        user_id = 1, pin_id = 3, comment="A gourmet meal made easy!")
    comment10 = Comment(
        user_id = 3, pin_id = 3, comment="The flavors blend beautifully together.")
    comment11 = Comment(
        user_id = 4, pin_id = 3, comment="Rich and creamy sauce, so satisfying.")
    comment12 = Comment(
        user_id = 5, pin_id = 3, comment="Impressive dish for any occasion!")
    comment13 = Comment(
        user_id = 1, pin_id = 4, comment="Irresistibly gooey and chocolatey!")
    comment14 = Comment(
        user_id = 3, pin_id = 4, comment="The Nutella surprise is pure bliss.")
    comment15 = Comment(
        user_id = 4, pin_id = 4, comment="Best cookies I've ever tasted!")
    comment16 = Comment(
        user_id = 5, pin_id = 4, comment="Perfect for satisfying sweet cravings!")
    comment17 = Comment(
        user_id = 1, pin_id = 5, comment="Juicy and aromatic, a family favorite!")
    comment18 = Comment(
        user_id = 3, pin_id = 5, comment="The rosemary adds a lovely flavor.")
    comment19 = Comment(
        user_id = 4, pin_id = 5, comment="Tender and packed with herbs!")
    comment20 = Comment(
        user_id = 5, pin_id = 5, comment="Deliciously comforting and flavorful!")
    comment21 = Comment(
        user_id = 1, pin_id = 6, comment="Melt-in-your-mouth goodness!")
    comment22 = Comment(
        user_id = 3, pin_id = 6, comment="The sauce is heavenly.")
    comment23 = Comment(
        user_id = 4, pin_id = 6, comment="Perfect for a cozy dinner at home.")
    comment24 = Comment(
        user_id = 5, pin_id = 6, comment="Restaurant-quality comfort food!")
    comment25 = Comment(
        user_id = 2, pin_id = 7, comment="Dreamy reading nook, love the ambiance!")
    comment26 = Comment(
        user_id = 3, pin_id = 7, comment="Perfect spot for book lovers.")
    comment27 = Comment(
        user_id = 4, pin_id = 7, comment="Cozy and inviting atmosphere.")
    comment28 = Comment(
        user_id = 5, pin_id = 7, comment="Inspiring design, great for relaxation!")
    comment29 = Comment(
        user_id = 2, pin_id = 8, comment="Such a peaceful and serene vibe!")
    comment30 = Comment(
        user_id = 3, pin_id = 8, comment="Love the cozy atmosphere.")
    comment31 = Comment(
        user_id = 4, pin_id = 8, comment="Perfect for unwinding after a long day.")
    comment32 = Comment(
        user_id = 5, pin_id = 8, comment="Beautifully designed for relaxation!")
    comment33 = Comment(
        user_id = 2, pin_id = 9, comment="Captivating artwork, so serene!")
    comment34 = Comment(
        user_id = 3, pin_id = 9, comment="The lily pond adds a tranquil touch.")
    comment35 = Comment(
        user_id = 4, pin_id = 9, comment="Mesmerizing scene, love the details!")
    comment36 = Comment(
        user_id = 5, pin_id = 9, comment="Creates a sense of calm and beauty.")
    comment37 = Comment(
        user_id = 1, pin_id = 10, comment="Such intricate and inspiring art!")
    comment38 = Comment(
        user_id = 2, pin_id = 10, comment="Love the magical theme.")
    comment39 = Comment(
        user_id = 4, pin_id = 10, comment="Captures Feyre's essence beautifully.")
    comment40 = Comment(
        user_id = 5, pin_id = 10, comment="Perfect for ACOTAR fans!")
    comment41 = Comment(
        user_id = 1, pin_id = 11, comment="Enchanting and mystical atmosphere!")
    comment42 = Comment(
        user_id = 2, pin_id = 11, comment="Feels like stepping into a fantasy world.")
    comment43 = Comment(
        user_id = 4, pin_id = 11, comment="Love the starlight and faerie touches.")
    comment44 = Comment(
        user_id = 5, pin_id = 11, comment="Magical setting, beautifully depicted!")
    comment45 = Comment(
        user_id = 1, pin_id = 12, comment="Mysterious and captivating architecture!")
    comment46 = Comment(
        user_id = 2, pin_id = 12, comment="Creates a sense of wonder and intrigue.")
    comment47 = Comment(
        user_id = 4, pin_id = 12, comment="Love the ethereal vibes.")
    comment48 = Comment(
        user_id = 5, pin_id = 12, comment="Feels like a magical sanctuary!")
    comment49 = Comment(
        user_id = 1, pin_id = 13, comment="Timeless elegance, love the style!")
    comment50 = Comment(
        user_id = 2, pin_id = 13, comment="Perfect for a sophisticated look.")
    comment51 = Comment(
        user_id = 3, pin_id = 13, comment="Embraces the Dark Academia aesthetic.")
    comment52 = Comment(
        user_id = 5, pin_id = 13, comment="Stunning outfit choice!")
    comment53 = Comment(
        user_id = 1, pin_id = 14, comment="Absolutely breathtaking!")
    comment54 = Comment(
        user_id = 2, pin_id = 14, comment="Love the unique design.")
    comment55 = Comment(
        user_id = 3, pin_id = 14, comment="Such a beautiful choice of gemstone.")
    comment56 = Comment(
        user_id = 5, pin_id = 14, comment="Perfect symbol of love and commitment!")
    comment57 = Comment(
        user_id = 1, pin_id = 15, comment="Flattering and versatile hairstyle!")
    comment58 = Comment(
        user_id = 2, pin_id = 15, comment="Great for any occasion.")
    comment59 = Comment(
        user_id = 3, pin_id = 15, comment="Easy to style and maintain.")
    comment60 = Comment(
        user_id = 5, pin_id = 15, comment="Timeless and chic look!")
    comment61 = Comment(
        user_id = 1, pin_id = 16, comment="Creates a cozy and inviting atmosphere!")
    comment62 = Comment(
        user_id = 2, pin_id = 16, comment="Love the rural charm.")
    comment63 = Comment(
        user_id = 3, pin_id = 16, comment="Perfect for a peaceful retreat.")
    comment64 = Comment(
        user_id = 4, pin_id = 16, comment="Great attention to detail!")
    comment65 = Comment(
        user_id = 1, pin_id = 17, comment="Enhances Pelican Town beautifully!")
    comment66 = Comment(
        user_id = 2, pin_id = 17, comment="Makes the game even more enjoyable.")
    comment67 = Comment(
        user_id = 3, pin_id = 17, comment="Love the cute and creative additions.")
    comment68 = Comment(
        user_id = 4, pin_id = 17, comment="Adds depth to the game world!")
    comment69 = Comment(
        user_id = 1, pin_id = 18, comment="Charming countryside farm layout!")
    comment70 = Comment(
        user_id = 2, pin_id = 18, comment="Love the rustic and vintage vibes.")
    comment71 = Comment(
        user_id = 3, pin_id = 18, comment="Creates an idyllic farm setting.")
    comment72 = Comment(
        user_id = 4, pin_id = 18, comment="Perfect for embracing rural life!")




    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.add(comment23)
    db.session.add(comment24)
    db.session.add(comment25)
    db.session.add(comment26)
    db.session.add(comment27)
    db.session.add(comment28)
    db.session.add(comment29)
    db.session.add(comment30)
    db.session.add(comment31)
    db.session.add(comment32)
    db.session.add(comment33)
    db.session.add(comment34)
    db.session.add(comment35)
    db.session.add(comment36)
    db.session.add(comment37)
    db.session.add(comment38)
    db.session.add(comment39)
    db.session.add(comment40)
    db.session.add(comment41)
    db.session.add(comment42)
    db.session.add(comment43)
    db.session.add(comment44)
    db.session.add(comment45)
    db.session.add(comment46)
    db.session.add(comment47)
    db.session.add(comment48)
    db.session.add(comment49)
    db.session.add(comment50)
    db.session.add(comment51)
    db.session.add(comment52)
    db.session.add(comment53)
    db.session.add(comment54)
    db.session.add(comment55)
    db.session.add(comment56)
    db.session.add(comment57)
    db.session.add(comment58)
    db.session.add(comment59)
    db.session.add(comment60)
    db.session.add(comment61)
    db.session.add(comment62)
    db.session.add(comment63)
    db.session.add(comment64)
    db.session.add(comment65)
    db.session.add(comment66)
    db.session.add(comment67)
    db.session.add(comment68)
    db.session.add(comment69)
    db.session.add(comment70)
    db.session.add(comment71)
    db.session.add(comment72)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
