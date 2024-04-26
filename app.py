from flask import Flask, request, render_template, jsonify
from uuid import uuid4

from boggle import BoggleGame

app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-secret"

# The boggle games created, keyed by game id
games = {}


@app.get("/")
def homepage():
    """Show board."""

    return render_template("index.jinja")


@app.post("/api/new-game")
def new_game():
    """Start new game and return JSON about game.

    Returns: JSON of {
       gameId: "...uuid-of-game...",
       board: [ [ 'A', 'B', ... ], ... ]
    }
    """

    # get a unique string id for the board we're creating
    game_id = str(uuid4())
    game = BoggleGame()
    games[game_id] = game

    game_data = {"gameId": game_id, "board": game.board}

    return jsonify(game_data)

@app.post("/api/score-word")
def score_word():
    """Checks if word is legal and returns JSON with the result
    
    Returns: JSON of {'result': 'result_msg'}
    """
    
    word = request.json['word']
    gameId = request.json['gameId']
    game = games[gameId]
    
    if not game.is_word_in_word_list(word):
        return jsonify(result = "not-word") #NOTE: can pass jsonify keyword params
    
    if not game.check_word_on_board(word):
        return jsonify(result = "not-on-board")
    
    if not game.is_word_not_a_dup(word):
        return jsonify(result = "word-is-dupe")
    
    return jsonify(result = "ok")
    
    
