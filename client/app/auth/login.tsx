import React, { useState } from 'react'
import AuthForm from '@/components/AuthForm'
import { Alert, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { fetchData } from '@/utils/helper';
import { setAuthToken } from '@/utils/storage';
import { useRouter } from 'expo-router';

export default function login() {
    const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
    const router = useRouter()

    const handleChange = (field: string, value: string) => {
        setLoginInputs(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (email: string, password: string) => {
        try {
            const payload = { email, password };
            if (!email || !password) {
                Alert.alert('Login Failed', "Invalid Credentials");
                return;
            }

            const response = await fetchData(payload, "api/login")

            if (response?.authToken) {
                await setAuthToken(response.authToken);
                Alert.alert('Signup Sucessfull', '');
                router.replace("/home")
            } else if (response?.error) {
                Alert.alert("Login Failed ", response.error)
            } else {
                Alert.alert('Login Failed', 'An unexpected error occurred.');
            }

        } catch (err: any) {
            Alert.alert('Login Failed', err.message || 'Unknown error');
        }
    }

    return (
        <LinearGradient colors={["rgba(124, 246, 173, 0.13)", '#050505',]} style={styles.container}>
            <AuthForm
                heading='Login'
                askFor="Don't have an account? "
                linkText="Signup"
                linkUrl="/auth/signup"
                btnText="Login"
                credentials={loginInputs}
                onChange={handleChange}
                onSubmit={() => handleSubmit(loginInputs.email, loginInputs.password)}
                boxHeight={330} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" }
})