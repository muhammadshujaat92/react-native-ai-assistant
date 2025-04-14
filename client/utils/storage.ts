import AsyncStorage from '@react-native-async-storage/async-storage';
const ONBOARDING_KEY = 'hasSeenOnboarding';

export const setOnboardingSeen = async () => {
    try {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch (error) {
        console.error('Error setting onboarding flag', error);
    }
};

export const hasSeenOnboarding = async (): Promise<boolean> => {
    try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        return value === 'true';
    } catch (error) {
        console.error('Error fetching onboarding flag', error);
        return false;
    }
};

export const setAuthToken = async (token: string) => {
    try {
        await AsyncStorage.setItem("authToken", token)
    } catch (error) {
        console.error('Error setting Auth Token: ', error);
    }
}

export const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem("authToken")
        return token
    } catch (error) {
        console.error('Error getting Auth Token: ', error);
    }
}

export const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem("authToken")
    } catch (error) {
        console.error('Error removing Auth Token: ', error);
    }
}