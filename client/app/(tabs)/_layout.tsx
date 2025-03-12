import BottomTab from '@/components/BottomTab';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            // screenOptions={{
            //     tabBarStyle: {
            //         backgroundColor: '#fff',
            //         width: 200,
            //         alignSelf: 'center',
            //         borderRadius:50
            //     },
            // }}
            tabBar={props => <BottomTab />}
        >
            <Tabs.Screen name="home" options={{ headerShown: false }} />
            <Tabs.Screen name='translate' options={{ headerShown: false }} />
            <Tabs.Screen name='scan' options={{ headerShown: false }} />
        </Tabs>
    );
}