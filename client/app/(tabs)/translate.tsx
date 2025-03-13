import { StyleSheet, TextInput, ScrollView, View, Pressable, Text, TouchableOpacity } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { fetchData } from '@/utils/helper'
import { AppContext } from '@/context/AppContext';
import Markdown from 'react-native-markdown-display';

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
        await fetchData(inputPayload, 'translate', (chunk) => {
            setTranslation(prev => prev + chunk);
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <TextInput value={translationInput.text} onChangeText={(text) => setTranslationInput(prev => ({ ...prev, text }))} multiline placeholder='type here' style={styles.textInput} />
            </View>
            <View style={styles.inputsContainer}>
                <TextInput value={translationInput.sourceLang} onChangeText={(sourceLang) => setTranslationInput(prev => ({ ...prev, sourceLang }))} placeholder='Select Language' style={styles.languageInput} />
                <TextInput value={translationInput.targetLang} onChangeText={(targetLang) => setTranslationInput(prev => ({ ...prev, targetLang }))} placeholder='Select Language' style={styles.languageInput} />
            </View>
            <TouchableOpacity style={{ backgroundColor: "#000", padding: 8, borderRadius: 8 }} onPress={handleTranslate}>
                <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>Translate</Text>
            </TouchableOpacity>
            <View style={{ marginVertical: 20, backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 20, borderRadius: 8, minHeight: 200 }}>
                {/* <Text style={{ color: "#fff" }}>{translation}</Text> */}
                {translation && <Markdown>{translation}</Markdown>}
            </View>
            <View style={{ height: 80 }}></View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebeced',
        // paddingTop: 30,
        paddingHorizontal: 15,
    },
    textInput: { backgroundColor: '#fff', height: 200, textAlignVertical: "top", borderRadius: 15, padding: 15 },
    inputsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 30 },
    languageInput: { backgroundColor: '#fff', borderRadius: 50, padding: 15, width: 150, textAlign: 'center' }
})