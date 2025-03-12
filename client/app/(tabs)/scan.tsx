import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useContext, useRef, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from "@/context/AppContext";
import { useRouter } from "expo-router";

export default function ScanText() {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);
    const [facing, setFacing] = useState<CameraType>("back");
    const context = useContext(AppContext);
    const router = useRouter();

    if (!permission) return null;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to use the camera
                </Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();
        setUri(photo?.uri || null);
        if (photo) console.log(photo)
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) setUri(result.assets[0].uri);
    };

    const toggleFacing = () => {
        setFacing((prev) => (prev === "back" ? "front" : "back"));
    };

    const recognizeText = async () => {
        const formData = new FormData();
        formData.append('file', {
            uri,
            name: 'image.jpg',
            type: 'image/jpg',
        } as any);

        try {
            const response = await fetch('https://api.ocr.space/parse/image', {
                method: 'POST',
                headers: {
                    'apikey': 'e4c9bec46f88957',
                },
                body: formData,
            });

            const result = await response.json();
            if (result) {
                context?.setScanedTranslation(result.ParsedResults[0]?.ParsedText || "No Text Found. Please provide a clear image.")
                router.replace('/translate')
            }
        } catch (error) {
            console.log('Error While extracting', error);
        }
    };

    const renderPicture = () => {
        return (
            <ScrollView>
                <View style={{ alignItems: "center", flexDirection: "column" }}>
                    <Image
                        source={{ uri }}
                        contentFit="contain"
                        style={{ width: 400, aspectRatio: 1.5 }}
                    />
                    <Button onPress={() => setUri(null)} title="Take another picture" />
                    <TouchableOpacity style={{ backgroundColor: "#000", padding: 7, marginVertical: 4 }} onPress={recognizeText}>
                        <Text style={{ color: "#fff" }}>Extract Text</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    };

    const renderCamera = () => {
        return (
            <CameraView
                style={styles.camera}
                ref={ref}
                mode={"picture"}
                facing={facing}
                mute={true}
                responsiveOrientationWhenOrientationLocked
            >
                <View style={styles.shutterContainer}>
                    <Pressable onPress={pickImage}>
                        <AntDesign name="picture" size={32} color="white" />
                    </Pressable>
                    <Pressable onPress={takePicture}>
                        {({ pressed }) => (
                            <View style={[styles.shutterBtn, { opacity: pressed ? 0.5 : 1, },]}>
                                <View style={[styles.shutterBtnInner, { backgroundColor: "white" },]} />
                            </View>
                        )}
                    </Pressable>
                    <Pressable onPress={toggleFacing}>
                        <FontAwesome6 name="rotate-left" size={32} color="white" />
                    </Pressable>
                </View>
            </CameraView>
        );
    };

    return (
        <View style={styles.container}>
            {uri ? renderPicture() : renderCamera()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    shutterContainer: {
        position: "absolute",
        bottom: 44,
        left: 0,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 85,
        height: 85,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    shutterBtnInner: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
});