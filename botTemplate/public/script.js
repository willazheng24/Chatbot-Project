document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    //stores and displays user input
    const userInput = document.getElementById('userInput').value;
    document.getElementById('inputText').textContent = userInput;
    //what taylor's chat says while loading
    document.getElementById('chatOutput').textContent = "Taylor is writing...";
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput })
    });

    const data = await response.json();
    //displays ai output
    document.getElementById('chatOutput').textContent = data.message;
    //formatting the text boxes so they are the same height
    const elementHeight = document.getElementById('chatBox').clientHeight;
    document.getElementById('inputBox').style.height = elementHeight + "px"; 
});
