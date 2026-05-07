import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '../../lib/auth';
import { TabBarIcon } from '../../components/ui';
import GlassTabBar from '../../components/ui/GlassTabBar';

export default function AdminLayout() {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Redirect href="/(auth)/login" />;
    if (user.role !== 'admin') return <Redirect href="/(officer)" />;

    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <GlassTabBar {...props} />}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="grid" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="officers"
                options={{
                    title: 'Officers',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="people" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="inputs"
                options={{
                    title: 'Inputs',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="cube" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="distributions"
                options={{
                    title: 'Logs',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="list" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="user" color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}
