document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    addMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    const response = await fetch('/recommend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: userInput })
    });

    const data = await response.json();
    if (data && data.bookRecommendation) {
        addMessage(`Here is a preview:\n${data.bookRecommendation}`, 'bot');
    } else {
        addMessage(`Sorry, I couldn't find any books matching your query.`, 'bot');
    }
});

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
