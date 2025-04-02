require('dotenv').config();
require('./DB/connect');
const express = require('express');
const app = express();
const cors = require('cors');
const { ChatMistralAI } = require('@langchain/mistralai');
const { SystemMessage, HumanMessage } = require('@langchain/core/messages');
const Chat = require('./models/Message');

app.use(cors());
app.use(express.json());

const model = new ChatMistralAI({
    model: "mistral-large-latest",
    temperature: 0
});

app.post('/translate', async (req, res) => {
    try {
        const { text, sourceLang, targetLang } = req.body;

        if (!text || !sourceLang || !targetLang) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const messages = [
            new SystemMessage(`Translate the following from ${sourceLang} to ${targetLang}`),
            new HumanMessage(text),
        ];

        // const response = await model.invoke(messages);
        // res.json({ translation: response });

        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        const stream = await model.stream(messages);

        // const chunks = [];
        for await (const chunk of stream) {
            // chunks.push(chunk);
            res.write(chunk.content);
            // console.log(chunks);
        }

        res.end();

    } catch (error) {
        res.status(500).json({ error: "Error While Translating! ", error });
    }
})

app.post("/prompt", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        let chat = new Chat({ messages: [] });
        chat.messages.push({ role: "user", content: prompt });
        await chat.save();

        const messages = [
            new SystemMessage("You are an AI assistant."),
            new HumanMessage(prompt),
        ];

        // const response = await model.invoke(messages);
        // res.json({ response: response })
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Transfer-Encoding", "chunked");

        const stream = await model.stream(messages);

        let aiResponse = '';
        for await (const chunk of stream) {
            aiResponse += chunk.content;
            res.write(chunk.content);
        }

        chat.messages.push({ role: "assistant", content: aiResponse });
        await chat.save();

        res.end();

    } catch (error) {
        res.status(500).json({ error: "Error While Prompting! ", error });
    }
})

app.get('/chats', async (req, res) => {
    try {
        const chat = await Chat.find();
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: "Error Fetching chats ", error })
    }
})

app.listen('3000', () => {
    console.log("App Started")
})