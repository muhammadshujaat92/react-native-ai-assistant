import { StyleSheet, TextInput, ScrollView, View, Pressable, Text, TouchableOpacity } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { fetchData } from '@/utils/helper'
import { AppContext } from '@/context/AppContext';
import Markdown from 'react-native-markdown-display';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '@/components/GradientButton';

export default function Translate() {
    const [translation, setTranslation] = useState<string>('');
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useContext must be used within an AppProvider");
    }

    const { scanedTranslation } = context;
    const [translationInput, setTranslationInput] = useState({ text: "", sourceLang: "", targetLang: "" });

    useEffect(() => {
        if (scanedTranslation) setTranslationInput(prev => ({ ...prev, text: scanedTranslation }));
    }, [scanedTranslation]);

    const handleTranslate = async () => {
        setTranslationInput(prev => ({ ...prev, text: '' }))
        setTranslation('');
        const inputPayload = { ...translationInput };
        await fetchData(inputPayload, 'api/translate', (chunk) => {
            setTranslation(prev => prev + chunk);
        });
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={["rgba(124, 246, 173, 0.13)", '#050505',]} style={{ flex: 1 }}>
                <ScrollView style={{ paddingHorizontal: 15 }}>
                    <View>
                        <TextInput value={translationInput.text} onChangeText={(text) => setTranslationInput(prev => ({ ...prev, text }))} multiline placeholder='Enter Text' style={styles.textInput} placeholderTextColor={"#808080"} />
                    </View>
                    <View style={styles.inputsContainer}>
                        <TextInput value={translationInput.sourceLang} onChangeText={(sourceLang) => setTranslationInput(prev => ({ ...prev, sourceLang }))} placeholder='Select Language' style={styles.languageInput} placeholderTextColor={"#808080"} />
                        <TextInput value={translationInput.targetLang} onChangeText={(targetLang) => setTranslationInput(prev => ({ ...prev, targetLang }))} placeholder='Select Language' style={styles.languageInput} placeholderTextColor={"#808080"} />
                    </View>
                    <GradientButton title={'Translate'} onPress={handleTranslate} />
                    <View style={{ marginVertical: 20, backgroundColor: 'rgba(110, 110, 110, 0.35)', paddingHorizontal: 20, paddingVertical: 20, borderRadius: 8, minHeight: 200 }}>
                        {translation && <Markdown style={{ body: { color: "#fff" }, text: { color: "#fff" } }}>{translation}</Markdown>}
                    </View>
                    <View style={{ height: 80 }}></View>
                </ScrollView >
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        // paddingTop: 30,
        // paddingHorizontal: 15,
    },
    textInput: { backgroundColor: 'rgba(110, 110, 110, 0.35)', color: "#fff", height: 200, textAlignVertical: "top", borderRadius: 15, padding: 15 },
    inputsContainer: { flexDirection: 'row', color: "#fff", justifyContent: 'space-between', paddingTop: 20, paddingBottom: 30 },
    languageInput: { backgroundColor: 'rgba(110, 110, 110, 0.35)', color: "#fff", borderRadius: 50, padding: 15, width: 150, textAlign: 'center' }
})