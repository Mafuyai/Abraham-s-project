import { Tabs, Redirect } from 'expo-router';
import { useAuth } from '../../lib/auth';
import { TabBarIcon } from '../../components/ui';
import GlassTabBar from '../../components/ui/GlassTabBar';

export default function OfficerLayout() {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Redirect href="/(auth)/login" />;
    if (user.role !== 'officer') return <Redirect href="/(admin)" />;

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
                        <TabBarIcon name="home" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Scan',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="scan" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="register-farmer"
                options={{
                    title: 'Register',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name="user-plus"
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="clock" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="distribute"
                options={{
                    title: 'Issue',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="leaf" color={color} focused={focused} />
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
