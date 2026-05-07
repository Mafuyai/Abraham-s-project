import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SystemUI from 'expo-system-ui';
import * as ExpoSplash from 'expo-splash-screen';
import { AuthProvider } from '../lib/auth';
import Splash from '../components/ui/Splash';
import { colors } from '../theme';

ExpoSplash.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        SystemUI.setBackgroundColorAsync(colors.bg).catch(() => {});
        ExpoSplash.hideAsync().catch(() => {});
    }, []);

    const onSplashDone = useCallback(() => setShowSplash(false), []);

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
            <AuthProvider>
                <View style={{ flex: 1 }}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: colors.bg },
                        }}
                    >
                        <Stack.Screen name="index" />
                        <Stack.Screen name="onboarding" />
                        <Stack.Screen name="(auth)" />
                        <Stack.Screen name="(officer)" />
                        <Stack.Screen name="(admin)" />
                        <Stack.Screen name="(farmer)" />
                    </Stack>
                    {showSplash ? <Splash onDone={onSplashDone} /> : null}
                </View>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
