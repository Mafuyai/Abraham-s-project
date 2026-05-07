import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../lib/auth';
import { colors } from '../theme';

const SEEN_KEY = 'project_ab.onboarding_seen';

export default function Index() {
    const { user, loading } = useAuth();
    const [seenOnboarding, setSeenOnboarding] = useState<boolean | null>(null);

    useEffect(() => {
        AsyncStorage.getItem(SEEN_KEY)
            .then((v) => setSeenOnboarding(v === '1'))
            .catch(() => setSeenOnboarding(false));
    }, []);

    if (loading || seenOnboarding === null) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.bg,
                }}
            >
                <ActivityIndicator color={colors.primary} />
            </View>
        );
    }

    if (user) {
        return user.role === 'admin' ? (
            <Redirect href="/(admin)" />
        ) : (
            <Redirect href="/(officer)" />
        );
    }

    return seenOnboarding && !__DEV__ ? (
        <Redirect href="/(auth)" />
    ) : (
        <Redirect href="/onboarding" />
    );
}
