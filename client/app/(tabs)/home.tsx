import Features from '@/components/Features';
import PremiumBox from '@/components/PremiumBox';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Home: React.FC = () => {
    return (
        <View style={styles.container}>
            <PremiumBox />
            <Features />
            <View style={{ flex: 0.6 }}></View>
        </View >
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebeced',
    }
});