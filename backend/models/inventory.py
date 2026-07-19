from models import db

class Inventory(db.Model):
    __tablename__ = "inventory"

    id = db.Column(db.Integer, primary_key=True)
    waste_batch_id = db.Column(db.String(50), unique=True, nullable=False)
    fabric_type = db.Column(db.String(100), nullable=False)
    source = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    color = db.Column(db.String(50), nullable=False)
    condition = db.Column(db.String(100), nullable=False)
    collection_date = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Inventory {self.waste_batch_id}>"