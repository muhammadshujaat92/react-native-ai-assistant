import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"

const Header = () => {
    return (
        <View style={styles.header}>
            <MaterialCommunityIcons name="chat-processing-outline" size={24} style={styles.icon} />
            <AntDesign name="user" size={24} style={styles.icon} />
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, top: 50 },
    icon: { backgroundColor: '#fff', padding: 8, borderRadius: 50 }
})