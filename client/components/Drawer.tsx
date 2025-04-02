import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { fetchData } from '@/utils/helper'

export default function DrawerComponent() {
    const [chat, setChat] = useState<{ messages: { content: string }[] }[]>([]);

    const getChats = async () => {
        const res = await fetchData(null, 'chats');
        setChat(res);
    }

    useEffect(() => {
        getChats()
    }, [])

    return (
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            {chat && chat.map((data) => (
                <Link style={{ marginVertical: 5 }} href={'/chat/messages'} asChild>
                    <TouchableOpacity style={{ backgroundColor: "#007aff1f", paddingVertical: 18, paddingHorizontal: 20, borderRadius: 30 }}>
                        <Text style={{ color: "#0296e3" }}>{data.messages?.[0]?.content}</Text>
                    </TouchableOpacity>
                </Link>
            ))}
        </View>
    )
}