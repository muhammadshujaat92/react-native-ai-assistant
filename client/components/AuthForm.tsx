import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import GradientButton from './GradientButton'

type RoutePaths = '/auth/signup' | '/auth/login'

interface AuthProps {
    heading: string;
    askFor: string;
    linkUrl: RoutePaths;
    linkText: string;
    btnText: string;
    credentials: {
        name?: string;
        email: string;
        password: string
    };
    isSignupPage?: boolean;
    onChange: (field: string, value: string) => void;
    onSubmit: () => void;
    boxHeight?: number;
}


const AuthForm: React.FC<AuthProps> = ({ heading, askFor, linkUrl, linkText, btnText, credentials, isSignupPage, onChange, onSubmit, boxHeight }) => {
    return (
        <LinearGradient colors={["rgba(255, 255, 255, 0.15)", 'rgba(65, 65, 65, 0.35)',]} style={[styles.box, { height: boxHeight || 330 }]}>
            <Text style={styles.heading}>{heading}</Text>
            <View>
                {isSignupPage && (<TextInput placeholderTextColor={'#919191'} style={styles.inputs} placeholder='Enter Your Name' value={credentials.name} onChangeText={(text) => onChange('name', text)} />)}
                <TextInput placeholderTextColor={'#919191'} style={styles.inputs} placeholder='Enter Your Email' value={credentials.email} onChangeText={(text) => onChange('email', text)} />
                <TextInput placeholderTextColor={'#919191'} style={styles.inputs} placeholder=' Enter Password' secureTextEntry={true} value={credentials.password} onChangeText={(text) => onChange('password', text)} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 14, color: "#a6a4a4" }}>{askFor}</Text>
                    <Link href={linkUrl} style={{ color: "#d4d2d2" }}>{linkText}</Link>
                </View>
            </View>
            <GradientButton title={btnText} onPress={onSubmit} containerStyle={{ width: "50%" }} buttonStyle={styles.btn} />
        </LinearGradient>
    )
}

export default AuthForm

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    box: { height: 330, width: 320, borderRadius: 10, paddingVertical: 20, paddingHorizontal: 20, justifyContent: "space-between", overflow: "hidden" },
    heading: { fontSize: 30, fontWeight: '700', color: "#fff" },
    inputs: { marginBottom: 20, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, fontSize: 15, backgroundColor: "rgba(216, 216, 216, 0.13)", color: "#fff" },
    btn: { paddingVertical: 10, paddingHorizontal: 10 },
    btnText: { fontSize: 15, fontWeight: "500", textAlign: "center" }
})