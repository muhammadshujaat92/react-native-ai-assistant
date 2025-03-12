import BottomTab from '@/components/BottomTab';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs tabBar={props => <BottomTab {...props} />}>
            <Tabs.Screen name='translate' options={{ headerShown: false }} />
            <Tabs.Screen name="home" options={{ headerShown: false }} />
            <Tabs.Screen name='scan' options={{ headerShown: false }} />
        </Tabs>
    );
}