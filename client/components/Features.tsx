import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Features() {
    return (
        <View style={styles.container}>
            <Link href="/translate" asChild>
                <TouchableOpacity style={{ flexShrink: 1 }}>
                    <LinearGradient start={{ x: 0.9, y: 0 }} colors={["rgba(255, 255, 255, 0.1)", 'rgba(65, 65, 65, 0.35)',]} style={styles.bots}>
                        <MaterialCommunityIcons name='translate' size={25} style={styles.icons} />
                        <View>
                            <Text style={[styles.heading, { fontSize: 20 }]}>AI Translation</Text>
                            <Text style={styles.description}>Translate text instantly between multiple languages.</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </Link>
            <View style={{ flexShrink: 1, height: 265, gap: 10, justifyContent: 'space-between' }}>
                <Link href="/scan" asChild>
                    <TouchableOpacity style={{ flexShrink: 1, height: "50%" }}>
                        <LinearGradient start={{ x: 0.9, y: 0 }} colors={["rgba(255, 255, 255, 0.1)", 'rgba(65, 65, 65, 0.35)',]} style={{ backgroundColor: 'transparent', borderRadius: 15, padding: 10 }}>
                            <AntDesign name='scan1' size={25} style={styles.icons} />
                            <Text style={styles.heading}>Scan & Translate</Text>
                            <Text style={styles.description}>Extract text from images & translate</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
                <Link href="/chat" asChild>
                    <TouchableOpacity style={{ flexShrink: 1, height: "50%" }}>
                        <LinearGradient start={{ x: 0.9, y: 0 }} colors={["rgba(255, 255, 255, 0.1)", 'rgba(65, 65, 65, 0.35)',]} style={{ backgroundColor: 'transparent', borderRadius: 15, padding: 10 }}>
                            <Octicons name='dependabot' size={25} style={styles.icons} />
                            <Text style={styles.heading}>Ask AI</Text>
                            <Text style={styles.description}>Get instant answers, summaries, & writing help</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        padding: 20,
        flexDirection: "row",
        gap: 10,
    },
    icons: {
        padding: 9,
        borderRadius: 50,
        backgroundColor: 'rgba(110, 110, 110, 0.35)',
        color: "white",
        width: 45
    },
    bots: {
        backgroundColor: "transparent",
        height: 265,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 15,
    },
    heading: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#fff",
        marginTop: 3
    },
    description: {
        fontSize: 11,
        color: "#fff",
        marginBottom: 12,
    },
});