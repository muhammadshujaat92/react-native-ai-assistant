import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AuthForm from '@/components/AuthForm'
import { fetchData } from '@/utils/helper';
import { setAuthToken } from '@/utils/storage';
import { useRouter } from 'expo-router';

export default function signup() {
    const [signupInputs, setSignupInputs] = useState({ name: "", email: "", password: "" });
    const router = useRouter();

    const handleChange = (field: string, value: string) => {
        setSignupInputs(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (name: string, email: string, password: string) => {
        try {
            const payload = { name, email, password };
            if (!name || !email || !password) {
                Alert.alert('Signup Failed', "Invalid Credentials");
                return;
            }

            const response = await fetchData(payload, "api/signup");

            if (response?.authToken) {
                await setAuthToken(response.authToken);
                Alert.alert('Signup Sucessfull', '');
                router.replace("/home");
            } else if (response?.error) {
                Alert.alert('Signup Failed', response.error);
            } else {
                Alert.alert('Signup Failed', 'An unexpected error occurred.');
            }

        } catch (err: any) {
            Alert.alert('Signup Failed', err.message || 'Unknown error');
        }
    };

    return (
        <LinearGradient colors={["rgba(124, 246, 173, 0.13)", '#050505',]} style={styles.container}>
            <AuthForm
                heading='Create Account'
                isSignupPage={true}
                askFor='Already have an account? '
                linkUrl='/auth/login'
                linkText='Login'
                btnText='Sign Up'
                credentials={signupInputs}
                onChange={handleChange}
                onSubmit={() => handleSubmit(signupInputs.name, signupInputs.email, signupInputs.password)}
                boxHeight={400} />
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" }
})