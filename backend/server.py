from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/save-contact', methods=['POST'])
def save_contact():
    data = request.json
    with open("../contacts.json", 'w') as file:
        json.dump(data, file, indent=4)
    
    return jsonify({'message': 'Contact saved successfully'}), 200

@app.route('/upload-contact', methods=['GET'])
def upload_contact():
    with open("../contacts.json", "r") as file:
        data = json.load(file)

    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5000, debug=True)