const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    role: { type: String, enum: ['user', 'assistant'] },
    content: String
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
    messages: [messageSchema],
    createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat