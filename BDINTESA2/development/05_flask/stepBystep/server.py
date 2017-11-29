# importare la libreria
from flask import Flask, request, abort, redirect, jsonify
# creare una istanza dell'oggetto Flask
app = Flask("BigDive")

# Registrato rotta INDEX
@app.route('/', methods=['get', 'post'])
def index():
    print 'Sono in INDEX' 
    if request.method == 'POST':
        data = request.form
        print data['name']
        return 'POST METHOD'
    else:
        return '''<html><head></heaad>
<body><h1>CIAO MONDO!</h1><h2>ASDASD</h2><p>ciao mondo.</p></body>
</html>'''

@app.route('/nonmivedi')
def nonmivedi():
    return redirect('/')

@app.route('/noncisono')
def noncisono():
    abort(404)

@app.errorhandler(404)
def error_handler(error):
    return 'Not Found!!!!', 404

# Registro la rotta /hello
# Registro la rotta /hello/Alex
@app.route('/hello')
@app.route('/hello/<name>')
def hello(name='Pippo'):
    return 'Hello %s!' % name

@app.route('/somma/<int:X>/<int:Y>')
def somma(X,Y):
    return 'Somma: %s ' % (X+Y)

@app.route('/error')
def error():
    return asdasdasdasas

@app.route('/firstjson')
def firstjson():
    return jsonify(name="Alex", age=19)

app.run()

