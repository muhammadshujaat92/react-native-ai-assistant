import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'

export default function login() {
    const [loginInputs, setLoginInputs] = useState({ email: "", password: "" })

    return (
        <LinearGradient colors={["rgba(124, 246, 173, 0.13)", '#050505',]} style={styles.container}>
            <LinearGradient colors={["rgba(255, 255, 255, 0.15)", 'rgba(65, 65, 65, 0.35)',]} style={styles.box}>
                <Text style={styles.heading}>Login</Text>
                <View>
                    <TextInput placeholderTextColor={'#919191'} style={styles.inputs} placeholder='Email' value={loginInputs.email} onChangeText={(email) => setLoginInputs(prev => ({ ...prev, email }))} />
                    <TextInput placeholderTextColor={'#919191'} style={styles.inputs} placeholder='Password' secureTextEntry={true} value={loginInputs.password} onChangeText={(password) => setLoginInputs(prev => ({ ...prev, password }))} />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 14, color: "#a6a4a4" }}>Don't have an account? </Text>
                        <Link href={'/auth/signup'} style={{ color: "#d4d2d2" }}>Signup</Link>
                    </View>
                </View>
                <LinearGradient colors={["#7CF6AD", '#15D2E9',]} style={{ borderRadius: 25, width: "50%" }}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </LinearGradient>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    box: { height: 330, width: 320, borderRadius: 10, paddingVertical: 20, paddingHorizontal: 20, justifyContent: "space-between", overflow: "hidden" },
    heading: { fontSize: 30, fontWeight: '700', color: "#fff" },
    inputs: { marginBottom: 20, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, fontSize: 15, backgroundColor: "rgba(216, 216, 216, 0.13)", color: "#fff" },
    btn: { paddingVertical: 10, paddingHorizontal: 10 },
    btnText: { fontSize: 15, fontWeight: "500", textAlign: "center" }
})