import os
from flask import Flask, render_template, json, jsonify

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/palindromes.json')
def palindromes():
  json_data = open("project/static/data/palindromes.json")
  data = json.load(json_data)
  return jsonify(results=data)

if __name__ == '__main__':
  port = int(os.environ.get("PORT", 5000))
  app.run(host='0.0.0.0', port=port)