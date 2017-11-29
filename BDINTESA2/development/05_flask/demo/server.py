import json
import itertools
from multiprocessing import Process, Queue
import tweepy
from flask import Flask, render_template, Response

q = Queue()

### SET KEYS
CONSUMER_KEY = "aPYODVLNmwLsVfpf9JnrnFXwZ"
SECRET_KEY = "VZge3rcIhpgaF9uhzm9H80pTg6ireTCc6IL2MhLj8iwTOR7hGs"
ACCESS_TOKEN = "775822357-QRrUK7VXFdaY2JprL9pHxfIqI9euQF6tsfZKlXiu"
SECRET_ACCESS_TOKEN = "nrQ717sVgBPEA5AZFhu9Ne7OgAZsq6wSwnFSC88Jusd3l"

string_to_search = "#bigdata"


class StreamingListener(tweepy.StreamListener):
    def __init__(self, queue):
        super(StreamingListener, self).__init__()
        self.queue = queue
    
    def on_status(self, status):
        hashtags = [t['text'].lower() for t in status.entities['hashtags']]
        print hashtags
        for x,y in itertools.permutations(hashtags, 2):
            self.queue.put((x, y))
    
    def on_error(self, status_code):
        print 'Encountered error with status code:', status_code
        return False


def stream_data(filters, queue):
    listener = StreamingListener(queue)
    
    auth = tweepy.OAuthHandler(CONSUMER_KEY, SECRET_KEY)
    auth.set_access_token(ACCESS_TOKEN, SECRET_ACCESS_TOKEN)
    
    stream = tweepy.streaming.Stream(auth, listener)
    t = Process(target=lambda: stream.filter(track=filters))
    t.start()

app = Flask("SuperDemoSuperCool")


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/data')
def data():
    hashtag_ids = {}
    
    def gen():
        while True:
            v = q.get(block=True)
            
            nodes = []
            for tag in v:
                if tag not in hashtag_ids:
                    tagid = hashtag_ids[tag] = len(hashtag_ids)
                    nodes.append({"name": tag, "id": tagid})
            
            if nodes:
                event = "data: %s\n\n" % json.dumps(dict(nodes=nodes, links=[]))
                yield event.encode('utf-8')
            
            event = "data: %s\n\n" % json.dumps(dict(links=[{"source": hashtag_ids[v[0]],
                                                             "target": hashtag_ids[v[1]]}], nodes=[]))
            yield event.encode('utf-8')
    
    return Response(gen(), mimetype="text/event-stream")

### RUN!

stream_data([string_to_search], q)
app.run()

