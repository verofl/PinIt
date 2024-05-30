from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_pins():
    pin1 = Pin(
        user_id=2, image_url='https://mypinitbucket.s3.amazonaws.com/Conchas+(Mexican+Pan+Dulce)+-+Isabel+Eats.jpeg', title='Pan Dulce Recipe', description='Iconic sweet bread with a crunchy, shell-like topping. Soft and fluffy inside, these vibrant pastries are a beloved treat in Mexican cuisine. Perfect with coffee or hot chocolate.', category='recipes')
    pin2 = Pin(
        user_id=2, image_url='https://mypinitbucket.s3.amazonaws.com/Iced+Matcha+Latte+_+MWM.jpeg', title='Iced Matcha Latte', description='Mix 1 tsp matcha powder with 2 tbsp hot water. Add 1 cup milk, 1 tsp vanilla extract, and ice. Stir or shake well. Enjoy a creamy, refreshing green tea delight!', category='recipes')
    pin3 = Pin(
        user_id=2, image_url='https://mypinitbucket.s3.amazonaws.com/Marry+Me+Chicken+_+foodiecrush_com.jpeg', title='Marry Me Chicken Recipe', description='Sauté 4 chicken breasts. Add 1 cup cream, 1/2 cup broth, 1/2 cup sun-dried tomatoes, 1/2 cup Parmesan, 1 tsp garlic powder, and red pepper flakes. Simmer and serve.', category='recipes')
    pin4 = Pin(
        user_id=2, image_url='https://mypinitbucket.s3.amazonaws.com/Nutella-Stuffed+Chocolate+Chip+Cookies+%5B30+Minutes%5D.jpeg', title='Nutella Stuffed Cookies Recipe', description='Soft and chewy cookies with a gooey Nutella center. These decadent treats combine classic chocolate chip flavor with a luscious hazelnut surprise in every bite.', category='recipes')
    pin5 = Pin(
        user_id=2, image_url='https://mypinitbucket.s3.amazonaws.com/Rosemary+Chicken+and+Avocado+Bacon+Pitas+with+Honey+Feta+Sauce_.jpeg', title='Rosemary Chicken', description='Juicy chicken breasts seasoned with fresh rosemary, garlic, and olive oil. Baked to perfection, this aromatic dish is flavorful and fragrant, perfect for any meal.', category='reciped')
    pin6 = Pin(
        user_id=2, image_url='https://mypinitbucket.s3.amazonaws.com/Slowly+Braised+Short+Rib+Ragu+(Slow+Cooker%2C+Instant+Pot-friendly)+_+PWWB.jpeg', title='Slowly Braised Short Rib Ragu', description='Tender short ribs simmered in a rich tomato-based sauce with aromatic herbs and red wine. This comforting dish is full of deep, savory flavors and pairs beautifully with pasta or creamy polenta.', category='recipes')
    pin7 = Pin(
        user_id=1, image_url="https://mypinitbucket.s3.amazonaws.com/80%2B+Home+Library+Ideas+for+The+Ultimate+Book+Lover's+Sanctuary.jpeg", title='Home Library Inspo', description='Rich dark walls envelop a tranquil space filled with books, soft lighting, and comfortable seating. An inviting retreat for reading and relaxation, offering a warm and intimate ambiance.', category='decor')
    pin8 = Pin(
        user_id=1, image_url='https://mypinitbucket.s3.amazonaws.com/be68c054-fc47-4010-968f-d68b7b390121.jpeg', title='Bedroom Decor', description='The cozy atmosphere invites peaceful sleep and relaxation, creating a harmonious and restful retreat within your home.', category='decor')
    pin9 = Pin(
        user_id=1, image_url='https://mypinitbucket.s3.amazonaws.com/Woman+Under+Lily+Pond+Bridge+Digital+File.jpeg', title='Woman in the Lily Pond', description='A captivating painting depicting a woman standing gracefully under a bridge, surrounded by the tranquil beauty of a lily pond. The serene waters mirror her tranquil demeanor, creating a scene of peaceful contemplation and natural harmony.', category='decor')
    pin10 = Pin(
        user_id=3, image_url="https://mypinitbucket.s3.amazonaws.com/15+ACOTAR+Fan+Art+Pieces+That+Tell+Feyre's+Tale+of+Strength+and+Sacrifice.jpeg", title="Feyre's Strength", description='In her room, Feyre paints a drawer of her dresser, adding intricate designs inspired by the magical world of ACOTAR. ', category='acotar')
    pin11 = Pin(
        user_id=3, image_url='https://mypinitbucket.s3.amazonaws.com/c54fde25-d9a5-4505-9962-f803faae8899.jpeg', title='Velaris', description='Its luminous streets, adorned with starlight and faerie wonders, create a dreamlike setting where fantasy meets reality in enchanting harmony.', category='acotar')
    pin12 = Pin(
        user_id=3, image_url='https://mypinitbucket.s3.amazonaws.com/House+of+Wind+Library.jpeg', title='House of Wind', description='House of Wind is a sanctuary where time seems to stand still. Its ethereal architecture and swirling winds create an atmosphere of mystery and tranquility, offering solace and secrets to those who enter its enchanted halls.', category='acotar')
    pin13 = Pin(
        user_id=4, image_url='https://mypinitbucket.s3.amazonaws.com/70%2B+Stunning+Dark+Academia+Outfits+Female+%5B2024%5D+To+Embrace+The+Dark+Academia+Aesthetic.jpeg', title='Dark Academia Outfit', description='Embrace the timeless charm of Dark Academia with a cozy sweater layered over a collared shirt, paired with high-waisted trousers or a pleated skirt.', category='ootd')
    pin14 = Pin(
        user_id=4, image_url='https://mypinitbucket.s3.amazonaws.com/Bespoke+Teal+Sapphire+%26+Diamond+Engagement+Ring.jpeg', title='Engagement Ring', description='A unique and stunning choice, featuring a deep green gemstone.', category='ootd')
    pin15 = Pin(
        user_id=4, image_url='https://mypinitbucket.s3.amazonaws.com/Guide+to+Making+Money+from+Facebook.jpeg', title='Haircut Inspo', description='This haircut is easy to style and can be dressed up or down for any occasion, making it a timeless and flattering choice.', category='ootd')
    pin16 = Pin(
        user_id=5, image_url='https://mypinitbucket.s3.amazonaws.com/0fcb4f13-0eb7-47da-9b44-3a7ed68dc8d8.jpeg', title='Stardew Cabin Decor', description='Customize your farm with decorative elements like fences, pathways, and seasonal decorations to create a picturesque and inviting rural retreat.', category='stardew')
    pin17 = Pin(
        user_id=5, image_url='https://mypinitbucket.s3.amazonaws.com/Interiors+of+Pelican+Town+-+The+Mullner+Residence+-+Evelyn+George+Alex.jpeg', title='Stardew Mods', description='The Muller Residence. Check on Nexus Mods to make Pelican Town interiors cuter.', category='stardew')
    pin18 = Pin(
        user_id=5, image_url='https://mypinitbucket.s3.amazonaws.com/My+SDV+Four+Corners+Farm.jpeg', title='Four Corners Farm Layout', description='Embrace the charm of rural life with a cozy farm layout featuring wooden fences, quaint barns, and a patchwork of crops and flower beds. Decorate with vintage tools, animal pens, and a rustic farmhouse for an idyllic countryside retreat.', category='stardew')


    db.session.add(pin1)
    db.session.add(pin2)
    db.session.add(pin3)
    db.session.add(pin4)
    db.session.add(pin5)
    db.session.add(pin6)
    db.session.add(pin7)
    db.session.add(pin8)
    db.session.add(pin9)
    db.session.add(pin10)
    db.session.add(pin11)
    db.session.add(pin12)
    db.session.add(pin13)
    db.session.add(pin14)
    db.session.add(pin15)
    db.session.add(pin16)
    db.session.add(pin17)
    db.session.add(pin18)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
