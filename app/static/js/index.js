function countWords() {
    var textAreaValue = document.getElementById('text-area').value;
    console.log();

    if (textAreaValue.length == 0) {
        document.getElementById('word-count').innerHTML = `0`;
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