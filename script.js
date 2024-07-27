document.getElementById('send-btn').addEventListener('click', sendMessage);

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    try {
        // Update the port number in the fetch URL if your backend is running on a different port
        const response = await fetch('http://localhost:5001/api/chat', { // Change to the correct port
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        displayResponse(data);

    } catch (error) {
        console.error('Error:', error);
        displayResponse({ message: 'Sorry, there was an error processing your request.', books: [] });
    }
}

function displayResponse(data) {
    const chatBox = document.getElementById('chat-box');

    // Display the chatbot's response
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>Bot:</strong> ${data.message}`;
    chatBox.appendChild(messageElement);

    // Display book recommendations, if any
    if (data.books && data.books.length > 0) {
        const booksElement = document.createElement('div');
        booksElement.classList.add('books');
        booksElement.innerHTML = data.books.map(book => `
            <div class="book">
                <h3>${book.volumeInfo.title}</h3>
                <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
            </div>
        `).join('');
        chatBox.appendChild(booksElement);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
