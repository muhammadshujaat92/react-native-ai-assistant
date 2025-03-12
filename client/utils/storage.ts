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