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

    // Cartesian chart
    const points = [[parseFloat(result.polarity.toFixed(2)), parseFloat(result.subjectivity.toFixed(2))]];
    const chart = document.getElementById("sentiment-chart");
    const size = chart.offsetWidth; // assumes square chart
    const half = size / 2;
    console.log(points);

    points.forEach(([x, y]) => {
        const px = half + x * half;
        const py = half - y * half; // invert y-axis

        const dot = document.createElement('div');
        dot.className = 'point';
        dot.style.left = `${px}px`;
        dot.style.top = `${py}px`;

        chart.appendChild(dot);
    });

    updateSentimentBar(result.polarity);
}

function updateSentimentBar(polarity) {
    const percent = ((polarity + 1) / 2) * 100;
    const indicator = document.getElementById("sentiment-indicator");
    indicator.style.left = `${percent}%`;
}

document.getElementById('chart-icon').addEventListener('click', () => {
    window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

async function fetchMoodHistory() {
    try {
        const response = await fetch('/history');
        const data = await response.json();
        console.log("📊 Mood History:", data);
    } catch (error) {
        console.error("❌ Failed to fetch mood history:", error);
    }
}

async function renderMoodChart() {
    try {
        const response = await fetch('/history');
        const data = await response.json();

        // Extract timestamps and mood scores
        const labels = data.map(entry => new Date(entry.timestamp).toLocaleString());
        const scores = data.map(entry => entry.score);

        // Create the chart
        const ctx = document.getElementById('mood-chart').getContext('2d');
        const moodChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mood Score Over Time',
                    data: scores,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    borderColor: 'rgb(209, 140, 49)',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false, // allow custom height/width
                scales: {
                    y: {
                        min: -1,
                        max: 1,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)' // Light grid lines
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.1)' // Light text color
                        },
                        title: {
                            display: true,
                            text: 'Mood Score',
                            color: 'rgba(255, 255, 255, 0.2)' // Y-axis title color
                        }
                    },
                    x: {
                        color: '#ffffff',
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)' // Light grid lines
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.1)' // Light text color
                        },
                        title: {
                            display: true,
                            text: 'Timestamp',
                            color: 'rgba(255, 255, 255, 0.2)' // X-axis title color
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Mood Tracker'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching mood history:', error);
    }
}

// Call on page load
window.onload = function () {
    fetchMoodHistory();
    renderMoodChart();
};