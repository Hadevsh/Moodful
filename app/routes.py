from flask import Blueprint, render_template, jsonify, request
from textblob import TextBlob
from flask_cors import CORS
import os
import json

main = Blueprint('main', __name__)

CORS(main)

# Home page route
@main.route("/")
def home():
    return render_template("index.html")

# Sentiment analysis route
@main.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.get_json()
    text = data.get("text", "")

    blob = TextBlob(text)
    sentiment = blob.sentiment

    return jsonify({
        "polarity": sentiment.polarity,
        "subjectivity": sentiment.subjectivity
    })
