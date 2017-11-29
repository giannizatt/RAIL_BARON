from flask import Flask, jsonify, request, abort, redirect

app = Flask("BigDive")
blogs = []

@app.route('/')
def index():
    return jsonify(
        blogs=blogs
    ), 200

def search_id(blog_list, blogid):
    for index, blog in enumerate(blog_list):
        if blogid == blog['id']:
            return index
    raise Exception

def generate_id():
    try:
        return blogs[-1]['id'] +1
    except IndexError:
        return 1
    
@app.route('/blog/<int:blogid>')
def blog(blogid):
    try:
        blog = blogs[search_id(blogs, blogid)]
    except:
        abort(404)
    return jsonify(blog), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify(error="Not Found"), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify(error="Bad Request"), 400

@app.route('/create', methods=['post'])
def create():
    requested_params = ('title', 'body', 'author')
    if not all (key in request.form for key in (requested_params)):
        abort(400)
    blog = request.form.to_dict(flat=True)
    blog['id'] = generate_id()
    blogs.append(blog)
    return jsonify(blog), 200

@app.route('/delete/<int:blogid>', methods=['delete'])
def delete(blogid):
    try:
        index = search_id(blogs, blogid)
    except:
        abort(404)
    blogs.remove(blogs[index])
    return redirect('/')    

@app.route('/edit/<int:blogid>', methods=['put'])
def edit(blogid):
    try:
        index = search_id(blogs, blogid)
    except:
        abort(404)
    requested_params = ('title', 'body', 'author')
    if not all (key in request.form for key in (requested_params)):
        abort(400)
    blogs[index] = request.form.to_dict(flat=True)
    blogs[index]['id'] = blogid
    return jsonify(request.form.to_dict(flat=True)), 200
app.run()
