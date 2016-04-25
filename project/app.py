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

  # json_data = open('project/data/palindromes.json')
  # data = json.load(json_data)
  # return render_template('list.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
    port = process.env.PORT
    app.run(host='0.0.0.0', port=port)