document.getElementById('send-btn').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // Add user message to the chat
    addMessageToChat('You', userInput);

    // Simulate chatbot response (this is where you would call your AI API)
    setTimeout(() => {
        const botResponse = "I'm a chatbot. How can I assist you?";
        addMessageToChat('Bot', botResponse);
    }, 1000);

    document.getElementById('user-input').value = '';
}

function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
