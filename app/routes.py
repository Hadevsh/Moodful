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
    sentiment_scale = [
        {"min": -1.0, "max": -0.75, "label": "Extremely Negative"},
        {"min": -0.75, "max": -0.5, "label": "Very Negative"},
        {"min": -0.5, "max": -0.3, "label": "Quite Negative"},
        {"min": -0.3, "max": -0.1, "label": "Slightly Negative"},
        {"min": -0.1, "max": 0.1, "label": "Neutral"},
        {"min": 0.1, "max": 0.3, "label": "Slightly Positive"},
        {"min": 0.3, "max": 0.5, "label": "Quite Positive"},
        {"min": 0.5, "max": 0.75, "label": "Very Positive"},
        {"min": 0.75, "max": 1.01, "label": "Extremely Positive"}
    ]

    for entry in sentiment_scale:
        if entry["min"] <= polarity < entry["max"]:
            return entry["label"]
    
    return "Unknown"


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
