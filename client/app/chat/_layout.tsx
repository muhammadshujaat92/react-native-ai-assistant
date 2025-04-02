import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import DrawerComponent from '@/components/Drawer';

export default function ChatLayout() {
    return (
        <GestureHandlerRootView>
            <Drawer
                screenOptions={({ navigation }) => ({
                    headerLeft: () => <MaterialCommunityIcons onPress={navigation.toggleDrawer} name="chat-processing-outline" size={24} style={{ backgroundColor: '#fff', padding: 8, borderRadius: 50, marginStart: 15 }} />,
                    headerRight: () => <AntDesign name="user" size={24} style={{ backgroundColor: '#fff', padding: 8, borderRadius: 50, marginEnd: 15 }} />,
                    headerTitle: () => null,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "#ebeced",
                        height: 95
                    },
                    drawerStyle: {
                        paddingTop: 80,
                        width: 270
                    }
                })}
                drawerContent={() => <DrawerComponent />}
            >
                <Drawer.Screen name="index" />
                <Drawer.Screen name="messages" />
            </Drawer>
        </GestureHandlerRootView>
    )
}