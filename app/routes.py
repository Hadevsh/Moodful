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

# Helper function to determine sentiment analysis to user output
def get_sentiment_label(polarity):
    if polarity >= 0.5:
        return "Very Positive"
    elif polarity >= 0.1:
        return "Positive"
    elif polarity > -0.1:
        return "Neutral"
    elif polarity > -0.5:
        return "Negative"
    else:
        return "Very Negative"

# Sentiment analysis route
@main.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.get_json()
    text = data.get("text", "")
    blob = TextBlob(text)
    sentiment = blob.sentiment

    label = get_sentiment_label(sentiment.polarity)

    return jsonify({
        "polarity": sentiment.polarity,
        "subjectivity": sentiment.subjectivity,
        "label": label
    })
