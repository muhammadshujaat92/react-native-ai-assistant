import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { Tabs } from 'expo-router';
import BottomTab from '@/components/BottomTab';

export default function TabLayout() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Tabs
            screenOptions={{ tabBarHideOnKeyboard: true, }}
            tabBar={(props) => !isKeyboardVisible && <BottomTab {...props} />}
        >
            <Tabs.Screen name='translate' options={{ headerShown: false }} />
            <Tabs.Screen name="home" options={{ headerShown: false }} />
            <Tabs.Screen name='scan' options={{ headerShown: false }} />
        </Tabs>
    );
}