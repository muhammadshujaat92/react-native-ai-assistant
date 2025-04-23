import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer';
import DrawerComponent from '@/components/Drawer';
import Header from '@/components/Header';

export default function ChatLayout() {
    return (
        <GestureHandlerRootView>
            <Drawer
                screenOptions={({ navigation }) => ({
                    headerTitle: () => null,
                    headerShadowVisible: false,
                    drawerStyle: {
                        paddingTop: 80,
                        width: 270,
                        backgroundColor: "rgba(43, 43, 43, 0.91)"
                    },
                    header: () => <Header toggleDrawer={navigation.toggleDrawer} />
                })}
                drawerContent={() => <DrawerComponent />}
            >
                <Drawer.Screen name="index" />
                <Drawer.Screen name="messages" />
            </Drawer>
        </GestureHandlerRootView>
    )
}