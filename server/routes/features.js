const express = require("express");
const router = express.Router();
const { ChatMistralAI } = require('@langchain/mistralai');
const { SystemMessage, HumanMessage } = require('@langchain/core/messages');
const Chat = require('../models/Message');
const userAuth = require("../middleware/userAuth");

const model = new ChatMistralAI({
    model: "mistral-large-latest",
    temperature: 0
});

router.post('/translate', async (req, res) => {
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

router.post("/prompt", userAuth, async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        let chat = new Chat({ userId: req.user.id, messages: [] });
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

router.get('/chats', userAuth, async (req, res) => {
    try {
        const chat = await Chat.find({ userId: req.user.id });
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: "Error Fetching chats ", error })
    }
})

router.get("/messages/:chatId", userAuth, async (req, res) => {
    try {
        const { chatId } = req.params;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: "No Message found!" });
        }
        res.json(chat.messages);
    } catch (error) {
        res.status(500).json({ error: "Error Fetching chats ", error })
    }
})

router.post("/messages/:chatId", userAuth, async (req, res) => {
    try {
        const { prompt } = req.body;
        const { chatId } = req.params;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        chat.messages.push({ role: "user", content: prompt });
        await chat.save();

        const messages = [
            new SystemMessage("You are an AI assistant."),
            ...chat.messages.map(msg => msg.role === "user" ? new HumanMessage(msg.content) : new SystemMessage(msg.content)),
        ];

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
        res.status(500).json({ error: "Error updating chat! ", error });
    }
});

module.exports = router;