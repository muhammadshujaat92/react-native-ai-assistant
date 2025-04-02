import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Markdown from 'react-native-markdown-display';
import { fetchData } from '@/utils/helper';

export default function Chat() {
    const [promptInput, setPromptInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);

    const generateMessage = async () => {
        if (!promptInput) return;

        const userMessage = { text: promptInput, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setPromptInput("");

        let aiResponse = "";
        await fetchData({ prompt: promptInput }, 'prompt', (chunk) => {
            aiResponse += chunk;
            setMessages([...messages, userMessage, { text: aiResponse, sender: 'ai' }]);
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.message, item.sender === 'user' ? styles.user : styles.ai]}>
                        {item.sender === 'ai' ? (
                            <Markdown>
                                {item.text}
                            </Markdown>
                        ) : (
                            <Text style={{ color: "#fff" }}>{item.text}</Text>
                        )}

                    </View>
                )}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 50, paddingHorizontal: 10 }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    value={promptInput}
                    onChangeText={setPromptInput}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <TouchableOpacity onPress={generateMessage} style={styles.sendButton}>
                    <Text style={{ color: "#fff" }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    message: { padding: 10, marginVertical: 8, borderRadius: 8, maxWidth: "80%" },
    user: { backgroundColor: "#075ce6", alignSelf: "flex-end" },
    ai: { backgroundColor: "#e5e5e5", alignSelf: "flex-start", maxWidth: "100%", width: "100%" },
    inputContainer: { flexDirection: "row", padding: 10, backgroundColor: "#eee" },
    input: { flex: 1, backgroundColor: "#fff", padding: 10, borderRadius: 8 },
    sendButton: { backgroundColor: "#075ce6", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, marginLeft: 8, justifyContent: "center" }
});