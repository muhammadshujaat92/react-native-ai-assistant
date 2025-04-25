import { removeAuthToken } from "@/utils/storage";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface headerProps {
    toggleDrawer?: any;
}

const Header: React.FC<headerProps> = ({ toggleDrawer }) => {
    const [showLogout, setShowLogout] = useState(false);
    const router = useRouter()

    const handleLogout = async () => {
        await removeAuthToken();
        router.replace('/auth/login')
    }

    return (
        <View style={{ backgroundColor: "#000000" }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }} colors={["rgba(124, 246, 173, 0.13)", '#050505',]} style={styles.header}>
                <MaterialCommunityIcons onPress={toggleDrawer} name="chat-processing-outline" size={24} style={styles.icon} />
                <AntDesign name="user" size={24} style={styles.icon} onPress={() => setShowLogout(!showLogout)} />
                {showLogout && (
                    <View style={styles.logout}>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </LinearGradient >
        </View >
    )
}

export default Header;

const styles = StyleSheet.create({
    header: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 18, top: 0, paddingTop: 25, position: "relative" },
    icon: { backgroundColor: 'rgba(110, 110, 110, 0.35)', color: "#fff", padding: 8, borderRadius: 50, marginVertical: 20, marginBottom: 10 },
    logout: { position: "absolute", backgroundColor: "#fff", top: "100%", right: "15%", paddingHorizontal: 50, paddingVertical: 20, borderRadius: 10 }
})