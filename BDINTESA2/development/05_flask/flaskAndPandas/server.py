from flask import Flask, jsonify
from pandas_speedtest import get_turin_mean

app = Flask("FlaskAndPandas")

@app.route('/')
def index():
    return jsonify(hello="Welcome")

@app.route('/download')
def turin_mean_download():
    result, _ = get_turin_mean()
    return jsonify(download=round(result, 2))

@app.route('/upload')
def turin_mean_upload():
    _, result = get_turin_mean()
    return jsonify(upload=round(result, 2))

if __name__ == '__main__':
    app.run()

