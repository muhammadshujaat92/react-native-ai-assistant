import Features from '@/components/Features';
import PremiumBox from '@/components/PremiumBox';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Home: React.FC = () => {
    return (
        <View style={{ backgroundColor: "#000000", flex: 1 }}>
            <LinearGradient colors={["rgba(124, 246, 173, 0.13)", '#050505']} style={styles.container}>
                <PremiumBox />
                <Features />
                <View style={{ flex: 0.6 }}></View>
            </LinearGradient >
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});