import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Link } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '@/context/AppContext';

export default function DrawerComponent() {
    const context = useContext(AppContext);
    const { chats, refreshChats }: any = context

    useEffect(() => {
        refreshChats();
    }, []);

    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={styles.containerTop}>
                <Text style={styles.newChatBtn}>New Chat</Text>
                <Link href={'/chat'}>
                    <AntDesign name='edit' size={24} style={{ color: "#fff" }} />
                </Link>
            </View>
            {chats && chats.map((data: any) => {
                const { content } = data.messages?.[0];
                const chatTitle = content.length > 30 ? content.slice(0, 30) + "...." : content;
                return (
                    <Link key={data._id} style={{ marginVertical: 5 }} href={{ pathname: "/chat/[messages]", params: { messages: data._id } }} asChild>
                        <TouchableOpacity>
                            <LinearGradient colors={['#BCF489', "#15D2E9"]} style={styles.links}>
                                <Text style={styles.linkText}>{chatTitle}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Link>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    containerTop: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 2, paddingVertical: 20, alignItems: "center" },
    newChatBtn: { backgroundColor: 'rgba(110, 110, 110, 0.35)', color: "#919191", width: "80%", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
    links: { paddingVertical: 18, paddingHorizontal: 20, borderRadius: 30 },
    linkText: { color: "#fff", fontWeight: "500", fontSize: 13 }
});