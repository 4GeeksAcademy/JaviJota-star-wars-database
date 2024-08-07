from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(50), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)

    favorites = db.relationship('Favorites', back_populates='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
            # do not serialize the password, its a security breach
        }
    
#---------------------------------------------

# class Favorites(db.Model):
#     __tablename__='favorites'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
#     people_id = db.Column(db.Integer, ForeignKey('people.id'), nullable=True)
#     planet_id = db.Column(db.Integer, ForeignKey('planets.id'), nullable=True)
#     starship_id_ = db.Column(db.Integer, ForeignKey('starships.id'), nullable=True)

#     user = db.relationship('User', back_populates='favorites')
#     people = db.relationship('People', back_populates='favorites')
#     planet = db.relationship('Planets', back_populates='favorites')
#     starship = db.relationship('Starships', back_populates='favorites')

class Favorites(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    item_id = db.Column(db.Integer, nullable=False)
    item_type = db.Column(db.String, nullable=False)
    __table_args__ = (db.UniqueConstraint('user_id', 'item_id', 'item_type', name='_user_item_uc'),)

    @property
    def item(self):
        if self.item_type == 'people':
            return People.query.get(self.item_id)
        elif self.item_type == 'planet':
            return Planets.query.get(self.item_id)
        elif self.item_type == 'starship':
            return Starships.query.get(self.item_id)
        else:
            return None
    
    def __repr__(self):
        return f'<Favorite: {self.id}, user: {self.user_id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'item_type': self.item_type,
        }

#---------------------------------------------

class People_Starships_Rel(db.Model):
    __tablename__ = 'people_starships_rel'

    people_id = db.Column(db.Integer, ForeignKey('people.id'), primary_key=True)
    starship_id  = db.Column(db.Integer, ForeignKey('starships.id'), primary_key=True)

    def serialize(self):
        return {
            "people_id": self.people_id,
            "starship": self.starship_id,
        }
    
#---------------------------------------------

class People(db.Model):
    __tablename__ = 'people'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    birth_year = db.Column(db.String(20), unique=False, nullable=False)
    species = db.Column(db.String(80), unique=False, nullable=False)
    height =  db.Column(db.Integer, unique=False, nullable=False)
    mass =  db.Column(db.Integer, unique=False, nullable=False)
    gender =  db.Column(db.String(80), unique=False, nullable=True)
    hair_color =  db.Column(db.String(80), unique=False, nullable=True)
    skin_color = db.Column(db.String(80), unique=False, nullable=True)
    planet_id = db.Column(db.Integer, ForeignKey('planets.id'), nullable=False)

    planet = db.relationship("Planets", back_populates='people')
    favorites = db.relationship('Favorites', back_populates='people')
    favorites = db.relationship('Favorites', primaryjoin="and_(People.id==foreign(Favorites.item_id), Favorites.item_type=='people')", back_populates='user')
    starships = db.relationship('Starships', secondary='people_starships_rel', back_populates='pilots')

    def __repr__(self):
        return f'<People {self.name}>'
    
    def serialize_simple(self):
        return {
            'id': self.id,
            'name': self.name
        }
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'birth_year' : self.birth_year,
            'species': self.species,
            'height': self.height,
            'mass': self.mass,
            'gender': self.gender,
            'hair_color': self.hair_color,
            'planet': self.planet.name if self.planet else None,
            'starships': [starship.serialize_simple() for starship in self.starships]
        }

#---------------------------------------------

class Planets(db.Model):
    __tablename__ = 'planets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    diameter = db.Column(db.Integer, unique=False, nullable=False)
    climate = db.Column(db.String(80), unique=False, nullable=False)
    terrain = db.Column(db.String(120), unique=False, nullable=False)
    population = db.Column(db.Integer, unique=False, nullable=False)

    people = db.relationship('People', back_populates='planet')
    favorites = db.relationship('Favorites', back_populates='planet')
    favorites = db.relationship('Favorites', primaryjoin="and_(Planets.id==foreign(Favorites.item_id), Favorites.item_type=='planet')", back_populates='user')

    def __repr__(self):
        return f'<Planet {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'name':  self.name,
            'diameter': self.diameter,
            'climate': self.climate,
            'terrain': self.terrain,
            'population': self.population,
        }

#---------------------------------------------

class Starships(db.Model):
    __tablename__ = 'starships'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    model = db.Column(db.String(120), unique=True, nullable=False)
    manufacturer = db.Column(db.String(120), unique=False, nullable=False)
    passengers = db.Column(db.Integer, unique=False, nullable=False)

    favorites = db.relationship('Favorites', back_populates='starship')
    favorites = db.relationship('Favorites', primaryjoin="and_(Starships.id==foreign(Favorites.item_id), Favorites.item_type=='starship')", back_populates='user')
    pilots = db.relationship('People', secondary='people_starships_rel', back_populates='starships')

    def __repr__(self):
        return f'<Starship {self.name}>'
    
    def serialize_simple(self):
        return {
        'id': self.id,
        'name': self.name
    }
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'model': self.model,
            'manufacturer': self.manufacturer,
            'passengers': self.passengers,
            'pilots': [pilot.serialize_simple() for pilot in self.pilots]
        }