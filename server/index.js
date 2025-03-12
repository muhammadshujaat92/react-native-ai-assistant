require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { ChatMistralAI } = require('@langchain/mistralai');
const { SystemMessage, HumanMessage } = require('@langchain/core/messages');

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

        const messages = [
            new SystemMessage("You are an AI assistant."),
            new HumanMessage(prompt),
        ];

        // const response = await model.invoke(messages);
        // res.json({ response: response })
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
        res.status(500).json({ error: "Error While Prompting! ", error });
    }
})

app.listen('3000', () => {
    console.log("App Started")
})