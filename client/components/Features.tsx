import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Features() {
    return (
        <View style={styles.container}>
            <Link href="/translate" asChild>
                <TouchableOpacity style={styles.bots}>
                    <MaterialCommunityIcons name='translate' size={25} style={styles.icons} />
                    <View>
                        <Text style={[styles.heading, { fontSize: 20 }]}>AI Translation</Text>
                        <Text style={styles.description}>Translate text instantly between multiple languages.</Text>
                    </View>
                </TouchableOpacity>
            </Link>
            <View style={{ flexShrink: 1, height: 265, gap: 10, justifyContent: 'space-between' }}>
                <Link href="/scan" asChild>
                    <TouchableOpacity style={{ flexShrink: 1, backgroundColor: '#fff', borderRadius: 15, padding: 10, height: "50%" }}>
                        <AntDesign name='scan1' size={25} style={styles.icons} />
                        <Text style={styles.heading}>Scan & Translate</Text>
                        <Text style={styles.description}>Extract text from images & translate</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/chat" asChild>
                    <TouchableOpacity style={{ flexShrink: 1, backgroundColor: '#fff', borderRadius: 15, padding: 10, height: "50%" }}>
                        <Octicons name='dependabot' size={25} style={styles.icons} />
                        <Text style={styles.heading}>Ask AI</Text>
                        <Text style={styles.description}>Get instant answers, summaries, & writing help</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icons: {
        padding: 9,
        borderRadius: 50,
        backgroundColor: '#ebeced',
        width: 45
    },
    container: {
        flex: 3,
        // backgroundColor: "#075ce6",
        padding: 20,
        flexDirection: "row",
        gap: 10,
    },
    bots: {
        flexShrink: 1,
        backgroundColor: "#fff",
        height: 265,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 15
    },
    heading: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#333",
        marginTop: 3
    },
    description: {
        fontSize: 11,
        color: "#555",
        marginBottom: 12,
    },
});