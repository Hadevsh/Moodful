# Moodful

A minimal web app that analyzes your mood from journal entries using sentiment analysis and simple NLP — built with Flask and pure HTML/CSS/JS.

## ✨ Features

* **Journal → Insight:** Paste or write an entry and get an instant mood summary (overall polarity + short rationale).
* **Lightweight stack:** Python (Flask) backend; vanilla HTML/CSS/JS frontend (no heavy SPA build step).
* **Pluggable sentiment engine:** The analysis logic is isolated so you can swap in rule-based (e.g., VADER) or ML-based analyzers later.
* **Privacy-friendly:** No external calls required by default; runs locally.

> ℹ️ This repo currently shows `app/`, `run.py`, and `requirements.txt` at the top level, with languages reported as ~JS/CSS/Python/HTML. If you rename or add modules, the docs below are written to stay valid.

## 📦 Project structure

```
Moodful/
├─ app/
│  ├─ __init__.py           # Flask app factory / configuration
│  ├─ routes.py             # Web routes (UI + API)
│  ├─ sentiment.py          # Sentiment/NLP helpers (encapsulated)
│  ├─ templates/            # Jinja2 templates (index.html, result.html, layout.html)
│  └─ static/               # css/, js/, assets/
├─ run.py                   # Dev entrypoint (flask app runner)
├─ requirements.txt         # Python dependencies
└─ README.md
```

> If your filenames differ, keep the roles the same (routes, templates, static assets, and a small sentiment layer).

## 🚀 Quickstart

### 1) Prereqs

* Python 3.10+ recommended
* `pip` and `venv`

### 2) Clone & set up

```bash
git clone https://github.com/Hadevsh/Moodful.git
cd Moodful

python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

### 3) Run (development)

```bash
# Option A: via run.py
python run.py

# Option B: via Flask
export FLASK_APP=app
export FLASK_ENV=development
flask run
```

App will be available at [http://127.0.0.1:5000/](http://127.0.0.1:5000/) (by default).

## 🧠 How it works

1. **Input:** You submit a journal entry via the UI.
2. **Processing:** The backend normalizes text (lowercasing, punctuation handling, optional stopword trimming) then runs sentiment analysis (rule-based or model-based — the code is isolated so you can switch engines).
3. **Output:** A JSON or rendered view with:

   * overall sentiment score / label (e.g., negative/neutral/positive)
   * basic confidence or magnitude
   * short explanation (e.g., keywords contributing to the score)

## 🔌 Minimal API

> Endpoint names assume `routes.py` conventions — adapt to your actual function names if different.

* `POST /api/analyze`

  * **Body:** `{ "text": "your journal entry..." }`
  * **Response:**

    ```json
    {
      "sentiment": {"label": "positive", "score": 0.78},
      "keywords": ["excited","grateful"],
      "explanation": "Positive adjectives dominate."
    }
    ```
* `GET /`
  Returns the web UI.

## 🛠️ Configuration

Environment variables you can add (optional):

* `MOODFUL_DEBUG=true` — enable verbose logs.
* `MOODFUL_ENGINE=vader|textblob|custom` — choose analysis backend (tie this to your `sentiment.py`).
* `SECRET_KEY` — Flask secret (session/CSRF where applicable).

Create a `.env` (and load it in `__init__.py` if you use `python-dotenv`) for local development.

## 🧪 Testing

Add unit tests that pin behavior of the sentiment layer and routes:

```bash
pytest -q
```

Suggested tests:

* `test_sentiment_positive/neutral/negative_texts`
* `test_analyze_endpoint_returns_json_and_http_200`
* `test_empty_or_whitespace_returns_400`
* `test_long_text_is_processed_within_time_budget`

## 👥 Contributing

1. Fork → feature branch → PR.
2. Keep PRs small and focused.
3. Include/adjust tests for behavior changes.
4. Add/update docstrings and this README when you change user-visible behavior.
