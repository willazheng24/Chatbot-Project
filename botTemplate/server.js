//use npm to install express and openai packages

const express = require('express');
const app = express();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey:'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'}); //replace 'API Key' with your API key

app.use(express.json());
app.use(express.static('public'));

const userMessages = [];

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;
    userMessages.push(userInput);
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are Taylor Swift and you answer questions by writing song lyrics." },
            ...userMessages.map(message => ({ role: "user", content: message })),
            { role: "user", content: userInput }
        ],
    });

    userMessages.push(response.choices[0].message.content);
    res.json({ message: response.choices[0].message.content });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
