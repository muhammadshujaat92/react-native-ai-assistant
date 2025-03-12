import { StyleSheet, TextInput, ScrollView, View, Pressable, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '@/utils/helper'
import { AppContext } from '@/context/AppContext';

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
            <TextInput value={translationInput.text} onChangeText={(text) => setTranslationInput(prev => ({ ...prev, text }))} multiline placeholder='type here' style={{ backgroundColor: '#fff', height: 200, textAlignVertical: "top", borderRadius: 15, padding: 15 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 40 }}>
                <TextInput value={translationInput.sourceLang} onChangeText={(sourceLang) => setTranslationInput(prev => ({ ...prev, sourceLang }))} placeholder='Select Language' style={{ backgroundColor: '#fff', borderRadius: 50, padding: 15, width: 150, textAlign: 'center' }} />
                <TextInput value={translationInput.targetLang} onChangeText={(targetLang) => setTranslationInput(prev => ({ ...prev, targetLang }))} placeholder='Select Language' style={{ backgroundColor: '#fff', borderRadius: 50, padding: 15, width: 150, textAlign: 'center' }} />
            </View>
            <TouchableOpacity style={{ backgroundColor: "#000", padding: 8 }} onPress={handleTranslate}>
                <Text style={{ color: "#fff" }}>Translate</Text>
            </TouchableOpacity>
            {translation &&
                <ScrollView>
                    <Text style={{ backgroundColor: "#ff6600", color: "#fff" }}>{translation}</Text>
                </ScrollView>}
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebeced',
        paddingTop: 30,
        paddingHorizontal: 15
    }
})