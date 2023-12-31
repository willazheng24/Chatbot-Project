//use npm to install express and openai packages

const express = require('express');
const app = express();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey:''}); //replace 'API Key' with your API key

app.use(express.json());
app.use(express.static('public'));

//empty array used to store past responses
const userMessages = [];

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;
    //adding user input to array
    userMessages.push(userInput);
    //setting role of chat bot
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are Taylor Swift and you answer questions by writing song lyrics." },
            ...userMessages.map(message => ({ role: "user", content: message })), 
            { role: "user", content: userInput }
        ],
    });
    //adding ai responses to array 
    userMessages.push(response.choices[0].message.content);
    res.json({ message: response.choices[0].message.content });
});

//assigning port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
