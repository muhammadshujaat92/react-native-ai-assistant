import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { fetchData } from '@/utils/helper'
import { AntDesign } from '@expo/vector-icons';

export default function DrawerComponent() {
    const [chat, setChat] = useState<{ _id: string, messages: { content: string }[] }[]>([]);

    const getChats = async () => {
        const res = await fetchData(null, 'chats');
        setChat(res);
    }

    useEffect(() => {
        getChats()
    }, [])

    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 2, paddingVertical: 20, alignItems: "center" }}>
                <Text style={{ backgroundColor: "#dbdbdb", width: "80%", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 }}>New Chat</Text>
                <Link href={'/chat'}>
                    <AntDesign name='edit' size={24} />
                </Link>
            </View>
            {chat && chat.map((data) => {
                const { content } = data.messages?.[0];
                const chatTitle = content.length > 30 ? content.slice(0, 30) + "...." : content;
                return (
                    <Link key={data._id} style={{ marginVertical: 5 }} href={'/chat/messages'} asChild>
                        <TouchableOpacity style={{ backgroundColor: "#007aff1f", paddingVertical: 18, paddingHorizontal: 20, borderRadius: 30 }}>
                            <Text style={{ color: "#0296e3" }}>{chatTitle}</Text>
                        </TouchableOpacity>
                    </Link>
                )
            })}
        </View>
    )
}