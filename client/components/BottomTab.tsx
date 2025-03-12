import React from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default function BottomTab() {
    return (
        <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNav}>
                <MaterialCommunityIcons name="chat-processing-outline" size={25} style={styles.icons} />
                <View style={styles.homeTab}>
                    <AntDesign name="home" size={25} style={[styles.icons, { backgroundColor: "#c9c9c9" }]} />
                    <Text style={{ paddingHorizontal: 10 }}>Home</Text>
                </View>
                <AntDesign name="user" size={25} style={styles.icons} />
                <AntDesign name="setting" size={25} style={styles.icons} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNavContainer: {
        alignItems: "center",
        backgroundColor: '#ebeced',
        paddingBottom: 15
    },
    bottomNav: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        width: 300,
        gap: 8,
        paddingVertical: 5,
        borderRadius: 50
    },
    homeTab: {
        backgroundColor: "#ebeced",
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 50,
        paddingRight: 10
    },
    icons: {
        padding: 12,
        borderRadius: 50,
        backgroundColor: "#ebeced"
    }
});