from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from run_evi import run
import asyncio

app = Flask(__name__)
CORS(app)

@app.route('/run-chat-bot', methods=['POST'])
def run_chat_bot():
    asyncio.run(run())

if __name__ == '__main__':
    app.run(port=5000, debug=True)
