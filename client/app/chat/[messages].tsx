import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-native-markdown-display';
import { fetchData } from '@/utils/helper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function Message() {
    const [promptInput, setPromptInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const { messages: chatId } = useLocalSearchParams();

    useEffect(() => {
        if (chatId) getMessages(chatId as string)
    }, [chatId]);

    const getMessages = async (id: string) => {
        try {
            const response = await fetchData(null, `api/messages/${id}`);
            const formattedMessages = response.map((msg: any) => ({
                text: msg.content,
                sender: msg.role === "user" ? "user" : "ai"
            }));
            setMessages(formattedMessages)

        } catch (err) {
            console.log("Unexpected Error: ", err)
        }
    }

    const generateMessage = async () => {
        if (!promptInput) return;

        const userMessage = { text: promptInput, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setPromptInput("");

        let aiResponse = "";
        await fetchData({ prompt: promptInput }, 'api/prompt', (chunk) => {
            aiResponse += chunk;
            setMessages([...messages, userMessage, { text: aiResponse, sender: 'ai' }]);
        });
    };

    return (
        <View style={{ backgroundColor: "#000000", flex: 1 }}>
            <LinearGradient colors={["rgba(124, 246, 173, 0.13)", '#050505']} style={styles.container}>
                <FlatList
                    data={messages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        item.sender === 'user' ? (
                            <LinearGradient colors={['#BCF489', "#15D2E9"]} style={[styles.message, styles.user]}>
                                <Text>{item.text}</Text>
                            </LinearGradient>
                        ) : (
                            <View style={[styles.message, styles.ai]}>
                                <Markdown style={{ body: { color: "#fff" }, text: { color: "#fff" } }}>{item.text}</Markdown>
                            </View>
                        )
                    )}
                    contentContainerStyle={{ paddingTop: 20, paddingBottom: 50, paddingHorizontal: 10 }}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        multiline
                        value={promptInput}
                        onChangeText={setPromptInput}
                        placeholder="Ask me anything..."
                        placeholderTextColor={'#919191'}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={generateMessage}>
                        <LinearGradient start={{ x: 0.9, y: 0 }} colors={['#BCF489', "#15D2E9"]} style={styles.sendButton}>
                            <Ionicons size={24} name='send' />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    message: { padding: 10, marginVertical: 8, borderRadius: 8, maxWidth: "80%" },
    user: { alignSelf: "flex-end" },
    ai: { backgroundColor: "rgba(110, 110, 110, 0.35)", alignSelf: "flex-start", maxWidth: "100%", width: "100%" },
    inputContainer: { flexDirection: "row", padding: 10, alignItems: "center" },
    input: { flex: 1, backgroundColor: 'rgba(110, 110, 110, 0.35)', color: "#fff", padding: 15, borderRadius: 8 },
    sendButton: { backgroundColor: "transparent", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, marginLeft: 8, justifyContent: "center" }
});