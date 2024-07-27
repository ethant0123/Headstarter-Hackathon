const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // ChatGPT API call
        const chatResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }]
        }, {
            headers: {
                'Authorization': `Bearer ${CHATGPT_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const gptMessage = chatResponse.data.choices[0].message.content;

        // Google Books API call (example: search for books related to the GPT response)
        const booksResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: gptMessage,
                key: GOOGLE_BOOKS_API_KEY,
                maxResults: 5
            }
        });

        const books = booksResponse.data.items || [];
        res.json({ message: gptMessage, books });

    } catch (error) {
        console.error('Error communicating with APIs:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
