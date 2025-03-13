import React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BottomTab({ state, navigation }: any) {
    const tabs = [
        { name: 'translate', label: 'Translate', Icon: Ionicons, iconName: 'chatbox-ellipses-outline' },
        { name: 'home', label: 'Home', Icon: AntDesign, iconName: 'home' },
        { name: 'scan', label: 'Scan', Icon: Ionicons, iconName: 'scan-circle-outline' },
    ];

    return (
        <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNav}>
                {tabs.map((data: any, index) => {
                    const isActive = state.index === index;
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(data.name)} style={styles.labelStyle}>
                            <data.Icon name={data.iconName} size={25} style={[styles.icons, isActive && styles.activeTab]} />
                            {isActive && <Text style={styles.labelText}>{data.label}</Text>}
                        </TouchableOpacity>
                    )
                })}
                <AntDesign name="setting" size={25} style={styles.icons} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNavContainer: {
        alignItems: "center",
        // backgroundColor: '#ebeced',
        // paddingVertical: 15,
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0
    },
    bottomNav: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
        width: 300,
        gap: 8,
        paddingVertical: 5,
        borderRadius: 50,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        elevation: 5
    },
    labelStyle: {
        backgroundColor: "#ebeced",
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 50
    },
    icons: {
        padding: 12,
        borderRadius: 50,
        backgroundColor: "#ebeced"
    },
    activeTab: { backgroundColor: "#c9c9c9" },
    labelText: { fontSize: 12, paddingHorizontal: 10, paddingRight: 15 }
});