from flask import Blueprint, render_template, jsonify, request
import os
import json

main = Blueprint('main', __name__)

# All sub-page routes
@main.route("/")
def home():
    return render_template("index.html")