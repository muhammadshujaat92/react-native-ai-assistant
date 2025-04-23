import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientButtonProps = {
    title: string;
    onPress: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

const GradientButton: React.FC<GradientButtonProps> = ({ title, onPress, containerStyle, buttonStyle, textStyle }) => {
    return (
        <LinearGradient colors={["#7CF6AD", "#15D2E9"]} style={[styles.gradient, containerStyle]}>
            <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: "center"
    },
});

export default GradientButton