from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://Shaunak:Raiker@jobsitemanagementsystem.zn318.mongodb.net/?retryWrites=true&w=majority&appName=JobsiteManagementSystem"
client = pymongo.MongoClient(CONNECTION_STRING)
try:
    db=client['a1']
    employees=db.b1
    project_collection=db.b2
    equipment_collection=db.b3
    print("Sucessfully connected to the DB")
except:
    print('Unable to connect to the DB')