import React from 'react';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BottomTab({ state, navigation }: any) {
    const tabs = [
        { name: 'translate', label: 'Translate', Icon: Ionicons, iconName: 'chatbox-ellipses' },
        { name: 'home', label: 'Home', Icon: Entypo, iconName: 'home' },
        { name: 'scan', label: 'Scan', Icon: Ionicons, iconName: 'scan-circle' },
    ];

    return (
        <View style={styles.bottomNavContainer}>
            <LinearGradient colors={["rgba(255, 255, 255, 0.18)", 'rgba(65, 65, 65, 0.35)',]} style={styles.bottomNav}>
                {tabs.map((data: any, index) => {
                    const isActive = state.index === index;

                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(data.name)} style={styles.labelStyle}>
                            {isActive ? (
                                <LinearGradient start={{ x: 0.9, y: 0 }} colors={['#BCF489', "#15D2E9"]} style={{ borderRadius: 50 }}>
                                    <data.Icon name={data.iconName} size={25} style={[styles.icons, { backgroundColor: 'transparent' }, styles.activeTab]} />
                                </LinearGradient>
                            ) : (
                                <data.Icon name={data.iconName} size={25} style={styles.icons} />
                            )}
                            {isActive && <Text style={styles.labelText}>{data.label}</Text>}
                        </TouchableOpacity>
                    );
                })}
                <AntDesign name="setting" size={25} style={styles.icons} />
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNavContainer: {
        alignItems: "center",
        // backgroundColor: '#ebeced',
        // paddingVertical: 15,
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0
    },
    bottomNav: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: '#fff',
        width: 300,
        gap: 8,
        paddingVertical: 10,
        borderRadius: 50,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        elevation: 5
    },
    labelStyle: {
        backgroundColor: "rgba(66, 66, 66, 0.35)",
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 50,
        color: "#fff"
    },
    icons: {
        padding: 12,
        borderRadius: 50,
        backgroundColor: "rgba(90, 90, 90, 0.35)",
        color: "#fff"
    },
    activeTab: { color: "#00000" },
    labelText: { fontSize: 12, paddingHorizontal: 10, paddingRight: 15, color: "#fff", fontWeight: "500" }
});