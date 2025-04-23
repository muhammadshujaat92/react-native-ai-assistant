import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native"

interface headerProps {
    toggleDrawer?: any;
}

const Header: React.FC<headerProps> = ({ toggleDrawer }) => {
    return (
        <View style={{ backgroundColor: "#000000" }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }} colors={["rgba(124, 246, 173, 0.13)", '#050505',]} style={styles.header}>
                <MaterialCommunityIcons onPress={toggleDrawer} name="chat-processing-outline" size={24} style={styles.icon} />
                <AntDesign name="user" size={24} style={styles.icon} />
            </LinearGradient>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 18, top: 0, paddingTop: 25 },
    icon: { backgroundColor: 'rgba(110, 110, 110, 0.35)', color: "#fff", padding: 8, borderRadius: 50, marginVertical: 20, marginBottom: 10 }
})