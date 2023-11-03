document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value;
    document.getElementById('inputText').textContent = userInput;
    document.getElementById('chatOutput').textContent = "Taylor is writing...";
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    });

    const data = await response.json();
    document.getElementById('chatOutput').textContent = data.message;
    const elementHeight = document.getElementById('chatBox').clientHeight;
    document.getElementById('inputBox').style.height = elementHeight + "px"; 
});

document.body.style.backgroundColor = 'lightpink';
