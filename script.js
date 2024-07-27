document.getElementById('send-btn').addEventListener('click', sendMessage);

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        displayResponse(data);

    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResponse(data) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>Bot:</strong> ${data.message}`;
    chatBox.appendChild(messageElement);

    const booksElement = document.createElement('div');
    booksElement.classList.add('books');
    booksElement.innerHTML = data.books.map(book => `
        <div class="book">
            <h3>${book.volumeInfo.title}</h3>
            <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
        </div>
    `).join('');
    chatBox.appendChild(booksElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
