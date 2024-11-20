from flask import Flask,request,jsonify,make_response
from project.backend.db import employees
from project.backend.db import project_collection
from project.backend.db import equipment_collection
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])
bcrypt = Bcrypt(app)
app.config["SECRET_KEY"]="b71ec8224bea404e9c221bd88109da29"
@app.route("/workers", methods=["GET"])
def get_employees():
    try:
        all_employees = list(employees.find())
        for employee in all_employees:
            employee["_id"] = str(employee["_id"])
        
        return jsonify({"success": True, "employees": all_employees}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Add a new employee
@app.route("/workers", methods=["POST"])
def add_employee():
    try:
        new_employee = request.json
        result = employees.insert_one(new_employee)
        if result.inserted_id:
            return jsonify({"success": True, "msg": "Employee added successfully"}), 201
        else:
            return jsonify({"success": False, "msg": "Failed to add employee"}), 400
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/workers/<string:worker_id>", methods=["DELETE"])
def delete_employee(worker_id):
    try:
        # Delete the worker by its ID
        result = employees.delete_one({"_id": ObjectId(worker_id)})
        if result.deleted_count > 0:
            return jsonify({"success": True, "msg": "Employee deleted successfully"}), 200
        else:
            return jsonify({"success": False, "msg": "Employee not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@app.route('/projects', methods=['GET'])
def get_projects():
    try:
        projects = list(project_collection.find())
        for project in projects:
            project['_id'] = str(project['_id'])
        return jsonify({"projects": projects}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/projects', methods=['POST'])
def add_project():
    try:
        new_project = request.json
        result = project_collection.insert_one(new_project)
        return jsonify({"id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/projects/<id>', methods=['DELETE'])
def delete_project(id):
    try:
        result = project_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count:
            return jsonify({"success": True}), 200
        return jsonify({"success": False}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/equipment', methods=['GET'])
def get_all_equipment():
    try:
        # Fetch all equipment from the MongoDB collection
        equipment_list = list(equipment_collection.find())
        
        # Convert _id to string for all equipment items
        for equipment in equipment_list:
            equipment["_id"] = str(equipment["_id"])

        # Return the equipment data
        return jsonify({'success': True, 'equipment': equipment_list}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route("/equipment", methods=["POST"])
def add_equipment():
    try:
        new_equipment = request.json  # The new equipment data sent from the frontend
        result = equipment_collection.insert_one(new_equipment)
        if result.inserted_id:
            return jsonify({"success": True, "msg": "Equipment added successfully"}), 201
        return jsonify({"success": False, "msg": "Failed to add equipment"}), 400
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__=='__main__':
    app.run(debug=True,port=8000)