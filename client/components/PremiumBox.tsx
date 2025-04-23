import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const botImage = require("@/assets/images/homeBot.png");

export default function PremiumBox() {
    return (
        <View style={styles.container}>
            <LinearGradient start={{ x: 0.2, y: 0 }} colors={['#BCF489', "#15D2E9"]} style={styles.premiumBox}>
                {/* Left Side - Text Section */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Premium Plan</Text>
                    <Text style={styles.description}>Unlock your AI chatbot & get all premium features</Text>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </Pressable>
                </View>

                {/* Right Side - Image */}
                <Image source={botImage} style={styles.image} />
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 2,
        justifyContent: "center",
    },
    premiumBox: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    textContainer: {
        flexShrink: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
    },
    description: {
        marginVertical: 13,
        lineHeight: 20,
        fontSize: 13
    },
    button: {
        backgroundColor: "#fff",
        width: 130,
        paddingVertical: 12,
        borderRadius: 30,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600'
    },
    image: {
        width: 125,
        height: 140,
        marginBottom: 5
    },
});