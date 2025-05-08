function countWords() {
    var textAreaValue = document.getElementById('text-area').value;
    console.log();

    if (textAreaValue.length == 0) {
        document.getElementById('word-count').innerHTML = `0`;
        document.getElementById('char-count').innerHTML = `0`;
        return;
    }

    var regex = /\s+/gi;
    var wordCount = textAreaValue.trim().replace(regex, ' ').split(' ').length;
    var totalChars = textAreaValue.length;
    var charCount = textAreaValue.trim().length;
    var charCountNoSpace = textAreaValue.replace(regex, '').length;

    document.getElementById('word-count').innerHTML = `${wordCount}`;
    document.getElementById('char-count').innerHTML = `${charCountNoSpace}`;
};

const textArea = document.getElementById('text-area');
textArea.addEventListener("click", countWords);
textArea.addEventListener("change", countWords);
textArea.addEventListener("keydown", countWords);
textArea.addEventListener("keypress", countWords);
textArea.addEventListener("keyup", countWords);
textArea.addEventListener("blur", countWords);
textArea.addEventListener("focus", countWords);

async function analyzeText() {
    const text = document.getElementById("text-area").value;

    const response = await fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
    });

    const result = await response.json();
    document.getElementById("sentiment-output").innerHTML = `<strong>Mood:</strong> <i>${result.label}</i>`;

    updateSentimentBar(result.polarity);
}

function updateSentimentBar(polarity) {
    const percent = ((polarity + 1) / 2) * 100;
    const indicator = document.getElementById("sentiment-indicator");
    indicator.style.left = `${percent}%`;
}

// Cartesian chart
// Sample points: [x, y] values where x and y ∈ [-1, 1]
const points = [
    [0, 0],
    [1, 1],
    [-1, 1],
    [0.5, -0.5],
    [-0.75, -0.25]
];

const chart = document.getElementById("sentiment-chart");
const size = chart.offsetWidth; // assumes square chart
const half = size / 2;

points.forEach(([x, y]) => {
    const px = half + x * half;
    const py = half - y * half; // invert y-axis

    const dot = document.createElement('div');
    dot.className = 'point';
    dot.style.left = `${px}px`;
    dot.style.top = `${py}px`;

    chart.appendChild(dot);
});